import React, { useState, useEffect, Children } from 'react'
import Flights from './Flights';
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
        if (searchBox.length === 0) {
            resultsShown?.focused?.name === 'from' ? setFrom(null) : setDestination(null)   
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
    }

    const handleInputFocus = (e) => {
        console.log('focused');
        setResultsShown({isFocused: true, focused: e.target});
        searchAirport(e.target.value);
    }
    const handleInputBlur = (e) => {
        // setResultsShown(false)
        console.log(e.target.value)
        if (e.target.value.length !== 0) {
            e.target.name === 'from' ? e.target.value = from?.city : e.target.value = destination?.city
        } else return
    }

    const handleAirportSelection = (airport) => {
        console.log(resultsShown.focused)
        const inp = resultsShown.focused;
        inp.value = airport.city;
        resultsShown.focused.name === 'from' ? setFrom(airport) : setDestination(airport);
        setResultsShown(false);
    }
    
    useEffect(() => {
        const searchDiv = document.querySelector('.search-div');
        const click = (e) => {
            if (!searchDiv.contains(e.target)) setResultsShown(false);
        }
        getAirports()
        window.addEventListener('click', click)

        return () => window.removeEventListener('click', click)
    }, [])

    const swapDirections = () => {
        let temp = from;
        setFrom(destination);
        setDestination(temp);
    }


    return (
        <div className='search-div'>
        <p>{from && `${from?.city} (${from?.iata_code})`} - {destination && `${destination.city} (${destination.iata_code})`}</p>
            <div className="searchbox">
                <input type='text' placeholder='From' name='from' className='finder' onFocus={handleInputFocus}  onChange={(e) => searchAirport(e.target.value)}/>
                <button className='swap-button' onClick={() => swapDirections()}>==</button>
                <input type='text' placeholder='To' name='destination' onFocus={handleInputFocus} className='finder' onChange={(e) => searchAirport(e.target.value)}/>
            </div>
            {(resultsShown)  && 
                (<div className='results'>
                        {resultsShown.focused && <div className={`triangle ${resultsShown ? resultsShown.focused.name : ''}`}></div>}
                        {results.length > 0 ? results.map(airport => <Airport key={airport.objectID} selectAirport={handleAirportSelection} info={airport} />) : <p>No match!</p>}
                </div>)
            }
        { (from && destination) && <Flights from={from?.iata_code} destination={destination?.iata_code}/>}
        </div>
    )
}