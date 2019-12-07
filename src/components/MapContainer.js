import React, {useState, useCallback, useEffect, useRef} from 'react'
import { useSelector } from "react-redux";
import L from "leaflet";
import { Map, TileLayer, useLeaflet } from "react-leaflet";
import AirplaneManager from "./airplane/AirplaneManager";
import FIRManager from './map_components/FIRManager';

function MapContainer(props) {
  const initalMapState = {
    bounds: MAP_CONFIG.DEFAULT_BOUNDS,
    center: MAP_CONFIG.DEFAULT_CENTER,
    zoom: MAP_CONFIG.DEFAULT_ZOOM_LEVEL,
  }
  const [mapState, setMapState] = useState(initalMapState);
  const focused = useSelector(state => state.focused);
  
  const moveHandler = event => {
    const mapElement = event.target;
    setMapState({
      zoom: mapElement.getZoom(),
      center: mapElement.getCenter(),
      bounds: mapElement.getBounds(),
    });
  }
  
  const mapRef = useCallback(node => {
    if (node !== null) {
      const l = node.leafletElement;
      if(focused) {
        if (focused.goTo) {
          l.setView([focused.coords.lat, focused.coords.long], 7);
        }
      }
    }
  }, [focused]);

  console.log("Re-Render");
  

  const { zoom } = mapState;
  const isDarkMode = useSelector(state => state.settings.isDarkMode);
  return (
    <Map
        ref={mapRef}
        id="mapid"
        style={{ height: "100%" }}
        center={MAP_CONFIG.DEFAULT_CENTER}
        zoom={MAP_CONFIG.DEFAULT_ZOOM_LEVEL}
        minZoom={MAP_CONFIG.DEFAULT_ZOOM_LEVEL}
        maxBounds={MAP_CONFIG.DEFAULT_BOUNDS}
        maxBoundsViscosity={MAP_CONFIG.VISCOSITY}
        doubleClickZoom={MAP_CONFIG.DOUBLE_CLICK_ZOOM}
        zoomControl={MAP_CONFIG.ZOOM_CONTROLS}
        preferCanvas={MAP_CONFIG.PREFER_CANVAS}
        onmoveend={moveHandler}
    >

      <TileLayer
        attribution={MAP_CONFIG.ATTR} 
        url={isDarkMode ? MAP_CONFIG.DARK_TILES : MAP_CONFIG.LIGHT_TILES}
      />

      <AirplaneManager bounds={mapState.bounds} zoom={zoom}/>

      <FIRManager />

    </Map>
  )
}

export default MapContainer

const MAP_CONFIG = {
  DEFAULT_BOUNDS: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180)),
  UPDATE_TIME: 30,
  LIGHT_TILES: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  DARK_TILES: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  ATTR: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  DEFAULT_CENTER: [30, 0],
  DEFAULT_ZOOM_LEVEL: 3,
  VISCOSITY: 0.9,
  PREFER_CANVAS: true,
  ZOOM_CONTROLS: false,
  DOUBLE_CLICK_ZOOM : false,
}