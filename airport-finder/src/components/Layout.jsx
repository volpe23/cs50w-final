import { useState, useEffect, createContext } from "react";


export const AirportContext = createContext(null);

export default function Layout(props) {

    
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
        <>
            <AirportContext.Provider value={airports}>
                {props.children}
            </AirportContext.Provider>
        </>
    )
}