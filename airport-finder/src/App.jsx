import { useState, useEffect } from 'react'
import Finder from './components/FInder'
import Flights from './components/Flights'
import './styles/App.scss'

function App() {

  const [airports, setAirports] = useState([]);


  const getAirports = async () => {
    const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
    const results = await airports.json();
    setAirports(results)
}

  useEffect(() => {
    getAirports()
  })

  return (
    <main className="main">
      <Finder airports={airports} />
    </main>
  )
}

export default App
