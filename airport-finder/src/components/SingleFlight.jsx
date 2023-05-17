import '../styles/SingleFlight.scss';

export default function SingleFlight({ flightInfo }) {

    const { date, times, stopovers, duration } = flightInfo;

    return (
        <div className="single-flight">
            <div className="single-flight__time">
                <b>{times.split('+')[0]}</b>
                <div className='single-flight__date'>{`${date.split('/')[0].padStart(2, '0')}/${date.split('/')[1].padStart(2, '0')}`}</div>
            </div>
            <div className="single-flight__stopovers">
                <p className='single-flight__stopover-count'>{stopovers[0]}</p>
                {/* <div>{stopovers.slice(1).map((stop, i) => <span key={i}>{stop}</span>)}</div> */}
                <p className='single-flight__stopover'>{stopovers.slice(1)}</p>
            </div>
            <div className='single-flight__duration'>
                {duration}
            </div>
        </div>
    )
}