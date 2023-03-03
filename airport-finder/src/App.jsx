import { useState, useEffect, useRef } from 'react'
import Finder from './components/FInder'
import Map from './components/Map'
import './styles/App.scss'

function App() {

  const [from, setFrom] = useState(null);
  const [destination, setDestination] = useState(null);
  const [stopovers, setStopovers] = useState(null);


  return (
    <main className="main">
      <Finder from={from} destination={destination} setFrom={setFrom} setDestination={setDestination} setStopovers={setStopovers} />
      <Map from={from} destination={destination} stopovers={stopovers} >

      </Map>
    </main>
  )
}

export default App
