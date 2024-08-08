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


"""
note - I manually deleted the following coordinates from this Way:

way/228460542

(Menomine trail west of Long Path near Stockbridge)

The Menomine trail does not extend past the Long Path.
Ideally I would have removed this programmatically by splitting the trail 
first, but I did this step out of order.

    [
      -74.0859314,
      41.3013572
     ],
     [
      -74.0858958,
      41.3013502
     ],
     [
      -74.0857413,
      41.3013096
     ],
     [
      -74.0855311,
      41.301233
     ],
     [
      -74.0853334,
      41.3011575
     ],
     [
      -74.0851232,
      41.3010646
     ],
     [
      -74.0850042,
      41.3009532
     ],
     [
      -74.0848868,
      41.3008139
     ],
     [
      -74.0846812,
      41.3006606
     ],
     [
      -74.0845963,
      41.3005991
     ],
     [
      -74.0844665,
      41.3005829
     ],
     [
      -74.0843336,
      41.3005167
     ],
     [
      -74.0841945,
      41.3004447
     ],
     [
      -74.0840848,
      41.3003681
     ],
     [
      -74.0839411,
      41.300223
     ],
     [
      -74.0838128,
      41.3001696
     ],
     [
      -74.0836011,
      41.300151
     ],
     [
      -74.0834914,
      41.3001533
     ],
     [
      -74.0834095,
      41.3001986
     ],
     [
      -74.0833199,
      41.3002311
     ],
     [
      -74.0831684,
      41.3002636
     ],
     [
      -74.0830896,
      41.3002891
     ],
     [
      -74.0830448,
      41.3003217
     ],
     [
      -74.0829196,
      41.3003217
     ],
     [
      -74.0828115,
      41.3003135
     ],
     [
      -74.0827682,
      41.3002752
     ],
     [
      -74.0827203,
      41.3001986
     ],
     [
      -74.0827079,
      41.3000604
     ],
     [
      -74.0827095,
      41.2999304
     ],
     [
      -74.0825498,
      41.2998398
     ],
     [
      -74.082186,
      41.2997739
     ],
     [
      -74.0819502,
      41.2997107
     ],
     [
      -74.0817901,
      41.2996841
     ],
     [
      -74.0815998,
      41.2996828
     ],
     [
      -74.0814684,
      41.2996474
     ],
     [
      -74.0813404,
      41.299593
     ],
     [
      -74.081145,
      41.299431
     ],
     [
      -74.0810287,
      41.2993601
     ],
     [
      -74.0809563,
      41.2993133
     ],
     [
      -74.0808839,
      41.2992361
     ],
     [
      -74.0807896,
      41.2992234
     ],
     [
      -74.0806582,
      41.2992133
     ],
     [
      -74.0805723,
      41.2992197
     ],
     [
      -74.0804548,
      41.2991937
     ],
     [
      -74.0802836,
      41.2991737
     ],
     [
      -74.0800829,
      41.2991551
     ],
     [
      -74.0798262,
      41.2991415
     ],
     [
      -74.0796215,
      41.2990583
     ],
     [
      -74.0794204,
      41.2989797
     ]
"""


