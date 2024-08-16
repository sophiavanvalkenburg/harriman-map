from segment_trail_by_completion import segment_trail
import sys
import glob
import json

ways_data_file = open(sys.argv[1]) # e.g. data/harriman_bearmt_split.geojson
ways_data_json = json.load(ways_data_file)
trail_ways_prefix = sys.argv[2] # e.g. data/trail_ways/trail_
trail_incompletes_prefix = sys.argv[3] # e.g. data/trail_incompletes/trail_incomplete_
trail_outfile_prefix = sys.argv[4] # e.g. data/trail_geojson/trail_
out_file = open(sys.argv[5], 'w')

TRAIL_IDS = [
    "1777",
    "1777E",
    "1777W",
    "1779",
    "anthony_wayne",
    "appalachian",
    "arden_surebridge",
    "beech",
    "blue_disc",
    "bottle_cap",
    "breakneck_mountain",
    "brooks_lake",
    "buck",
    "conklins_crossing",
    "cornell_mine",
    "dater_mountain_blue",
    "dater_mountain_orange",
    "diamond_mountain_tower",
    "dunning",
    "fawn",
    "hillburn_torne_sebago",
    "hurst",
    "kakiat",
    "kakiat_county_park_mountain",
    "kakiat_county_park_old_mill",
    "lake_tiorati",
    "lichen",
    "long_path",
    "major_welch",
    "menomine",
    "north_buck",
    "nurian",
    "parker_cabin_hollow",
    "pine_meadow",
    "poached_egg",
    "popolopen_gorge",
    "raccoon_brook_hills",
    "ramapo_dunderberg",
    "red_arrow",
    "red_cross",
    "reeves_brook",
    "sapphire",
    "seven_hills",
    "stahahe_brook",
    "stony_brook",
    "suffern_bear_mountatin",
    "timp_torne",
    "triangle",
    "tuxedo_mount_ivy",
    "twin_forts",
    "victory",
    "white_bar",
    "white_cross"
]

all_trails_data = {
  "type": "FeatureCollection",
  "features": []
}

for id in TRAIL_IDS:
    trail_way_ids_file = open(trail_ways_prefix + id + ".log")
    trail_name = id.replace("_", " ").title()
    if (trail_name != "Long Path"):
        trail_name += " Trail"
    trail_incompletes_ids_fnames = glob.glob(trail_incompletes_prefix + id + "_*")
    trail_incompletes_ids_files = [open(fname) for fname in trail_incompletes_ids_fnames]

    print(trail_name)

    trail_data_segmented_by_completion = segment_trail(ways_data_json, trail_name, trail_way_ids_file, trail_incompletes_ids_files, True)
    all_trails_data["features"].extend(trail_data_segmented_by_completion["features"])

    trail_way_ids_file.seek(0)
    for file in trail_incompletes_ids_files:
        file.seek(0)

    trail_data_not_segmented_by_completion = segment_trail(ways_data_json, trail_name, trail_way_ids_file, trail_incompletes_ids_files, False)
    trail_out_file = open(trail_outfile_prefix + id + ".geojson", 'w')
    json.dump(trail_data_not_segmented_by_completion, trail_out_file, indent=1)

    trail_out_file.close()
    trail_way_ids_file.close()
    for file in trail_incompletes_ids_files:
        file.close()

json.dump(all_trails_data, out_file, indent=1)