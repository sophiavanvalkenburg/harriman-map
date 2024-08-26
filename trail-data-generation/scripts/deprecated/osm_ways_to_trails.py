import json
import re
import uuid
import sys
import math

trail_way_ids_file = open(sys.argv[1])
trail_name = sys.argv[2]
ways_data_file = open(sys.argv[3])
out_file = open(sys.argv[4], 'w')

trail_id = str(uuid.uuid4())
trail_data = {
    "type": "Feature",
    "id": trail_id,
    "properties": {
        "name": trail_name,
        "id": trail_id,
        "osm_way_ids": []
    },
    "geometry": {
        "type": "LineString",
        "coordinates": []
    }
}

trail_way_coords_by_id = {}
for line in trail_way_ids_file:
    match = re.search('way/.*$', line)
    if match:
        trail_way_coords_by_id[match.group(0)] = None

ways_data = json.load(ways_data_file)
for feature in ways_data["features"]:
    feature_id = feature["id"]
    if feature_id in trail_way_coords_by_id.keys():
        trail_way_coords_by_id[feature_id] = feature["geometry"]["coordinates"]

last_coords = []
for id, coords in trail_way_coords_by_id.items():
    trail_data["properties"]["osm_way_ids"].append(id)
    if last_coords:
        dist_to_start = math.dist(last_coords[-1], coords[0])
        dist_to_end = math.dist(last_coords[-1], coords[-1])
        if dist_to_end < dist_to_start:
            coords.reverse()
    trail_data["geometry"]["coordinates"].extend(coords)
    last_coords = coords

json.dump(trail_data, out_file, indent=1)

