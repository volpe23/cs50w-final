import { useEffect, useState } from "react";
import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";
import axios from 'axios'

export default function Flights({ flights, setStopovers, airports }) {
    

    
    const client = axios.create({
        baseURL: 'http://127.0.0.1:8000/backend/flight',
        headers: {"Access-Control-Allow-Origin": "*"}
    })


    return (
        <div className="all-flights">
            {flights.map((flight) => {
                return <Flight key={flight.id} flight={flight} setStopovers={setStopovers} airports={airports} />
            })}
        </div>
    )

}