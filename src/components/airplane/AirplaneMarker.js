import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import RotatedMarker from "../map_components/custom/RotatedMarker";
import L from "leaflet";

const INITAL_ROTATION_ANGLE = 0;

function AirplaneMarker(props) {
  const { position, heading, callsign } = props;
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.settings.isDarkMode);

  const rotationAngle = parseInt(heading - INITAL_ROTATION_ANGLE);
  const iconUrl = isDarkMode ? "airplane_dark.png" :  "airplane_light.png";
  // const iconSize = zoom+19;
  const iconSize = 20;

  const handleClick = useCallback(
    () => {
      dispatch({ type: "bla", callsign: callsign });
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
