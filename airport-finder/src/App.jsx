import { useState, useEffect } from 'react'
import Finder from './components/FInder'
import Flights from './components/Flights'
import './styles/App.scss'

function App() {

  const [airports, setAirports] = useState([]);




  return (
    <main className="main">
      <Finder airports={airports} />
    </main>
  )
}

export default App
