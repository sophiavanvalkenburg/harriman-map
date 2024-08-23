import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Map />
  </StrictMode>,
)
