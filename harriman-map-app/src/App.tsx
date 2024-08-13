import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css'

function App() {
  return (
    <div className="App">
     <Map />
    </div>
  );
}

function Map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWVvd3lwdXJyIiwiYSI6ImNsemxlNTE0ZzAxbWUybG9qdHk1aGNlbHkifQ.WEaFTpVEow-9nOl0__ZqeA';
    
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-74.076);
    const [lat, setLat] = useState(41.2309);
    const [zoom, setZoom] = useState(11.15);

    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/meowypurr/clzpy8ohh00bn01qg7rsa8u3u',
        center: [lng, lat],
        zoom: zoom
      });
    });

    

    return (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    );
}

export default App
