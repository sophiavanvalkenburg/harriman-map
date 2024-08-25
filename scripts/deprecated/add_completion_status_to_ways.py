import json
import re
import uuid
import sys
import math

ways_data_file = open(sys.argv[1])
trail_way_ids_file = open(sys.argv[2])
trail_name = sys.argv[3]
out_file = open(sys.argv[4], 'w')
trail_incompletes_ids_files = [open(file) for file in sys.argv[5:]]


trail_way_coords_by_id = {
    "complete": {},
    "incomplete": {}
}

for file in trail_incompletes_ids_files:
    for line in file:
        match = re.search('way/.*$', line)
        if match:
            trail_way_coords_by_id["incomplete"][match.group(0)] = []

for line in trail_way_ids_file:
    match = re.search('way/.*$', line)
    if match:
        way_id = match.group(0)
        if trail_way_coords_by_id["incomplete"].get(way_id) == None:
            trail_way_coords_by_id["complete"][way_id] = []


ways_data = json.load(ways_data_file)
completed_trail_way_ids = trail_way_coords_by_id["complete"].keys()
incomplete_trail_way_ids = trail_way_coords_by_id["incomplete"].keys()
for feature in ways_data["features"]:
    feature_id = feature["id"]
    if feature_id in completed_trail_way_ids:
        trail_way_coords_by_id["complete"][feature_id] = feature["geometry"]["coordinates"]
    elif feature_id in incomplete_trail_way_ids:
        trail_way_coords_by_id["incomplete"][feature_id] = feature["geometry"]["coordinates"]


def make_segment(way_id, status, coords):
    #segment_id = str(uuid.uuid4())
    segment_length = math.dist(coords[0], coords[-1])
    return {
        "type": "Feature",
        "id": way_id,
        "properties": {
            "name": trail_name,
            "id": way_id,
            "status": status,
            #"osm_way_ids": []
            "length": segment_length
        },
        "geometry": {
            "type": "LineString",
            "coordinates": coords
        }
    }

trail_data = {
    "type": "FeatureCollection",
    "features": []
}

for id, coords in trail_way_coords_by_id["complete"].items():
    trail_data["features"].append(make_segment(id, "complete", coords))

for id, coords in trail_way_coords_by_id["incomplete"].items():
    trail_data["features"].append(make_segment(id, "incomplete", coords))


json.dump(trail_data, out_file, indent=1)

"""
last_coords = []
for id, coords in trail_way_coords_by_id.items():
    trail_data["properties"]["osm_way_ids"].append(id)
    if last_coords:
        dist_to_start = math.dist(last_coords[-1], coords[0])
        dist_to_end = math.dist(last_coords[-2], coords[-1])
        if dist_to_end < dist_to_start:
            coords.reverse()
    trail_data["geometry"]["coordinates"].extend(coords)
    last_coords = coords
"""

