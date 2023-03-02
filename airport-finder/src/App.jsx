import { useState, useEffect, useRef } from 'react'
import Finder from './components/FInder'
import Map from './components/Map'
import './styles/App.scss'

function App() {

  const [from, setFrom] = useState(null);
  const [destination, setDestination] = useState(null);


  return (
    <main className="main">
      <Finder from={from} destination={destination} setFrom={setFrom} setDestination={setDestination}/>
      <Map from={from} destination={destination}>

      </Map>
    </main>
  )
}

export default App
