import Airport from './Airport'; 
import '../styles/AirportResults.scss';

export default function AirportResults({ results, resultsShown, handleAirportSelection }) {

    return (
        <div className='results'>
            {resultsShown && <div className={`triangle`}></div>}
            {results.length > 0 ? results.map(airport => <Airport key={airport.objectID} selectAirport={handleAirportSelection} info={airport} />) : <p>No match!</p>}
        </div>
    )
}