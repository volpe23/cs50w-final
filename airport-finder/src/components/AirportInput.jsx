import { useState, useRef, useEffect, useCallback } from "react";
import AirportResults from "./AirportResults";
import '../styles/AirportInput.scss';

export default function AirportInput ({ placeholder, airports, setAirport, selectedAirport }) {
    const [results, setResults] = useState([]);
    const [resultsShown, setResultsShown] = useState(false);
    const inp = useRef(null);
    const divWrapper = useRef(null)

    const searchAirport = (searchBox) => {
        // const searchBox = e.target.value;
        if (searchBox.length === 0) {
            setResultsShown(false)
            return setResults([])
        }
        
        const fits = airports.filter((airport) => {
            const regex = new RegExp(`^${searchBox}`, "gi");
            return (
              airport.country.match(regex) ||
              airport.name.match(regex) ||
              airport.city.match(regex) ||
             airport.iata_code.match(regex)
            );
          });
        setResults(fits)
        // setResultsShown(true)
    }
    
    const handleAirportSelection = (airport) => {
        setAirport(airport);
        inp.current.value = airport.city
        setResultsShown(false);
    }

    const hideResults = useCallback(e => {
        if (resultsShown && !divWrapper.current.contains(e.target)) {
            setResultsShown(false);
        }
    }, [resultsShown])

    useEffect(() => {
        window.addEventListener('mousedown', hideResults);

        return () => window.removeEventListener('mousedown', hideResults);
    }, [hideResults])

    const handleInputBlur = () => {
        if (selectedAirport) selectedAirport.city !== inp.current.value ? inp.current.value = selectedAirport.city : console.log('No change');
        // if (!selectedAirport && inp.current.value !== 0)
    }

    const handleInputFocus = (e) => {
        setResultsShown(true);
        searchAirport(inp.current.value);
    }


    return (
        <div ref={divWrapper} className='input-results' >
            <input type='text' className='finder'
            ref={inp}
            placeholder={placeholder}
            onChange={(e) => searchAirport(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            />
            {resultsShown && <AirportResults results={results} handleAirportSelection={handleAirportSelection}/>}
        </div>
    )
}