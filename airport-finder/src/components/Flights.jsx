import { useEffect, useState } from "react";
import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";
import axios from 'axios'

export default function Flights({ flights, setStopovers }) {

    return (
        <div className="all-flights">
            {flights.map((flight) => {
                return <Flight key={flight.id} flight={flight} setStopovers={setStopovers} />
            })}
        </div>
    )

}