import React, { useState, useEffect } from 'react'
import Airport from './Airport'
import '../styles/Finder.scss'

export default function Finder() {
    const [search, setSearch] = useState([])
    const [airports, setAirports] = useState([])

    const getAirports = async () => {
        const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
        const results = await airports.json();
        setAirports(results)
    }

    const searchAirport = (searchBox) => {
        if (searchBox.length === 0) return setSearch([])
        
        const fits = airports.filter((airport) => {
            const regex = new RegExp(`^${searchBox}`, "gi");
            return (
              airport.country.match(regex) ||
              airport.name.match(regex) ||
              airport.city.match(regex) ||
             airport.iata_code.match(regex)
            );
          });
        setSearch(fits)
    }

    useEffect(() => {
        getAirports()
    }, [])

    return (
        <div className='search-div'>
            <input type='text' placeholder='Airport...' className='finder' onChange={(e) => searchAirport(e.target.value)}/>
            <div class='results'>
                {search && search.map(airport => <Airport key={airport.objectID} info={airport}/>
                )}
            </div>
        </div>
    )
}