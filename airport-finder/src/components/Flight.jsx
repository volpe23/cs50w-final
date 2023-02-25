import SingleFlight from "./SingleFlight"

export default function Flight({ flight }) {

    return (
        <div className="flight">
            <div className="flight__content">
                <SingleFlight flightInfo={flight.out}/>
                <SingleFlight flightInfo={flight.in}/>
            </div>
            <div className="flight__price">{flight.price}</div>
        </div>
    )
}