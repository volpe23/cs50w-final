import { useState } from 'react'
import Finder from './components/FInder'
import Flights from './components/Flights'
import './styles/App.scss'

function App() {

  return (
    <main className="main">
      <Finder />
      <Flights />
    </main>
  )
}

export default App
