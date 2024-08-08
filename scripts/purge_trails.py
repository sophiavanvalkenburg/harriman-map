import json
import re
import sys

in_file = open(sys.argv[1])     # e.g. data/harriman_bearmt_complete.geojson
raw_json = json.load(in_file)
id_file = open(sys.argv[2])     # e.g. data/trail_edits/trail-deletions.log     
outfile = open(sys.argv[3], 'w')

ids_to_purge = []
for line in id_file:
    match = re.search('way/.*$', line)
    if match:
        ids_to_purge.append(match.group(0))

out_json = {
    "type": "FeatureCollection",
    "features": []
}

for feature in raw_json["features"]:
    if feature["id"] not in ids_to_purge:
        out_json["features"].append(feature)

json.dump(out_json, outfile, indent=1)


