import { useEffect, useState } from "react";
import axios from 'axios'

export default function Flights({from, destination}) {

    const [flights, setFlights] = useState([])
    const url = `http://127.0.0.1:8000/backend/flight?from=${from}&destination=${destination}`;
    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000/backend/flight',
        headers: {"Access-Control-Allow-Origin": "*"}
    })

    async function getFlights() {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.flights)
        setFlights(data.flights);
    }
    
    return (
        <div>
        
        <button onClick={getFlights} >Get flights</button>
            { flights.map(f => {
                return <div>
                    {/* <p>{f.price}</p> */}
                    <div>
                        <p>{f.out?.date}</p>
                        <p>{f.out?.times}</p>
                        <p>{f.out?.stopovers}</p>
                        <p>{f.out?.duration}</p>
                    </div>
                    <div>
                        <p>{f.in?.date}</p>
                        <p>{f.in?.times}</p>
                        <p>{f.in?.stopovers}</p>
                        <p>{f.in?.duration}</p>
                    </div>
                </div>
            })}
        </div>
    )

}