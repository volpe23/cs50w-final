import { useState, useEffect, useRef, createContext } from 'react'
import Finder from './components/FInder'
import Map from './components/Map'
import { FromDestinationContext } from './contexts/FromDestinationContext'
import { Marker } from 'react-map-gl'
import './styles/App.scss'



export const AirportContext = createContext(null);

function App() {
	const [from, setFrom] = useState(null);
	const [destination, setDestination] = useState(null);
	const [stopovers, setStopovers] = useState(null);
	const [airports, setAirports] = useState(null);

	const getAirports = async () => {
		const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
		const results = await airports.json();
		return setAirports(results)
	}
	
	useEffect(() => {
		getAirports()
	}, [])

	return (
		<main className="main">
		<FromDestinationContext.Provider value={{fromAirport: [from, setFrom], destinationAirport: [destination, setDestination], stopovers: {stopovers, setStopovers}}}>
			<AirportContext.Provider value={airports}>
				<Finder />
			</AirportContext.Provider>
			<Map from={from} destination={destination} stopovers={stopovers}>
			</Map>
		</FromDestinationContext.Provider>
		</main>
	)
	}

export default App
