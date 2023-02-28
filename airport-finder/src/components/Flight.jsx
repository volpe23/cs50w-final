import SingleFlight from "./SingleFlight"

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
                    <button className="btn">View offer</button>
                </a>
            </div>
        </div>
    )
}