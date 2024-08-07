import json
import re

base_file = open('data/harriman_bearmt_complete.geojson')
raw_base_json = json.load(base_file)

all_file = open('data/geojson_work_files/harriman_all.geojson')
raw_all_json = json.load(all_file)

id_file = open('data/trail-additions-deletions-files/trail-additions-all.log')

outfile = open('data/harriman_added.geojson', 'w')

existing_ids = [feature["id"] for feature in raw_base_json["features"]]

ids_to_add = []
for line in id_file:
    match = re.search('way/\d+', line)
    if match:
        id = match.group(0)
        if id not in existing_ids:
            ids_to_add.append(id)

features_to_add = []
for feature in raw_all_json["features"]:
    if feature["id"] in ids_to_add:
        features_to_add.append(feature)

raw_base_json["features"].extend(features_to_add)

json.dump(raw_base_json, outfile, indent=1)


"""
manually added
anthony wayne trail - long mt pkway 
    way/423694755
    way/1003727800
    [
      -74.0407253,
      41.3065845
     ]

"""
