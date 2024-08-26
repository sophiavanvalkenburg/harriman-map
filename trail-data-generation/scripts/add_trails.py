import json
import re
import sys

base_file = open(sys.argv[1])       # e.g. data/harriman_bearmt_complete.geojson
raw_base_json = json.load(base_file)

all_file = open(sys.argv[2])        # e.g. data/geojson_work_files/harriman_all.geojson
raw_all_json = json.load(all_file)

id_file = open(sys.argv[3])         # e.g. data/trail_edits/trail-additions.log

outfile = open(sys.argv[4], 'w')

existing_ids = [feature["id"] for feature in raw_base_json["features"]]

ids_to_add = []
for line in id_file:
    match = re.search('way/.*$', line)
    if match:
        id = match.group(0)
        if id not in existing_ids:
            ids_to_add.append(id)

features_to_add = []
for feature in raw_all_json["features"]:
    if feature["id"] in ids_to_add:
        features_to_add.append(feature)

# have to manually add this coordinate to connect it to the next segment
# Anthony Wayne Trail @ Long Mountain Parkway
for feature in raw_base_json["features"]:
    if feature["id"] == "way/1003727800":
        coord_to_add = [-74.0407253, 41.3065845]
        feature_coords = feature["geometry"]["coordinates"]
        if feature_coords[0][0] != coord_to_add[0] or  feature_coords[0][1] != coord_to_add[1]:
            feature["geometry"]["coordinates"] = [coord_to_add] + feature_coords

raw_base_json["features"].extend(features_to_add)

json.dump(raw_base_json, outfile, indent=1)


"""
note - I manually added the following coordinate to the start of the Way (way/1003727800)
from the Way (way/423694755) because they were not properly connected:

(Anthony Wayne Trail @ Long Mountain Parkway)

    [
      -74.0407253,
      41.3065845
     ]

"""
