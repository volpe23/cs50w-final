import { useEffect, useState } from "react";
import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";
import axios from 'axios'

export default function Flights({from, destination}) {
    const exampleFlight = {price: '€3,297', out: {date: '24/9', times: '19:40–08:40+2', stopovers: ['2 stops', 'PVG, CPH'], duration: '43h 00m'}, in: {date: '3/10', times: '15:10–10:10+2', stopovers: ['2 stops', 'CPH, PVG'], duration: '37h 00m'}}

    const [flights, setFlights] = useState([exampleFlight])
    const url = `http://127.0.0.1:8000/backend/flight?from=${from}&destination=${destination}`;
    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000/backend/flight',
        headers: {"Access-Control-Allow-Origin": "*"}
    })

    async function getFlights() {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.flights)
        setFlights([...flights, ...data.flights]);
    }
    return (
        <div className="all-flights">
        
        <button onClick={getFlights} >Get flights</button>
            { flights.map((flight, i) => {
                return <Flight key={i} flight={flight} />
            })}
        </div>
    )

}