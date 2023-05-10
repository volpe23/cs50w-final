import { useState } from 'react';
import Map from './Map';
import { FromDestinationContext } from '../contexts/FromDestinationContext';
import Finder from './FInder';
import useRefreshToken from '../hooks/useRefreshToken';

export default function Home() {
    const refresh = useRefreshToken();
    const [from, setFrom] = useState(null);
    const [destination, setDestination] = useState(null);
    const [stopovers, setStopovers] = useState(null);

    return (

            <FromDestinationContext.Provider value={{fromAirport: [from, setFrom], destinationAirport: [destination, setDestination], stopovers: {stopovers, setStopovers}}}>
                    <Finder />
                    <button onClick={refresh}>Clicke here</button>
                <Map from={from} destination={destination} stopovers={stopovers}>
                </Map>
            </FromDestinationContext.Provider>
        
    )
}