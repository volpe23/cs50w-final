import { useState, useEffect, useRef } from 'react'
import Finder from './components/FInder'
import './styles/App.scss'
import ReactMap, {Marker} from 'react-map-gl'
import RoomIcon from '@mui/icons-material/Room';
// const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const mapKey = import.meta.env.VITE_REACT_MAP_TOKEN;

function App() {
  const [viewport, setViewport] = useState({
    latitude: 56.946285,
    longitude: 24.105078,
    width: "100%",
    height: "100%",
    zoom: 10
  })


  return (
    <main className="main">
      <Finder/>
      <div id='map'>
      <ReactMap
        {...viewport}
        mapboxAccessToken={mapKey}
        onMove={evt => setViewport(evt.viewport)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        >

        </ReactMap>
      </div>
    </main>
  )
}

export default App
