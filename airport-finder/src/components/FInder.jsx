import React, { useState } from 'react';
import useDestination from '../hooks/useDestination';
import Flights from './Flights';
import AirportInput from './AirportInput';
import Button from './utils/Button';
import SearchIcon from '@mui/icons-material/Search';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import DateSelector from './utils/Date';

import '../styles/Finder.scss';

export default function Finder({}) {
    
    const { from, setFrom, destination, setDestination } = useDestination();

    const [flights, setFlights] = useState([...exampleFlight]);
    const [startDate, setStartDate] = useState(null);
    const [backDate, setBackDate] = useState(null);

    async function getFlights() {
        const url = `http://127.0.0.1:8000/backend/flight?from=${from?.iata_code}&destination=${destination?.iata_code}&start=${convertDate(startDate)}&back=${convertDate(backDate)}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.flights)
        setFlights([...exampleFlight, ...data.flights]);
    }

    return (
        <div className='search-div'>
            <div className="searchbox">
                {/* <p>{from && `${from?.city} (${from?.iata_code})`} - {destination && `${destination.city} (${destination.iata_code})`}</p> */}
                <AirportInput 
                    placeholder={'From'}
                    setAirport={setFrom}
                    selectedAirport={from}
                />
                {/* <button className='swap-button' onClick={() => swapDirections()}>
                    <SyncAltIcon />
                </button> */}
                <AirportInput 
                    placeholder={'To'} 
                    setAirport={setDestination} 
                    selectedAirport={destination}
                />
                <Button onClick={getFlights} type={"round"}>
                    <SearchIcon></SearchIcon>
                </Button>
            </div>
        <div className='date-selectors'>
                <DateSelector onDateSelect={setStartDate} />
                <DateSelector onDateSelect={setBackDate} />
            </div>
            <Flights flights={flights} />
        </div>
    )
}

function convertDate(inp) {
    const date = inp;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const exampleFlight = [{'id': '788164faf6eacacf9a5eaf8bab6d6b02', 
    'from' : 'RIX',
    'destination' : 'FCO',
    'price': '€322', 
    'link': 'https://www.kayak.ie/book/flight?code=PdECIldOSL.FC9t5hE4q2rBDARZyLA7ng.33906.788164faf6eacacf9a5eaf8bab6d6b02&h=19c7db95e8a2&sub=E-1897db19a5e&payment=0.00:EUR:VA_D:Visa%20Debit:true&pageOrigin=F..RP.FE.M16', 
    'out': {'date': '22/9', 'times': '11:30–13:35', 'stopovers': ['direct', ''], 'duration': '3h 05m'}, 
    'in': {'date': '4/10', 'times': '14:20–18:20', 'stopovers': ['direct', ''], 'duration': '3h 00m'}},
    {'id': '00243f92994f2b7789a59817e6d0e485', 'from': 'RIX', 'destination': 'MTY', 'price': '€2,346', 'link': 'https://www.kayak.ie/book/flight?code=bSDCJcyFfF.SraQfAsTxU_BDARZyLA7ng.249075.00243f92994f2b7789a59817e6d0e485&h=c02ccfd00965&sub=E-1ab456a7192&payment=0.00:EUR:VA_D:Visa%20Debit:true&pageOrigin=F..RP.FE.M5', 'out': {'date': '4/3', 'times': '09:25–22:30', 'stopovers': ['2 stops', 'HEL, DFW'], 'duration': '21h 05m'}, 'in': {'date': '5/3', 'times': '10:58–17:35+1', 'stopovers': ['2 stops', 
    'DFW, HEL'], 'duration': '22h 37m'}}
]

    