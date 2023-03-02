import { useState, useEffect, useRef } from 'react';
import useSize from '@react-hook/size'
import ReactMap, { Marker } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import WebMercatorViewport from 'viewport-mercator-project';
import { maxBy, minBy } from 'lodash';
import '../styles/Map.scss';


export default function Map({ from, destination }) {
    const map = useRef(null);
    const mapContainerRef = useRef(null)
    const { width, height } = useSize(mapContainerRef)
    const [viewport, setViewport] = useState({
        width: 600,
        height: 400,
        latitude: 56.946285,
        longitude: 24.105078,
        zoom: 10
      })

      useEffect(() => {
        console.log(width, height)
          if (from && destination) {
              const markers = [from, destination];
              const bounds = getBounds(markers);
            setViewport((viewport) => {
                const newViewport = new WebMercatorViewport({
                    ...viewport
                }).fitBounds(bounds, { padding: 100 })
                return newViewport
            })
        }
       
      }, [from, destination])

    return (
        <div ref={mapContainerRef} id='map'>
            <ReactMap
                ref={map}
                {...viewport}
                mapboxAccessToken={import.meta.env.VITE_REACT_MAP_TOKEN}
                onMove={evt => setViewport(evt.viewport)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                {from && <Marker longitude={from._geoloc.lng} latitude={from._geoloc.lat} anchor="bottom" >
                    <RoomIcon className='marker__from' ></RoomIcon>
                </Marker>}
                {destination && <Marker longitude={destination._geoloc.lng} latitude={destination._geoloc.lat} anchor="center" >
                    <RoomIcon className='marker__destination' ></RoomIcon>
                </Marker>}
            </ReactMap>
        </div>
    )
}

const getMinOrMax = (markers, minOrMax= "min" | "max", latOrLng = "lat" | "lng") => {
    if (minOrMax === "min") {
        return minBy(markers, (marker) =>  marker._geoloc[latOrLng])["_geoloc"][latOrLng]
    } else return maxBy(markers, (marker) => marker._geoloc[latOrLng])["_geoloc"][latOrLng]
}

const getBounds = (markers) => {
    const maxLng = getMinOrMax(markers, "max", "lng");
    const maxLat = getMinOrMax(markers, "max", "lat");
    const minLng = getMinOrMax(markers, "min", "lng");
    const minLat = getMinOrMax(markers, "min", "lat");

    const southWest = [minLng, minLat];
    const northEast = [maxLng, maxLat];
    // console.log(southWest, northEast)
    return [southWest, northEast]
}