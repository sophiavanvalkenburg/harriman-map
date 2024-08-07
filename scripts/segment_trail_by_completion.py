import json
import re
import uuid
import sys
import haversine as hs

def get_distance(p1, p2, unit=hs.Unit.METERS):
    return hs.haversine(p1, p2, unit)

def make_segment(trail_name, way_ids, status, coords):
    segment_id = str(uuid.uuid4())
    segment_length = get_distance(coords[0], coords[-1], hs.Unit.MILES)
    return {
        "type": "Feature",
        "id": segment_id,
        "properties": {
            "name": trail_name,
            "id": segment_id,
            "status": status,
            "osm_way_ids": way_ids,
            "length": segment_length
        },
        "geometry": {
            "type": "LineString",
            "coordinates": coords
        }
    }

def maybe_reverse_coordinates(processed_way_ids, last_coords, current_coords):
    if len(last_coords) > 0:
        dist_to_start = get_distance(last_coords[-1], current_coords[0])
        dist_to_end = get_distance(last_coords[-1], current_coords[-1])
        if dist_to_end < dist_to_start:
            current_coords.reverse()
    if len(processed_way_ids) == 1:
        start_needs_reversal = check_if_start_needs_reversal(last_coords, current_coords)
        if start_needs_reversal:
            last_coords.reverse()

def check_if_start_needs_reversal(last_coords, current_coords):
    threshold = 10 # meters
    dist_btwn_ways = get_distance(last_coords[-1], current_coords[0])
    return dist_btwn_ways > threshold

def segment_trail(ways_data_json, trail_name, trail_way_ids_file, trail_incompletes_ids_files):
    trail_way_coords_by_id = {}

    for line in trail_way_ids_file:
        match = re.search('way/.*$', line)
        if match:
            trail_way_coords_by_id[match.group(0)] = {
                "status": "complete",
                "coordinates": []
            }

    for file in trail_incompletes_ids_files:
        for line in file:
            match = re.search('way/.*$', line)
            if match:
                trail_way_coords_by_id[match.group(0)]["status"] = "incomplete"

    trail_way_ids = trail_way_coords_by_id.keys()
    for feature in ways_data_json["features"]:
        feature_id = feature["id"]
        if feature_id in trail_way_ids:
            trail_way_coords_by_id[feature_id]["coordinates"] = feature["geometry"]["coordinates"]

    trail_data = {
        "type": "FeatureCollection",
        "features": []
    }

    current_segment_status = None
    current_segment_coordinates = []
    current_segment_way_ids = []
    for id, way_data in trail_way_coords_by_id.items():
        current_way_coordinates = way_data["coordinates"].copy()
        if current_segment_status is None:
            current_segment_status = way_data["status"]
        maybe_reverse_coordinates(current_segment_way_ids, current_segment_coordinates, current_way_coordinates)
        if way_data["status"] != current_segment_status:
            new_segment = make_segment(trail_name, current_segment_way_ids, current_segment_status, current_segment_coordinates)
            trail_data["features"].append(new_segment)
            current_segment_status = way_data["status"]
            current_segment_coordinates = current_way_coordinates
            current_segment_way_ids = [id]
        else:
            current_segment_coordinates.extend(current_way_coordinates)
            current_segment_way_ids.append(id)
    new_segment = make_segment(trail_name, current_segment_way_ids, current_segment_status, current_segment_coordinates)
    trail_data["features"].append(new_segment)
    return trail_data

    
if __name__ == "__main__":  
    ways_data_file = open(sys.argv[1])                                  # e.g. data/harriman_bearmt_split.geojson
    ways_data_json = json.load(ways_data_file)   
    trail_way_ids_file = open(sys.argv[2])                              # e.g. data/trail_ways/trail_appalachian.log
    trail_name = sys.argv[3]                                            # e.g. "Appalachian Trail"
    out_file = open(sys.argv[4], 'w')                                   # e.g. data/trail_geojson/trail_appalachian.geojson
    trail_incompletes_ids_files = [open(file) for file in sys.argv[5:]] # e.g. data/trail_incomplete/trail_incomplete_appalachian_1.log
    trail_data = segment_trail(ways_data_json, trail_name, trail_way_ids_file, trail_incompletes_ids_files)
    json.dump(trail_data, out_file, indent=1)


