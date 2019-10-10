import React from 'react'
import withActiveAirports from '../hoc/withActiveAirports'
import "../../assets/css/airportMarker.css";
import AirportMarker from './AirportMarker';
import { connect } from 'react-redux'

function AirportMarkerManager(props) {
  const { data, bounds, zoom, themeColors } = props;
  const airports = Object.values(data);
  
  return airports.map((airport, key) => {
    if (airport.lat && airport.long) {
      if (isInBounds({lat: airport.lat, long: airport.long}, bounds)) {
        if(!airport.controllers) return null;
        return (<AirportMarker zoom={zoom} themeColors={themeColors} lat={airport.lat} key={key} {...airport}/>)
      }
    }
    return null;
  });
}

const isInBounds = (coords, bounds) => {
  if (
    coords.lat === null ||
    coords.long === null) return false;
  
  return (
    coords.lat > bounds.getSouth() &&
    coords.lat < bounds.getNorth() &&
    coords.long > bounds.getWest() &&
    coords.long < bounds.getEast()
  );
};

const mapStateToProps = (state) => ({
  themeColors: state.settings.themeColors
})


export default connect(mapStateToProps)(withActiveAirports(AirportMarkerManager));


