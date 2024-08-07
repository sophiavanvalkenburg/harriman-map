from segment_trail_by_completion import make_segment
import sys

ways_data = sys.argv[1] # e.g. data/harriman_bearmt_split.geojson
trail_ways_prefix = sys.argv[2] # e.g. data/trail_ways/trail_
trail_outfile_prefix = sys.argv[3] # e.g. data/trail_geojson/trail_
trail_incompletes_prefix = sys.argv[4] # e.g. data/trail_incompletes/trail_incomplete_
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

trail_ways_files = [trail_ways_prefix + id + ".log" for id in TRAIL_IDS]
trail_out_files = [trail_outfile_prefix + id + ".geojson" for id in TRAIL_IDS]
trail_incomplete_prefixes = [trail_incompletes_prefix + id + "_" for id in TRAIL_IDS]