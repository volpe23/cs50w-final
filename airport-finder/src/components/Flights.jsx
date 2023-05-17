import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";

export default function Flights({ flights }) {

    return (
        <div className="all-flights">
            {flights.map((flight) => {
                return <Flight key={flight.id} flight={flight} />
            })}
        </div>
    )

}