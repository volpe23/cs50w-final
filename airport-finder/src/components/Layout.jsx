import { useState, useEffect, createContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import useAuth from "../hooks/useAuth";

export const AirportContext = createContext(null);

export default function Layout(props) {

    const fetchUser = useFetchUser();
    const [airports, setAirports] = useState(null);
    const { userAccount } = useAuth();
    const getAirports = async () => {
        const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
        const results = await airports.json();
        return setAirports(results)
    }

    useEffect(() => {
        console.log('Rendered');
        const controller = new AbortController();
        fetchUser(controller);
        getAirports();

        return () => controller.abort()
    }, [])
    
    return (
        <>
            <AirportContext.Provider value={airports}>
                {props.children}
            </AirportContext.Provider>
        </>
    )
}