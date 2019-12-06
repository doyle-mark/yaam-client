import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Tooltip, useLeaflet } from "react-leaflet";
import '../../assets/css/tooltip.css'

function AirplaneTooltip(props) {
  const { callsign, dep, arr, visible } = props;
  const theme = useSelector(state => state.settings.themeColors);
  const leaflet = useLeaflet();
  
  // Check if object or its properties are a null.
  const depIcao = dep == null ? "" : dep.code == null ? "" : dep.code.icao;
  const arrIcao = arr == null ? "" : arr.code == null ? "" : arr.code.icao;
  
  return (
    <Tooltip
      offset={[0, -10]}
      direction={"top"}
      style={{ border: "none" }}
      on
    >
      <div
        style={{
          padding: 5,
          backgroundColor: theme.primary,
          borderColor: theme.primary,
          color: theme.textPrimary
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {getLogoFromCallsign(callsign)}
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>{callsign}</p>
            <p style={{ margin: 0, color: "gray" }}>
              {depIcao} - {arrIcao}
            </p>
          </div>
        </div>
      </div>
    </Tooltip>
  );
}

AirplaneTooltip.propTypes = {
    callsign: PropTypes.string,
    dep: PropTypes.object,
    arr: PropTypes.object,
    visible: PropTypes.bool,
};


const getLogoFromCallsign = callsign => {
  if (isAirline(callsign)) {
    const airlineCode = callsign.substr(0, 3);
    const url = `https://planefinder.net/flightstat/v2/getLogo3x.php?airlineCode=${airlineCode}&requestThumb=1`;
    return (
      <div style={{ paddingRight: 10, width: "6em" }}>
        <img style={{ maxWidth: "100%", height: "auto" }} src={url} alt={""} />
      </div>
    );
  }
  return null;
};

const isAirline = callsign => {
  if (callsign.match(/[A-Z]{3}\d.*/g) !== null) return true;
  return false;
};

export default AirplaneTooltip;