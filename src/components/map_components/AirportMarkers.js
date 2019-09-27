import React from 'react'
import withActiveAirports from '../hoc/withActiveAirports'
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import "../../assets/css/airportMarker.css";

function AirportMarkers(props) {
  const { data } = props;
  const airports = Object.values(data)
  return airports.map((airport, key) => {
    if (airport.lat && airport.long) {
      const divIconInnerHTML = 
      `<p>${airport.code.icao}</p>
      <svg width="20" height="20">
        <circle cx="15" cy="10" fill="darkblue" r="5" />
      </svg>
      `
      const icon = divIcon({html: divIconInnerHTML, className: 'airport-marker'})
      return (<Marker key={key} position={[airport.lat, airport.long]} title={airport.name} icon={icon}/>)
    }
    return null;
  });
}

export default withActiveAirports(AirportMarkers);