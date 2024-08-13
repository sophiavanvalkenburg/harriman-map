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

function Map() {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWVvd3lwdXJyIiwiYSI6ImNsemxlNTE0ZzAxbWUybG9qdHk1aGNlbHkifQ.WEaFTpVEow-9nOl0__ZqeA';

  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  // to be removed later
  const TRAILS_DATA: TrailGeojson = {
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
       }
    ]
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

      map.current.addSource('trails', {
        'type': 'geojson',
        'generateId': true,
        'data': TRAILS_DATA
      });

      map.current.addLayer({
        'id': 'trail-lines-complete',
        'type': 'line',
        'source': 'trails',
        'filter': ['==', 'complete', ['get', 'status']],
        'paint': {
          'line-color': "#ff0000",
          'line-width': 2,
        }
      });

      map.current.addLayer({
        'id': 'trail-lines-incomplete',
        'type': 'line',
        'source': 'trails',
        'filter': ['==', 'incomplete', ['get', 'status']],
        'paint': {
          'line-color': "#8c0000",
          'line-width': 2,
        }
      });


      map.current.addLayer({
        'id': 'trail-lines-highlight',
        'type': 'line',
        'source': 'trails',
        'paint': {
          'line-color': "#ffe100",
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
        'source': 'trails',
        'paint': {
          'line-width': 15,
          'line-opacity': 0
        }
      });

      let hoveredLineId:string|number|undefined;

      function setHoverState(isHovered:boolean) {
        if (!map.current || hoveredLineId === undefined) return;
        map.current.setFeatureState(
          { source: 'trails', id: hoveredLineId },
          { hover: isHovered }
        );
      }

      map.current.on('mousemove', 'trail-hitbox', (e) => {
        setHoverState(false)
        if (e.features && e.features.length > 0) {
          hoveredLineId = e.features[0].id;
          setHoverState(true);
        }
      });

      map.current.on('mouseleave', 'trail-hitbox', () => {
        if (!map.current) return;
        setHoverState(false);
        hoveredLineId = undefined;
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('mouseenter', 'trail-hitbox', () => {
        if (!map.current) return;
        map.current.getCanvas().style.cursor = 'pointer';
      });

    });

  });
  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
