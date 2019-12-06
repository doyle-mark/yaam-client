import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

import AirplaneMarker from "./AirplaneMarker";
import AirplaneTrail from "./AirplaneTrail";
import AirplaneTooltip from "./AirplaneTooltip";

function Airplane(props) {
  const {
    position,
    speed,
    altitude,
    heading,
    callsign,
    aircraftType,
    dep,
    arr,
  } = props;

  const focused = useSelector(state => {
    if (state.focused) {
      if (state.focused.callsign === props.callsign) {
        return state.focused;
      }
    }
    return null;
  });

  const airplaneTrailData = focused ? focused.trail : null;
  
  return(
    <>
      <AirplaneMarker position={position} heading={heading} callsign={callsign}/>

      <AirplaneTooltip 
        callsign={callsign} 
        speed={speed} 
        altitude={altitude} 
        aircraftType={aircraftType}
        dep={dep}
        arr={arr}
      />

      <AirplaneTrail data={airplaneTrailData} position={position} />
    </>
  )
}


Airplane.propTypes = {
  position: PropTypes.object,
  speed: PropTypes.number, 
  altitude: PropTypes.number, 
  heading: PropTypes.number,
  callsign: PropTypes.string,
  aircraftType: PropTypes.string,
  dep: PropTypes.object,
  arr: PropTypes.object,
}

export default Airplane

