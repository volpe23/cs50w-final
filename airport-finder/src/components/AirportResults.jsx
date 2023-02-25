import Airport from './Airport'; 

export default function AirportResults({ results, resultsShown, handleAirportSelection }) {

    return (
        <div className='results'>
            {resultsShown.focused && <div className={`triangle ${resultsShown ? resultsShown.focused.name : ''}`}></div>}
            {results.length > 0 ? results.map(airport => <Airport key={airport.objectID} selectAirport={handleAirportSelection} info={airport} />) : <p>No match!</p>}
        </div>
    )
}