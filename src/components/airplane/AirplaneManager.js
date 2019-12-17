import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types'
import { fetchAllData } from "../../redux/thunks";
import Airplane from "./Airplane";

const SHOW_GROUND_ZOOM_LEVEL = 10;
const ON_GROUND_MAX_SPEED = 50;


function AirplaneManager(props) {
  const { bounds, zoom } = props;
  useAirplaneData();
  const airplanes = useSelector(state => state.onlineData.pilots);
  const focused = useSelector(state => state.focused)

  let focusedCallsign = null;
  if (focused) focusedCallsign = focused.callsign;

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

    if (isInBounds(position, bounds) || (focusedCallsign === callsign)) {
      return(
        <Airplane 
        zoom={zoom}
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
    }
    return null;
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

const useAirplaneData = () => {
  const [fetchInterval, setFetchInterval] = useState();
  const dispatch = useDispatch();
  const UPDATE_INTERVAL = 30;

  useEffect(() => {

    const updateData = () => {
      dispatch(fetchAllData());
    }

    updateData()
    const i = setInterval(updateData, UPDATE_INTERVAL * 1000)
    setFetchInterval(i)

    return () => {
      setInterval(null)
    }
  }, [dispatch])
}

AirplaneManager.propTypes = {
  bounds: PropTypes.object,
  zoom: PropTypes.number
}

export default AirplaneManager

