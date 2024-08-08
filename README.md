# Harriman Map

## Steps for constructing trail data
1. Download Way data for trails from OSM:
```
http://www.overpass-api.de/api/xapi?way[highway=path|track|footway|steps|bridleway|cycleway][bbox=-74.2282,41.1164,-73.9238,41.3452]
```

2. However, this omits some Ways that we need to construct all trails so we still have to download data for all Ways from OSM for later processing:
```
http://www.overpass-api.de/api/xapi?way[bbox=-74.2282,41.1164,-73.9238,41.3452]
```

3. Convert both files to GeoJSON with [OsmToGeojson](https://github.com/tyrasd/osmtogeojson). From here on, I'll refer to the GeoJSON derived from the trails OSM data as `<harriman_rough.geojson>` and the GeoJSON derived from all Ways OSM data as `<harriman_all.geojson>`.

4. Now let's delete all the extraneous Way data from `<harriman_rough.geojson>`. This is not totally necessary, but it makes it easier to see what we're doing.
   1. In `map_for_data_editing.html`, make sure the data from `<harriman_rough.geojson>` is assigned to the `TRAILS_DATA` variable.
   2. In `map_for_data_editing.html`, click all the Ways you would like to delete. This will output their Way ids to the console.
   3. Save the console output to a file. You may need to clean up the file a bit. In this repo I've saved all deletions in `data/trail_edits/trail-deletions.log`.
   4. Run the `scripts/purge_trails.py` file:
   ```
   $ python3 scripts/purge_trails.py <harriman_rough.geojson> <trail_deletions.log> <harriman_purged.geojson>
   ```
5. Now we have to add some missing Ways from `<harriman_all.geojson>`.
   1. In `map_for_data_editing.html`, make sure the data from `<harriman_all.geojson>` is assigned to the `TRAILS_DATA` variable.
   2. In `map_for_data_editing.html`, click all the Ways you would like to add. This will output their Way ids to the console.
   3. Save the console output to a file. You may need to clean up the file a bit. In this repo I've saved all additions in `data/trail_edits/trail-additions.log`.
   4. Run the `scripts/add_trails.py` file:
   ```
   $ python3 scripts/add_trails.py <harriman_purged.geojson> <harriman_all.geojson> <trail_additions.log> <harriman_added.geojson>
   ```

6. Next, there are some Ways that need to be 'split' in order to accurately display the trails I've completed.
   1. In `map_for_data_editing.html`, make sure the data from `<harriman_added.geojson>` is assigned to the `TRAILS_DATA` variable.
   2. In `map_for_data_editing.html`, uncomment the log statement that prints lat/long data in the click handler.
   3. In `map_for_data_editing.html`, click the spot where you would like to split a Way. This will output the Way id, long, and lat to the console.
   4. Save the console output to a file. You may need to clean up the file a bit. In this repo I've saved all splits in `data/trail_edits/trail-splits.log`.
   5. Run the `scripts/split_trails.py` file:
   ```
   $ python3 scripts/split_trails.py <harriman_added.geojson> <trail_splits.log> <harriman_splits.geojson>
   ``` 
   Note that the ids of split Ways will have '-N' appended to the end of the id, where N is a number, for each new Way that results from the split.

7. If necessary, re-run the delete script after including any new split ids that you want to delete in `<trail_deletions.log>`.
```
$ python3 scripts/purge_trails.py <harriman_split.geojson> <trail_deletions.log> <harriman_complete.geojson>
```

8. Now we're ready to start constructing the trails themselves.
   1. In `map_for_data_editing.html`, make sure the data from `<harriman_complete.geojson>` is assigned to the `TRAILS_DATA` variable.
   2. _For each trail_, click the Way in the map. This will output the Way id to the console. **It's important to click the Ways in the exact order of the trail direction.**
   3. _For each trail_, save the console output to a file. Each file should have the same prefix. You may need to clean up the file a bit. In this repo I've saved all Way id files in `data/trail_ways/`.

9. Once we have saved the Way id files for all trails, repeat the step, but this time only click on the Ways that you have not yet completed. Save each **contiguous** list of Way ids in its own file, so there may be multiple lists of Way ids for each trail. Each file should have the same prefix. In this repo I've saved all incomplete Way id files in `data/trail_incompletes/`.

10. Once we have Way id files for all trails and all incompleted segments, we can output the "completed" and "incomplete" trail segments to geojson files. Run the `scripts/segment_all_trails.py` file:
    ```
    $ python3 scripts/segment_all_trails.py <harriman_complete.geojson> <trail_ways_prefix> <incomplete_trail_ways_prefix> <trail_ways_output_prefix>  <harriman_segmented.geojson>
    ```

11. Now, all trail segment data will be output to `<harriman_segmented.geojson>`, and segment data for each trail will be in the directory indicated in `<trail_ways_output_prefix>`. To view in `map_for_data_editing.html`, make sure the data from `<harriman_segmented.geojson>` is assigned to the `TRAILS_DATA` variable, and all layer filters are uncommented. We're done! 
