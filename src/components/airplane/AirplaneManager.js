import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'
import Airplane from "./Airplane";

const SHOW_GROUND_ZOOM_LEVEL = 10;
const ON_GROUND_MAX_SPEED = 50;


function AirplaneManager(props) {
  const airplanes = useSelector(state => state.onlineData.pilots);
  

  return airplanes.map( (airplane, index) => {
    const { 
      coords: position,
      speed, 
      altitude, 
      heading,
      callsign,
      aircraftType,
      dep,
      arr
    } = airplane

    // if (isInBounds(position, bounds))
    
    return(
      <Airplane 
      key={index}
      position={position} 
      speed={speed}
      altitude={altitude}
      heading={heading}
      callsign={callsign}
      aircraftType={aircraftType}
      dep={dep}
      arr={arr}
      />
    )
  })
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

AirplaneManager.propTypes = {
}

export default AirplaneManager

