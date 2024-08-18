import { useRef, useEffect, useState } from 'react';
import SidePanel from './SidePanel.tsx'
import mapboxgl from 'mapbox-gl';
import './App.css'

function App() {
  return (
    <div className="App">
      <SidePanel />
      <Map />
    </div>
  );
}

type LineId = string | number | undefined;

type LngLat = [number, number];

type TrailSegment = {
  type: "Feature",
  id: string,
  properties: {
    name: string,
    id: string,
    status: string,
    osm_way_ids: string[],
    length: number
  },
  geometry: {
    type: "LineString",
    coordinates: LngLat[]
  }
};

type TrailGeojson = {
  type: "FeatureCollection",
  features: TrailSegment[]
};

enum MapMode {
  BASE = 'base',
  TRAIL = 'trail',
  SEGMENT = 'segment',
};

enum sources {
  TRAILS = 'trails',
  SEGMENTS = 'segments'
}

const NOT_SELECTED_COLOR = "#696969";
const COMPLETED_COLOR = "#ff0000";
const INCOMPLETE_COLOR = "#8c0000";
const HIGHLIGHT_COLOR = "#ffe100";

function Map() {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVvd3lwdXJyIiwiYSI6ImNsemxlNTE0ZzAxbWUybG9qdHk1aGNlbHkifQ.WEaFTpVEow-9nOl0__ZqeA';

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // to be removed later
  const SEGMENT_DATA: TrailGeojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "73374a56-e337-451e-9add-a19b9eaa3c8b",
        "properties": {
          "name": "North Buck Trail",
          "id": "73374a56-e337-451e-9add-a19b9eaa3c8b",
          "status": "complete",
          "osm_way_ids": [
            "way/69412899"
          ],
          "length": 0.260799556147824
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1080865,
              41.2044052
            ],
            [
              -74.1081262,
              41.2042294
            ],
            [
              -74.1082764,
              41.2039549
            ],
            [
              -74.1083943,
              41.2038096
            ],
            [
              -74.1085553,
              41.2036078
            ],
            [
              -74.1088343,
              41.203398
            ],
            [
              -74.1090751,
              41.2031073
            ],
            [
              -74.1092017,
              41.2028935
            ],
            [
              -74.1092259,
              41.2026392
            ],
            [
              -74.1095745,
              41.2024373
            ],
            [
              -74.109993,
              41.2021467
            ],
            [
              -74.1101807,
              41.2019328
            ],
            [
              -74.1101539,
              41.2015736
            ],
            [
              -74.1100466,
              41.2012507
            ],
            [
              -74.1102183,
              41.2010327
            ],
            [
              -74.110508,
              41.2007583
            ],
            [
              -74.1106796,
              41.2005242
            ],
            [
              -74.1106689,
              41.2001932
            ],
            [
              -74.1109837,
              41.1999354
            ],
            [
              -74.1113307,
              41.1995162
            ],
            [
              -74.1114058,
              41.1992983
            ],
            [
              -74.1114165,
              41.1991369
            ],
            [
              -74.111556,
              41.1989754
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "id": "16731a11-ee89-4aad-b32d-7e679e27e763",
        "properties": {
          "name": "Hurst Trail",
          "id": "16731a11-ee89-4aad-b32d-7e679e27e763",
          "status": "complete",
          "osm_way_ids": [
            "way/65177022"
          ],
          "length": 0.3176183019950963
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1002583,
              41.2593594
            ],
            [
              -74.1003495,
              41.2593998
            ],
            [
              -74.1004138,
              41.259428
            ],
            [
              -74.1005909,
              41.2594845
            ],
            [
              -74.1007357,
              41.259553
            ],
            [
              -74.1008269,
              41.2597304
            ],
            [
              -74.100843,
              41.2599603
            ],
            [
              -74.1007947,
              41.2600571
            ],
            [
              -74.1007089,
              41.2602506
            ],
            [
              -74.1006016,
              41.2603837
            ],
            [
              -74.1005587,
              41.260541
            ],
            [
              -74.1006284,
              41.2606741
            ],
            [
              -74.100725,
              41.2608959
            ],
            [
              -74.100725,
              41.2610612
            ],
            [
              -74.1007786,
              41.2612951
            ],
            [
              -74.1008805,
              41.2615128
            ],
            [
              -74.1010361,
              41.2616862
            ],
            [
              -74.1012614,
              41.261912
            ],
            [
              -74.1014277,
              41.2620854
            ],
            [
              -74.1015672,
              41.2621661
            ],
            [
              -74.1017549,
              41.262158
            ],
            [
              -74.1018944,
              41.2621258
            ],
            [
              -74.1020339,
              41.2621862
            ],
            [
              -74.1021948,
              41.2621983
            ],
            [
              -74.1023665,
              41.2622225
            ],
            [
              -74.102565,
              41.2623435
            ],
            [
              -74.1027688,
              41.2623596
            ],
            [
              -74.1029458,
              41.262404
            ],
            [
              -74.1030961,
              41.2624403
            ],
            [
              -74.1033428,
              41.2624766
            ],
            [
              -74.1034233,
              41.2625693
            ],
            [
              -74.1035467,
              41.2627064
            ],
            [
              -74.103654,
              41.262783
            ],
            [
              -74.1037612,
              41.2628435
            ],
            [
              -74.1038793,
              41.262908
            ],
            [
              -74.1040348,
              41.2629927
            ],
            [
              -74.1041485,
              41.2630941
            ],
            [
              -74.104171,
              41.2631927
            ],
            [
              -74.1041493,
              41.2632904
            ],
            [
              -74.1041071,
              41.2633789
            ],
            [
              -74.1040131,
              41.2634233
            ],
            [
              -74.1040794,
              41.2635398
            ],
            [
              -74.1041795,
              41.2636493
            ],
            [
              -74.1043348,
              41.2637178
            ],
            [
              -74.1044318,
              41.263794
            ],
            [
              -74.1045856,
              41.2638641
            ],
            [
              -74.1046799,
              41.2639502
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "id": "602cb0d2-e7ee-4b5a-abb8-84cc5aeafa8f",
        "properties": {
          "name": "Diamond Mountain Tower Trail",
          "id": "602cb0d2-e7ee-4b5a-abb8-84cc5aeafa8f",
          "status": "complete",
          "osm_way_ids": [
            "way/62226398-1"
          ],
          "length": 0.19758861170948577
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1360765,
              41.1809913
            ],
            [
              -74.1359377,
              41.1809387
            ],
            [
              -74.1358535,
              41.1808919
            ],
            [
              -74.1358089,
              41.1808019
            ],
            [
              -74.1357929,
              41.1806541
            ],
            [
              -74.1358003,
              41.1805764
            ],
            [
              -74.135738,
              41.1804945
            ],
            [
              -74.1356828,
              41.1804508
            ],
            [
              -74.1356677,
              41.1803805
            ],
            [
              -74.1356543,
              41.1802981
            ],
            [
              -74.1356044,
              41.1802337
            ],
            [
              -74.1354955,
              41.1801034
            ],
            [
              -74.1353654,
              41.1800313
            ],
            [
              -74.1351764,
              41.179958
            ],
            [
              -74.1351016,
              41.1799271
            ],
            [
              -74.1350371,
              41.1799014
            ],
            [
              -74.1349073,
              41.1798789
            ],
            [
              -74.1347515,
              41.1797685
            ],
            [
              -74.1346171,
              41.1796397
            ],
            [
              -74.1344548,
              41.1795593
            ],
            [
              -74.1342953,
              41.1794701
            ],
            [
              -74.1341996,
              41.179403
            ],
            [
              -74.1341035,
              41.1793876
            ],
            [
              -74.1340321,
              41.1794048
            ],
            [
              -74.1339411,
              41.1794448
            ],
            [
              -74.1338246,
              41.1794968
            ],
            [
              -74.1336194,
              41.1795669
            ],
            [
              -74.133496,
              41.1795529
            ],
            [
              -74.1334489,
              41.1794837
            ],
            [
              -74.133461,
              41.179365
            ],
            [
              -74.1335442,
              41.1792318
            ],
            [
              -74.1336093,
              41.1791582
            ],
            [
              -74.1336354,
              41.1791288
            ],
            [
              -74.133697,
              41.1789848
            ],
            [
              -74.1336596,
              41.1789187
            ],
            [
              -74.1335813,
              41.1789063
            ],
            [
              -74.133487,
              41.1789062
            ],
            [
              -74.1332724,
              41.178938
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "id": "a1919e38-7e24-4166-9edd-ecb348f6a73d",
        "properties": {
          "name": "Diamond Mountain Tower Trail",
          "id": "a1919e38-7e24-4166-9edd-ecb348f6a73d",
          "status": "incomplete",
          "osm_way_ids": [
            "way/62226398-0"
          ],
          "length": 0.1086807114692338
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1332724,
              41.178938
            ],
            [
              -74.1331211,
              41.1791161
            ],
            [
              -74.1329628,
              41.1792811
            ],
            [
              -74.1327947,
              41.1794961
            ],
            [
              -74.1326269,
              41.1796578
            ],
            [
              -74.1325733,
              41.1797707
            ],
            [
              -74.1326362,
              41.1799823
            ],
            [
              -74.1326067,
              41.1800631
            ],
            [
              -74.1326054,
              41.1801422
            ],
            [
              -74.1327274,
              41.1802327
            ],
            [
              -74.1328535,
              41.1802952
            ],
            [
              -74.1329112,
              41.1803482
            ],
            [
              -74.132997,
              41.1805904
            ],
            [
              -74.1330707,
              41.1807252
            ],
            [
              -74.1332143,
              41.1808892
            ],
            [
              -74.1332974,
              41.181091
            ],
            [
              -74.1334262,
              41.1812041
            ],
            [
              -74.1334905,
              41.1813494
            ],
            [
              -74.1335978,
              41.1815109
            ],
            [
              -74.1337051,
              41.181624
            ],
            [
              -74.1338339,
              41.1817532
            ],
            [
              -74.1339197,
              41.1819147
            ],
            [
              -74.1339626,
              41.1820277
            ],
            [
              -74.1339841,
              41.1821892
            ],
            [
              -74.1341987,
              41.1824799
            ],
            [
              -74.1340484,
              41.1826898
            ],
            [
              -74.1339197,
              41.1828836
            ],
            [
              -74.1338661,
              41.1830048
            ],
            [
              -74.1337361,
              41.1831067
            ],
            [
              -74.1336472,
              41.1831767
            ],
            [
              -74.1335656,
              41.1832228
            ],
            [
              -74.1333892,
              41.1833325
            ],
            [
              -74.1333499,
              41.18335
            ],
            [
              -74.1333018,
              41.1833636
            ],
            [
              -74.1332757,
              41.1833924
            ],
            [
              -74.1332172,
              41.1834575
            ],
            [
              -74.1332147,
              41.1835154
            ],
            [
              -74.133127,
              41.1836466
            ],
            [
              -74.1330185,
              41.1837557
            ],
            [
              -74.1328897,
              41.1838364
            ],
            [
              -74.1327932,
              41.1839414
            ],
            [
              -74.1327073,
              41.1840787
            ],
            [
              -74.1326322,
              41.1841756
            ],
            [
              -74.1326322,
              41.1842539
            ],
            [
              -74.1326322,
              41.1842967
            ],
            [
              -74.1327335,
              41.1843965
            ],
            [
              -74.1328467,
              41.1844692
            ],
            [
              -74.1330241,
              41.1845251
            ],
            [
              -74.1332805,
              41.1845888
            ],
            [
              -74.1333714,
              41.1846799
            ]
          ]
        }
      }
    ]
  }

  const TRAIL_DATA: TrailGeojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "73374a56-e337-451e-9add-a19b9eaa3c8b",
        "properties": {
          "name": "North Buck Trail",
          "id": "73374a56-e337-451e-9add-a19b9eaa3c8b",
          "status": "complete",
          "osm_way_ids": [
            "way/69412899"
          ],
          "length": 0.260799556147824
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1080865,
              41.2044052
            ],
            [
              -74.1081262,
              41.2042294
            ],
            [
              -74.1082764,
              41.2039549
            ],
            [
              -74.1083943,
              41.2038096
            ],
            [
              -74.1085553,
              41.2036078
            ],
            [
              -74.1088343,
              41.203398
            ],
            [
              -74.1090751,
              41.2031073
            ],
            [
              -74.1092017,
              41.2028935
            ],
            [
              -74.1092259,
              41.2026392
            ],
            [
              -74.1095745,
              41.2024373
            ],
            [
              -74.109993,
              41.2021467
            ],
            [
              -74.1101807,
              41.2019328
            ],
            [
              -74.1101539,
              41.2015736
            ],
            [
              -74.1100466,
              41.2012507
            ],
            [
              -74.1102183,
              41.2010327
            ],
            [
              -74.110508,
              41.2007583
            ],
            [
              -74.1106796,
              41.2005242
            ],
            [
              -74.1106689,
              41.2001932
            ],
            [
              -74.1109837,
              41.1999354
            ],
            [
              -74.1113307,
              41.1995162
            ],
            [
              -74.1114058,
              41.1992983
            ],
            [
              -74.1114165,
              41.1991369
            ],
            [
              -74.111556,
              41.1989754
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "id": "16731a11-ee89-4aad-b32d-7e679e27e763",
        "properties": {
          "name": "Hurst Trail",
          "id": "16731a11-ee89-4aad-b32d-7e679e27e763",
          "status": "complete",
          "osm_way_ids": [
            "way/65177022"
          ],
          "length": 0.3176183019950963
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1002583,
              41.2593594
            ],
            [
              -74.1003495,
              41.2593998
            ],
            [
              -74.1004138,
              41.259428
            ],
            [
              -74.1005909,
              41.2594845
            ],
            [
              -74.1007357,
              41.259553
            ],
            [
              -74.1008269,
              41.2597304
            ],
            [
              -74.100843,
              41.2599603
            ],
            [
              -74.1007947,
              41.2600571
            ],
            [
              -74.1007089,
              41.2602506
            ],
            [
              -74.1006016,
              41.2603837
            ],
            [
              -74.1005587,
              41.260541
            ],
            [
              -74.1006284,
              41.2606741
            ],
            [
              -74.100725,
              41.2608959
            ],
            [
              -74.100725,
              41.2610612
            ],
            [
              -74.1007786,
              41.2612951
            ],
            [
              -74.1008805,
              41.2615128
            ],
            [
              -74.1010361,
              41.2616862
            ],
            [
              -74.1012614,
              41.261912
            ],
            [
              -74.1014277,
              41.2620854
            ],
            [
              -74.1015672,
              41.2621661
            ],
            [
              -74.1017549,
              41.262158
            ],
            [
              -74.1018944,
              41.2621258
            ],
            [
              -74.1020339,
              41.2621862
            ],
            [
              -74.1021948,
              41.2621983
            ],
            [
              -74.1023665,
              41.2622225
            ],
            [
              -74.102565,
              41.2623435
            ],
            [
              -74.1027688,
              41.2623596
            ],
            [
              -74.1029458,
              41.262404
            ],
            [
              -74.1030961,
              41.2624403
            ],
            [
              -74.1033428,
              41.2624766
            ],
            [
              -74.1034233,
              41.2625693
            ],
            [
              -74.1035467,
              41.2627064
            ],
            [
              -74.103654,
              41.262783
            ],
            [
              -74.1037612,
              41.2628435
            ],
            [
              -74.1038793,
              41.262908
            ],
            [
              -74.1040348,
              41.2629927
            ],
            [
              -74.1041485,
              41.2630941
            ],
            [
              -74.104171,
              41.2631927
            ],
            [
              -74.1041493,
              41.2632904
            ],
            [
              -74.1041071,
              41.2633789
            ],
            [
              -74.1040131,
              41.2634233
            ],
            [
              -74.1040794,
              41.2635398
            ],
            [
              -74.1041795,
              41.2636493
            ],
            [
              -74.1043348,
              41.2637178
            ],
            [
              -74.1044318,
              41.263794
            ],
            [
              -74.1045856,
              41.2638641
            ],
            [
              -74.1046799,
              41.2639502
            ]
          ]
        }
      },
      {
        "type": "Feature",
        "id": "f8837863-fbbd-4bdb-9e06-2fd48566e2e1",
        "properties": {
          "name": "Diamond Mountain Tower Trail",
          "id": "f8837863-fbbd-4bdb-9e06-2fd48566e2e1",
          "status": "incomplete",
          "osm_way_ids": [
            "way/62226398-1",
            "way/62226398-0"
          ],
          "length": 0.7829602239635152
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [
              -74.1360765,
              41.1809913
            ],
            [
              -74.1359377,
              41.1809387
            ],
            [
              -74.1358535,
              41.1808919
            ],
            [
              -74.1358089,
              41.1808019
            ],
            [
              -74.1357929,
              41.1806541
            ],
            [
              -74.1358003,
              41.1805764
            ],
            [
              -74.135738,
              41.1804945
            ],
            [
              -74.1356828,
              41.1804508
            ],
            [
              -74.1356677,
              41.1803805
            ],
            [
              -74.1356543,
              41.1802981
            ],
            [
              -74.1356044,
              41.1802337
            ],
            [
              -74.1354955,
              41.1801034
            ],
            [
              -74.1353654,
              41.1800313
            ],
            [
              -74.1351764,
              41.179958
            ],
            [
              -74.1351016,
              41.1799271
            ],
            [
              -74.1350371,
              41.1799014
            ],
            [
              -74.1349073,
              41.1798789
            ],
            [
              -74.1347515,
              41.1797685
            ],
            [
              -74.1346171,
              41.1796397
            ],
            [
              -74.1344548,
              41.1795593
            ],
            [
              -74.1342953,
              41.1794701
            ],
            [
              -74.1341996,
              41.179403
            ],
            [
              -74.1341035,
              41.1793876
            ],
            [
              -74.1340321,
              41.1794048
            ],
            [
              -74.1339411,
              41.1794448
            ],
            [
              -74.1338246,
              41.1794968
            ],
            [
              -74.1336194,
              41.1795669
            ],
            [
              -74.133496,
              41.1795529
            ],
            [
              -74.1334489,
              41.1794837
            ],
            [
              -74.133461,
              41.179365
            ],
            [
              -74.1335442,
              41.1792318
            ],
            [
              -74.1336093,
              41.1791582
            ],
            [
              -74.1336354,
              41.1791288
            ],
            [
              -74.133697,
              41.1789848
            ],
            [
              -74.1336596,
              41.1789187
            ],
            [
              -74.1335813,
              41.1789063
            ],
            [
              -74.133487,
              41.1789062
            ],
            [
              -74.1332724,
              41.178938
            ],
            [
              -74.1332724,
              41.178938
            ],
            [
              -74.1331211,
              41.1791161
            ],
            [
              -74.1329628,
              41.1792811
            ],
            [
              -74.1327947,
              41.1794961
            ],
            [
              -74.1326269,
              41.1796578
            ],
            [
              -74.1325733,
              41.1797707
            ],
            [
              -74.1326362,
              41.1799823
            ],
            [
              -74.1326067,
              41.1800631
            ],
            [
              -74.1326054,
              41.1801422
            ],
            [
              -74.1327274,
              41.1802327
            ],
            [
              -74.1328535,
              41.1802952
            ],
            [
              -74.1329112,
              41.1803482
            ],
            [
              -74.132997,
              41.1805904
            ],
            [
              -74.1330707,
              41.1807252
            ],
            [
              -74.1332143,
              41.1808892
            ],
            [
              -74.1332974,
              41.181091
            ],
            [
              -74.1334262,
              41.1812041
            ],
            [
              -74.1334905,
              41.1813494
            ],
            [
              -74.1335978,
              41.1815109
            ],
            [
              -74.1337051,
              41.181624
            ],
            [
              -74.1338339,
              41.1817532
            ],
            [
              -74.1339197,
              41.1819147
            ],
            [
              -74.1339626,
              41.1820277
            ],
            [
              -74.1339841,
              41.1821892
            ],
            [
              -74.1341987,
              41.1824799
            ],
            [
              -74.1340484,
              41.1826898
            ],
            [
              -74.1339197,
              41.1828836
            ],
            [
              -74.1338661,
              41.1830048
            ],
            [
              -74.1337361,
              41.1831067
            ],
            [
              -74.1336472,
              41.1831767
            ],
            [
              -74.1335656,
              41.1832228
            ],
            [
              -74.1333892,
              41.1833325
            ],
            [
              -74.1333499,
              41.18335
            ],
            [
              -74.1333018,
              41.1833636
            ],
            [
              -74.1332757,
              41.1833924
            ],
            [
              -74.1332172,
              41.1834575
            ],
            [
              -74.1332147,
              41.1835154
            ],
            [
              -74.133127,
              41.1836466
            ],
            [
              -74.1330185,
              41.1837557
            ],
            [
              -74.1328897,
              41.1838364
            ],
            [
              -74.1327932,
              41.1839414
            ],
            [
              -74.1327073,
              41.1840787
            ],
            [
              -74.1326322,
              41.1841756
            ],
            [
              -74.1326322,
              41.1842539
            ],
            [
              -74.1326322,
              41.1842967
            ],
            [
              -74.1327335,
              41.1843965
            ],
            [
              -74.1328467,
              41.1844692
            ],
            [
              -74.1330241,
              41.1845251
            ],
            [
              -74.1332805,
              41.1845888
            ],
            [
              -74.1333714,
              41.1846799
            ]
          ]
        }
      }
    ]
  };

  let clickedOnTrail = false;
  let hoveredLineId: LineId;
  let selectedTrailId: LineId;
  let mapMode = MapMode.BASE;

  function switchToTrailMode() {
    if (!map.current) return;
    console.log('TRAIL mode');
    mapMode = MapMode.TRAIL;
    map.current.setLayoutProperty('trail-lines-deselected', 'visibility', 'visible');
  }

  function switchToBaseMode() {
    if (!map.current) return;
    console.log('BASE mode');
    mapMode = MapMode.BASE;
    map.current.setLayoutProperty('trail-lines-deselected', 'visibility', 'none');
  }

  function onMapClick() {
    switch (mapMode) {
      case MapMode.TRAIL:
        if (!clickedOnTrail) {
          setTrailSelectedState(false);
          switchToBaseMode();
        }
        break;
      case MapMode.BASE:
        if (clickedOnTrail) {
          switchToTrailMode();
        }
        break;
    }
    clickedOnTrail = false;
  }

  function setHoverState(source: string, isHovered: boolean) {
    if (!map.current || hoveredLineId === undefined) return;
    map.current.setFeatureState(
      { source: source, id: hoveredLineId },
      { hover: isHovered }
    );
  }

  function setTrailSelectedState(isSelected: boolean) {
    if (!map.current || selectedTrailId === undefined) return;
    map.current.setFeatureState(
      { source: sources.TRAILS, id: selectedTrailId },
      { selected: isSelected }
    );
  }

  useEffect(() => {

    if (!mapContainer.current) return;
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/meowypurr/clzpy8ohh00bn01qg7rsa8u3u',
      center: [-74.076, 41.2309],
      zoom: 11.15
    });

    map.current.on('load', () => {

      if (!map.current) return;

      map.current.addSource(sources.SEGMENTS, {
        'type': 'geojson',
        'generateId': true,
        'data': SEGMENT_DATA
      });

      map.current.addSource(sources.TRAILS, {
        'type': 'geojson',
        'generateId': true,
        'data': TRAIL_DATA
      });

      map.current.addLayer({
        'id': 'segment-lines-complete',
        'type': 'line',
        'source': sources.SEGMENTS,
        'filter': ['==', 'complete', ['get', 'status']],
        'paint': {
          'line-color': COMPLETED_COLOR,
          'line-width': 2,
        }
      });

      map.current.addLayer({
        'id': 'segment-lines-incomplete',
        'type': 'line',
        'source': sources.SEGMENTS,
        'filter': ['==', 'incomplete', ['get', 'status']],
        'paint': {
          'line-color': INCOMPLETE_COLOR,
          'line-width': 2,
        }
      });

      map.current.addLayer({
        'id': 'trail-lines-deselected',
        'type': 'line',
        'source': sources.TRAILS,
        'layout': {
          'visibility': 'none',
        },
        'paint': {
          'line-color': NOT_SELECTED_COLOR,
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'selected'], false],
            0,
            1
          ],
          'line-width': 2,
        }
      })

      map.current.addLayer({
        'id': 'trail-lines-highlight',
        'type': 'line',
        'source': sources.TRAILS,
        'paint': {
          'line-color': HIGHLIGHT_COLOR,
          'line-gap-width': 2,
          'line-opacity': [
            'case',
            [
              'boolean', [
                'any', 
                  ['to-boolean', ['feature-state', 'hover']], 
                  ['to-boolean', ['feature-state', 'selected']]
              ], 
              false
            ],
            1,
            0
          ],
          'line-width': 2,
        }
      });

      map.current.addLayer({
        'id': 'segment-lines-highlight',
        'type': 'line',
        'source': sources.SEGMENTS,
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-color': HIGHLIGHT_COLOR,
          'line-gap-width': 2,
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ],
          'line-width': 2,
        }
      });

      map.current.addLayer({
        'id': 'trail-hitbox',
        'type': 'line',
        'source': sources.TRAILS,
        'paint': {
          'line-width': 15,
          'line-opacity': 0
        }
      });

      map.current.addLayer({
        'id': 'segment-hitbox',
        'type': 'line',
        'source': sources.SEGMENTS,
        'layout': {
          'visibility': 'none'
        },
        'paint': {
          'line-width': 15,
          'line-opacity': 0
        }
      });

      map.current.on('mouseenter', 'trail-hitbox', () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mousemove', 'trail-hitbox', (e) => {
        setHoverState(sources.TRAILS, false)
        if (e.features && e.features.length > 0) {
          hoveredLineId = e.features[0].id;
          setHoverState(sources.TRAILS, true);
        }
      });

      map.current.on('mouseleave', 'trail-hitbox', () => {
        if (!map.current) return;
        setHoverState(sources.TRAILS, false);
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('click', 'trail-hitbox', (e) => {
        clickedOnTrail = true;
        setTrailSelectedState(false);
        if (e.features && e.features.length > 0) {
          selectedTrailId = e.features[0].id;
          setTrailSelectedState(true);
        }
      });
/*
      map.current.on('mousemove', 'segment-hitbox', (e) => {
        setHoverState(sources.SEGMENTS, false)
        if (e.features && e.features.length > 0) {
          hoveredLineId = e.features[0].id;
          setHoverState(sources.SEGMENTS, true);
        }
      });

      map.current.on('mouseleave', 'segment-hitbox', () => {
        if (!map.current) return;
        setHoverState(sources.SEGMENTS, false);
        hoveredLineId = undefined;
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('click', 'segment-hitbox', () => {
        clickedOnTrail = true;
        //setMapMode(MapMode.SEGMENT);
      });
*/
    });

  });
  return (
    <div>
      <div ref={mapContainer} className="map-container" onClick={onMapClick}/>
    </div>
  );
}

export default App;
