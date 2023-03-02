import SingleFlight from "./SingleFlight"
import Button from "./utils/Button"




export default function Flight({ flight }) {
    
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
                <Button>View route</Button>
            </div>
            <div id={`map-${flight.id}`}></div>
        </div>
    )
}