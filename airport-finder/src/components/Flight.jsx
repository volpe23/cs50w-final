import { useContext } from "react"
import SingleFlight from "./SingleFlight"
import Button from "./utils/Button"
import { AirportContext } from "./Layout"
import { FromDestinationContext } from "../contexts/FromDestinationContext"

export default function Flight({ flight }) {
    const airports = useContext(AirportContext);
    const { stopovers } = useContext(FromDestinationContext);

    const handleStopovers = (stops) => {
        if (stops[0] === '') {
            stopovers.setStopovers(null);
            return;
        };
        const stopoverArr = stops[0].split(',').map(stop => {
            return airports.find(airport => airport.iata_code === stop.trim())
        })
        console.log(stops);
        stopovers.setStopovers(stopoverArr);
    }

    return (
        <div className="flight">
            <div className="flight__content">
                <SingleFlight flightInfo={flight.out}/>
                <SingleFlight flightInfo={flight.in}/>
            </div>
            <div className="flight__info">
                <span>{flight.price}</span>
                <a href={flight.link}>
                    <Button >View offer</Button>
                </a>
                <Button onClick={() => handleStopovers(flight.out.stopovers.slice(1))}>View route</Button>
            </div>
            <div id={`map-${flight.id}`}></div>
        </div>
    )
}