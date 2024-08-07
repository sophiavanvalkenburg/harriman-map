import json
import re
import uuid
import sys
import math


def make_segment(trail_name, way_ids, status, coords):
    segment_id = str(uuid.uuid4())
    segment_length = math.dist(coords[0], coords[-1])
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

def maybe_reverse_coordinates(last_coords, current_coords):
    if len(last_coords) > 0:
        dist_to_start = math.dist(last_coords[-1], current_coords[0])
        dist_to_end = math.dist(last_coords[-1], current_coords[-1])
        if dist_to_end < dist_to_start:
            current_coords.reverse()

def segment_trail(ways_data_file, trail_name, trail_way_ids_file, trail_incompletes_ids_files):
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

    ways_data = json.load(ways_data_file)
    trail_way_ids = trail_way_coords_by_id.keys()
    for feature in ways_data["features"]:
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
        if current_segment_status is None:
            current_segment_status = way_data["status"]
        maybe_reverse_coordinates(current_segment_coordinates, way_data["coordinates"])
        if way_data["status"] != current_segment_status:
            new_segment = make_segment(trail_name, current_segment_way_ids, current_segment_status, current_segment_coordinates)
            trail_data["features"].append(new_segment)
            current_segment_status = way_data["status"]
            current_segment_coordinates = way_data["coordinates"]
            current_segment_way_ids = [id]
        else:
            current_segment_coordinates.extend(way_data["coordinates"])
            current_segment_way_ids.append(id)
    new_segment = make_segment(trail_name, current_segment_way_ids, current_segment_status, current_segment_coordinates)
    trail_data["features"].append(new_segment)

    
if __name__ == "__main__":  
    ways_data_file = open(sys.argv[1])
    trail_way_ids_file = open(sys.argv[2])
    trail_name = sys.argv[3]
    out_file = open(sys.argv[4], 'w')
    trail_incompletes_ids_files = [open(file) for file in sys.argv[5:]]
    trail_data = segment_trail(ways_data_file, trail_name, trail_way_ids_file, trail_incompletes_ids_files)
    json.dump(trail_data, out_file, indent=1)


