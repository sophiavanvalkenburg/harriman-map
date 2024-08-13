//import { useRef, useEffect, useState } from 'react';
import { useRef, useEffect } from 'react';
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
    const map = useRef<mapboxgl.Map|null>(null);

    useEffect(() => {
      if (!mapContainer.current) return;
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/meowypurr/clzpy8ohh00bn01qg7rsa8u3u',
        center: [-74.076, 41.2309],
        zoom: 11.15
      });
    });

    

    return (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    );
}

export default App
