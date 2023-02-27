import React, { useState, useEffect, useRef } from 'react'
import Flights from './Flights';
import AirportInput from './AirportInput';
import AirportResults from './AirportResults';
import '../styles/Finder.scss'

export default function Finder({  }) {
    const [airports, setAirports] = useState(null)
    const [from, setFrom] = useState(null);
    const [destination, setDestination] = useState(null);

    const getAirports = async () => {
        const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
        const results = await airports.json();
        setAirports(results)
    }


    

    // const handleInputFocus = (e) => {
    //     console.log('focused');
    //     setResultsShown({isFocused: true, focused: e.target});
    //     searchAirport(e.target.value);
    // }
    // const handleInputBlur = (e) => {
    //     console.log(e.target.value)
    //     if (e.target.value.length !== 0) {
    //         e.target.name === 'from' ? e.target.value = from?.city : e.target.value = destination?.city
    //     } else return
    // }


    const click = (e) => {
        if (!searchDiv.contains(e.target)) setResultsShown(false);
    }

    useEffect(() => {
        // const searchDiv = document.querySelector('.search-div');
        
        // window.addEventListener('click', click)
        getAirports()
        // return () => window.removeEventListener('click', click)
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
                <AirportInput 
                    placeholder={'From'}
                    airports={airports}
                    setAirport={setFrom}
                    selectedAirport={from}
                />
                <button className='swap-button' onClick={() => swapDirections()}>==</button>
                <AirportInput 
                    placeholder={'To'} 
                    airports={airports} 
                    setAirport={setDestination} 
                    selectedAirport={destination}
                />
            </div>
            {/* {(resultsShown)  && <AirportResults results={results} resultsShown={resultsShown} handleAirportSelection={handleAirportSelection}/>} */}
            {<Flights from={from?.iata_code} destination={destination?.iata_code}/>}
        </div>
    )
}