import { useState, useEffect } from 'react';
import { FromDestinationContext } from '../contexts/FromDestinationContext';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Map from './Map';
import Finder from './FInder';

export default function Home() {
    const refresh = useRefreshToken();
    const { getUser, userAccount } = useAuth();
    const [from, setFrom] = useState(null);
    const [destination, setDestination] = useState(null);
    const [stopovers, setStopovers] = useState(null);

    useEffect(() => {
        if (!userAccount) {
            console.log('need user');
            try {
                getUser();
            } catch (err) {
                console.log(err, 'getting new tokens');
                refresh();
                getUser();
            }
        } 
    }, [])

    return (

            <FromDestinationContext.Provider value={{fromAirport: [from, setFrom], destinationAirport: [destination, setDestination], stopovers: {stopovers, setStopovers}}}>
                    <Finder />
                    <button onClick={refresh}>Clicke here</button>
                <Map from={from} destination={destination} stopovers={stopovers}>
                </Map>
            </FromDestinationContext.Provider>
        
    )
}