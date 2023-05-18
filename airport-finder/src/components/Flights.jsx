import '../styles/Flight.scss'
import '../styles/Flights.scss';
import Flight from "./Flight";
import Spinner from './utils/spinner';

export default function Flights({ flights, isSearching }) {

    return (
        <div className="all-flights">
            {(flights && !isSearching) ? 
            flights.length > 0 ?
                flights?.map((flight) => {
                    return <Flight key={flight.id} flight={flight} />
                }) 
                :
                (<div>No flights available in this period</div>)
            :
            <Spinner />}
        </div>
    )

}