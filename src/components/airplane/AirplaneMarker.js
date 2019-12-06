import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import L from "leaflet";
import RotatedMarker from "../map_components/custom/RotatedMarker";
import { focusOnAirplane } from "../../redux/thunks";

const INITAL_ROTATION_ANGLE = 0;

function AirplaneMarker(props) {
  const { position, heading, callsign } = props;
  const isDarkMode = useSelector(state => state.settings.isDarkMode);
  const dispatch = useDispatch();
  const rotationAngle = parseInt(heading - INITAL_ROTATION_ANGLE);
  const iconUrl = isDarkMode ? "airplane_dark.png" :  "airplane_light.png";
  // const iconSize = zoom+19;
  const iconSize = 20;

  const handleClick = useCallback(
    () => {
      dispatch(focusOnAirplane(callsign))
    },
    [dispatch, callsign],
  )

  return (
    <RotatedMarker
      position={[position.lat, position.long]}
      rotationAngle={rotationAngle}
      icon={L.icon({
        iconUrl,
        iconAnchor: [iconSize / 2, iconSize / 2],
        iconSize: [iconSize, iconSize]
      })}
      handleClick={handleClick}
    />
  );

}

AirplaneMarker.propTypes = {
  position: PropTypes.object,
  heading: PropTypes.number,
  callsign: PropTypes.string,
};

export default AirplaneMarker;
