import { useEffect, useState } from "react";
import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";
import axios from 'axios'

export default function Flights({from, destination}) {
    const exampleFlight = {'id': '788164faf6eacacf9a5eaf8bab6d6b02', 
    'price': '€322', 
    'link': 'https://www.kayak.ie/book/flight?code=PdECIldOSL.FC9t5hE4q2rBDARZyLA7ng.33906.788164faf6eacacf9a5eaf8bab6d6b02&h=19c7db95e8a2&sub=E-1897db19a5e&payment=0.00:EUR:VA_D:Visa%20Debit:true&pageOrigin=F..RP.FE.M16', 
    'out': {'date': '22/9', 'times': '11:30–13:35', 'stopovers': ['direct', ''], 'duration': '3h 05m'}, 
    'in': {'date': '4/10', 'times': '14:20–18:20', 'stopovers': ['direct', ''], 'duration': '3h 00m'}}

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
        setFlights([exampleFlight, ...data.flights]);
    }
    return (
        <div className="all-flights">
        
        <button onClick={getFlights} >Get flights</button>
            { flights.map((flight) => {
                return <Flight key={flight.id} flight={flight} />
            })}
        </div>
    )

}