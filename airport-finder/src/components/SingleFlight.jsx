import '../styles/SingleFlight.scss';

export default function SingleFlight({ flightInfo }) {

    const { date, times, stopovers, duration } = flightInfo;

    return (
        <div className="single-flight">
            <div className="single-flight__time">
                <div>{times.split('+')[0]}</div>
                <div>{date}</div>
            </div>
            <div className="single-flight__stopovers">
                <p>{stopovers[0]}</p>
                <div>{stopovers.slice(1).map((stop, i) => <span key={i}>{stop}</span>)}</div>
                <span>{stopovers.slice(1)}</span>
            </div>
            <div className='single-flight__duration'>
                {duration}
            </div>
        </div>
    )
}