import json
import csv
import math
import copy

base_file = open('data/harriman_bearmt_complete.geojson')
raw_base_json = json.load(base_file)

id_file = open('data/trail_edits/trail-splits.log')

outfile = open('data/harriman_bearmt_split.geojson', 'w')

splits = {}
for way_id, long, lat in csv.reader(id_file):
    splits_for_way = splits.get(way_id, [])
    splits_for_way.append((float(long), float(lat)))
    splits[way_id] = splits_for_way

split_json = {
    "type": "FeatureCollection",
    "features": []
}

for feature in raw_base_json["features"]:
    splits_for_way = splits.get(feature["id"], [])
    coords = feature["geometry"]["coordinates"]
    inds_to_split = []
    # calculate the feature's points closest to the point we indicated to split
    for p1 in splits_for_way:
        min_dist = math.inf
        min_ind = -1
        for ind, p2 in enumerate(coords):
            dist = math.dist(p1, p2)
            if dist < min_dist:
                min_dist = dist
                min_ind = ind
        inds_to_split.append(min_ind)
    # split the points and add to json
    if len(inds_to_split) > 0:
        inds_to_split.sort()
        split_coords = []
        start_ind = 0
        # get the new coordinates split by the points
        for ind in inds_to_split:
            split_coords.append(coords[start_ind:ind+1])
            start_ind = ind
        split_coords.append(coords[start_ind:])
        # now create a new feature with the new coordinates and add to json
        for new_coord_ind, new_coords in enumerate(split_coords):
            new_feature = copy.deepcopy(feature)
            new_id = new_feature["id"] + "-" + str(new_coord_ind)
            new_feature["id"] = new_id
            new_feature["properties"]["id"] = new_id
            new_feature["geometry"]["coordinates"] = new_coords
            split_json["features"].append(new_feature)
    else:
        split_json["features"].append(feature)

json.dump(split_json, outfile, indent=1)
