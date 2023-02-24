import '../styles/Airport.scss';


export default function Airport(props) {
    const { name, city,  country, iata_code, _geoloc, objectID } = props.info
    return (
        <div className="airport" onClick={() => props.selectAirport(props.info)}>
            <div className='airport__iata_code'>{iata_code}</div>
            <div className='airport__info'>
                <p>{name}</p>
                <p>{city}, {country}</p>
            </div>
        </div>
    )
}