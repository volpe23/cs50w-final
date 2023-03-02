import React, { useState, useEffect, useRef } from 'react';
import Flights from './Flights';
import AirportInput from './AirportInput';
import Button from './utils/Button';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateSelector from './utils/Date';

import '../styles/Finder.scss'

export default function Finder({}) {
    const [airports, setAirports] = useState(null);
    const [from, setFrom] = useState(null);
    const [destination, setDestination] = useState(null);
    const [flights, setFlights] = useState([exampleFlight]);
    const [startDate, setStartDate] = useState(null);
    const [backDate, setBackDate] = useState(null);

    const getAirports = async () => {
        const airports = await fetch('https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json');
        const results = await airports.json();
        setAirports(results)
    }


    useEffect(() => {
        getAirports()
    }, [])

    const swapDirections = () => {
        let temp = from;
        setFrom(destination);
        setDestination(temp);
        temp = 0
    }

    async function getFlights() {
        const url = `http://127.0.0.1:8000/backend/flight?from=${from?.iata_code}&destination=${destination?.iata_code}&start=${convertDate(startDate)}&back=${convertDate(backDate)}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.flights)
        setFlights([exampleFlight, ...data.flights]);
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
                <button className='swap-button' onClick={() => swapDirections()}>
                    <SyncAltIcon />
                </button>
                <AirportInput 
                    placeholder={'To'} 
                    airports={airports} 
                    setAirport={setDestination} 
                    selectedAirport={destination}
                />
                <Button onClick={getFlights} type={"round"}>
                    <SearchIcon></SearchIcon>
                </Button>
            </div>
            {(from && destination) && <div className='date-selectors'>
                <DateSelector onDateSelect={setStartDate} />
                <DateSelector onDateSelect={setBackDate} />
            </div>}
            {/* {(resultsShown)  && <AirportResults results={results} resultsShown={resultsShown} handleAirportSelection={handleAirportSelection}/>} */}
            <Flights flights={flights}/>
        </div>
    )
}

function convertDate(inp) {
    const date = inp
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

const exampleFlight = {'id': '788164faf6eacacf9a5eaf8bab6d6b02', 
    'price': '€322', 
    'link': 'https://www.kayak.ie/book/flight?code=PdECIldOSL.FC9t5hE4q2rBDARZyLA7ng.33906.788164faf6eacacf9a5eaf8bab6d6b02&h=19c7db95e8a2&sub=E-1897db19a5e&payment=0.00:EUR:VA_D:Visa%20Debit:true&pageOrigin=F..RP.FE.M16', 
    'out': {'date': '22/9', 'times': '11:30–13:35', 'stopovers': ['direct', ''], 'duration': '3h 05m'}, 
    'in': {'date': '4/10', 'times': '14:20–18:20', 'stopovers': ['direct', ''], 'duration': '3h 00m'}}