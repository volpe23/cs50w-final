import Finder from './components/FInder';
import Map from './components/Map';
import { FromDestinationContext } from './contexts/FromDestinationContext';

export default function Home(props) {


    return (
        <FromDestinationContext.Provider value={{fromAirport: [from, setFrom], destinationAirport: [destination, setDestination], stopovers: {stopovers, setStopovers}}}>
                <Finder />
            <Map from={from} destination={destination} stopovers={stopovers}>
            </Map>
		</FromDestinationContext.Provider>
    )
}