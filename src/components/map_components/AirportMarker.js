import React, { Component } from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
import { Marker, Circle } from "react-leaflet";
import { divIcon } from "leaflet";
import { CONTROLLER_TYPE, ControllerBadges } from "./ControllerBadge";

// nm to
const APPROACH_CIRCLE_RADIUS = 1852 * 40;

export default class AirportMarker extends Component {
  constructor(props) {
    super(props)
    this.ref =  React.createRef();
  }

  render() {
    const { lat, long, name, code, zoom, controllers, themeColors, settings } = this.props;
    
    let size = zoom*2;
    if (size > 16) size = 16;

    let divIconInnerHTML = `<div>
    <svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" fill=${themeColors.airportMarker.outside} r="${size/2}" />
      <circle cx="${size/2}" cy="${size/2}" fill=${themeColors.airportMarker.inside} r="${size/4}" />
    </svg></div>`;
    if (settings.showControllerBadges) {
      divIconInnerHTML +=  `${renderToString(<ControllerBadges code={code} themeColors={themeColors} zoom={zoom} controllers={controllers}/>)}`;
    }


    // MAGIC! I was dealing with a lot of changing font sizes and the badges being the way I built them, 
    // I came with this formula for specifying the icon size. What you are seeing is mostily coverting the "em" value to a pixel size.
    const maxFontSizeMultiplier = 1.5;
    const minFontSizeMultiplier = 1;
    const defaultFontSize = 12
    const fontSizeMultiplier = zoom / 5 > maxFontSizeMultiplier ? maxFontSizeMultiplier : zoom / 5 < minFontSizeMultiplier ? minFontSizeMultiplier : zoom / 5;
    const fontSize = defaultFontSize * fontSizeMultiplier;

    const xOffset = 1.25 * fontSize + ((1.5 * fontSize) * controllers.length - 1);
    const yOffset = size/2;

    const icon = divIcon({
      html: divIconInnerHTML,
      className: "airport-marker",
      iconAnchor: [size/2, size/2]
    });

    const ApproachCircle = ({show, position, color}) => {
      if (show) {
        return (
          <Circle center={[position[0], position[1]]} color={color}radius={APPROACH_CIRCLE_RADIUS} />
        )
      }
      return null;
    }

    const showApproachCircle = controllers.indexOf(CONTROLLER_TYPE.APPROACH) !== -1 && settings.showApproachCircle;

    return (
      <>
        <Marker
          position={[lat, long]}
          icon={icon}
        />
        <ApproachCircle position={[lat, long]} color={themeColors.approachCircle} show={showApproachCircle} />
      </>
    );
  }
}
const controllers = [CONTROLLER_TYPE.APPROACH, CONTROLLER_TYPE.GROUND, CONTROLLER_TYPE.TOWER];