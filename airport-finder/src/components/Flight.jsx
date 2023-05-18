import SingleFlight from "./SingleFlight"
import Button from "./utils/Button"
import useAirports from "../hooks/useAirports";
import useDestination from "../hooks/useDestination";

export default function Flight({ flight }) {
    const airports = useAirports();
    const { setStopovers } = useDestination();

    const handleStopovers = (stops) => {
        if (stops[0] === '') {
            setStopovers(null);
            return;
        };
        const stopoverArr = stops[0].split(',').map(stop => {
            return airports.find(airport => airport.iata_code === stop.trim())
        })
        setStopovers(stopoverArr);
    }

    return (
        <div className="flight">
            <div className="flight__content">
                <SingleFlight flightInfo={flight.out}/>
                <SingleFlight flightInfo={flight.in}/>
            </div>
            <div className="flight__info">
                <div>
                    <b className="flight__price">{flight.price}</b>
                    <span style={{fontWeight : 400}}> / person</span>
                </div>
                    <Button >
                        <a href={flight.link}>View offer</a>
                    </Button>
                <Button onClick={() => handleStopovers(flight.out.stopovers.slice(1))}>View route</Button>
            </div>
            {/* <div id={`map-${flight.id}`}></div> */}
        </div>
    )
}