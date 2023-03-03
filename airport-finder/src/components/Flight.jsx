import SingleFlight from "./SingleFlight"
import Button from "./utils/Button"

export default function Flight({ flight, setStopovers, airports }) {
    
    const handleStopovers = (stopovers) => {
        // console.log(stopovers[0].split(','))
        const stopoverArr = stopovers[0].split(',').map(stop => {
            return airports.find(airport => airport.iata_code === stop.trim())
        })
        // console.log(stopoverArr)
        setStopovers(stopoverArr);
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