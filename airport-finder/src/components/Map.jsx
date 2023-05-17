import { useState, useEffect, useRef } from 'react';
import useDestination from './../hooks/useDestination';
import ReactMap, { Marker, Popup, Layer, Source } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';
import WebMercatorViewport from 'viewport-mercator-project';
import { maxBy, minBy } from 'lodash';
import '../styles/Map.scss';


export default function Map() {
    const { from, destination, stopovers } = useDestination();
    const mapContainerRef = useRef(null)
    const [width, height] = [900, 600]
    const [viewport, setViewport] = useState({
        width,
        height,
        zoom: 10,
        latitude: 56.93,
        longitude: 24.1
      })
    const [showPopup, setShowPopup] = useState(false)

    const [lineSource, setLineSource] = useState({
        type: 'FeatureCollection',
        features: [
            {type: 'Feature', geometry: {type: 'LineString', coordinates : null}}
        ]
      })

    const line = {
        id: 'airport_line',
        type: 'line',
        source: 'mapbox',
        paint: {
            'line-color': '#ff0000',
            'line-width': 5
        }
    }

      useEffect(() => {
        if (from && destination) {
            let markers = [from, destination];
            if (stopovers) {
                markers = [from, ...stopovers, destination];
            }
            setLineSource({...lineSource,
                features : [
                {type: 'Feature', geometry: {type: 'LineString', coordinates : getPointCoordinates(from, destination, stopovers)}}
            ]
            })
            const bounds = getBounds(markers);
            setViewport((viewport) => {
                const newViewport = new WebMercatorViewport({
                    ...viewport,
                    width: mapContainerRef.current.offsetWidth,
                    height: mapContainerRef.current.offsetHeight
                }).fitBounds(bounds, { padding: 70 })
                return newViewport
            })
            
        }
      }, [from, destination, stopovers])

    return (
        <div ref={mapContainerRef} id='map'>
            <ReactMap
                {...viewport}
                mapboxAccessToken={import.meta.env.VITE_REACT_MAP_TOKEN}
                onMove={evt => setViewport(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                {from && <Marker longitude={from._geoloc.lng} latitude={from._geoloc.lat} anchor="bottom" >
                    <RoomIcon className='marker__from' ></RoomIcon>
                </Marker>}
                {stopovers && stopovers.map(stop => {
                    return <Marker key={stop.iata_code} longitude={stop._geoloc.lng} latitude={stop._geoloc.lat} anchor="center"></Marker>
                })}
                {destination && <Marker longitude={destination._geoloc.lng} latitude={destination._geoloc.lat} anchor="bottom" >
                    <RoomIcon className='marker__destination' ></RoomIcon>
                    <Popup longitude={destination._geoloc.lng} latitude={destination._geoloc.lat}
                        anchor="bottom"
                        onClose={() => setShowPopup(false)}>
                        {destination.city} ({destination.iata_code})
                        destination
                    </Popup>
                </Marker>}
                {(from && destination) && <Source id="my-data" type='geojson' data={lineSource}>
                    <Layer {...line}/>
                </Source>}
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
    return [southWest, northEast]
}

const getPointCoordinates = (from, destination, stopovers) => {
    const stopoverCoords = stopovers?.map(stop => [stop._geoloc.lng, stop._geoloc.lat]) || []
    console.log(stopoverCoords);
    return [[from?._geoloc.lng, from?._geoloc.lat], ...stopoverCoords, [destination?._geoloc.lng, destination?._geoloc.lat]]
}