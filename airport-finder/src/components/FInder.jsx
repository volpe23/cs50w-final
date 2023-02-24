import React, { useState, useEffect } from 'react'
import Airport from './Airport'
import '../styles/Finder.scss'

export default function Finder() {
    const [results, setResults] = useState([]);
    const [airports, setAirports] = useState([]);
    const [from, setFrom] = useState(null);
    const [destination, setDestination] = useState(null);
    const [resultsShown, setResultsShown] = useState(false);

    const getAirports = async () => {
        const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
        const results = await airports.json();
        setAirports(results)
    }

    const searchAirport = (searchBox) => {
        if (searchBox.length === 0) return setResults([]);
        
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
    }

    const handleInputFocus = (e) => {
        setResultsShown({isFocused: true, focused: e.target});
        searchAirport(e.target.value);
    }
    const handleInputBlur = () => {
        setResultsShown(false)
    }

    const handleAirportSelection = (airport) => {
        console.log(resultsShown.focused)
        const inp = resultsShown.focused;
        inp.value = airport.city;
        resultsShown.focused.name === 'from' ? setFrom(airport) : setDestination(airport);
        setResultsShown(false);
    }

    useEffect(() => {
        const click = (e) => {
            console.log(e.target.className)
            //  (e.target.className !== 'search-div') ? setResultsShown(false) : setResultsShown(true)
        }
        getAirports()
        window.addEventListener('click', click)

        return () => window.removeEventListener('click', click)
    }, [])

    return (
        <div className='search-div'>
        <p>{from?.city} - {destination?.city}</p>
            <div className="searchbox">
                <input type='text' placeholder='From' name='from' className='finder' onFocus={handleInputFocus}  onChange={(e) => searchAirport(e.target.value)}/>
                <button className='swap-button'>==</button>
                <input type='text' placeholder='To' name='destination' onFocus={handleInputFocus} className='finder' onChange={(e) => searchAirport(e.target.value)}/>
            </div>
            {(resultsShown)  && 
                (<div className='results'>
                        {resultsShown.focused && <div className={`triangle ${resultsShown ? resultsShown.focused.name : ''}`}></div>}
                        {results.length > 0 ? results.map(airport => <Airport key={airport.objectID} selectAirport={handleAirportSelection} info={airport} />) : <p>No match!</p>}
                </div>)
            }
        </div>
    )
}