import React, { Component } from "react";
import L from "leaflet";
import { Map, TileLayer } from "react-leaflet";
import { connect } from "react-redux";
import "../assets/css/tooltip.css";
import { fetchAllData } from "../redux/thunks";
import FIRPolygons from "./map_components/FIRPolys";
import AirplaneManager from "./airplane/AirplaneManager";
import AirportMarkerManager from "./map_components/AirportMarkerManager";

// Inital Constants

const DEFAULT_BOUNDS = L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
const UPDATE_TIME = 30;

const LIGHT_TILES = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
const ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const DEFAULT_CENTER = [30, 0];
const DEFAULT_ZOOM_LEVEL = 3;

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FIRs: null,
      bounds: L.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180)),
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM_LEVEL,
    };
  }

  render() {
    const { bounds, zoom, center } = this.state;
    const { onlineData, settings} = this.props;
    const { atc } = onlineData;

    const tiles = settings.isDarkMode ? DARK_TILES : LIGHT_TILES;
    return (
      <Map
        ref="map"
        center={center}
        maxBounds={DEFAULT_BOUNDS}
        maxBoundsViscosity={0.9}
        zoom={zoom}
        minZoom={DEFAULT_ZOOM_LEVEL}
        id="mapid"
        doubleClickZoom={false}
        style={{ height: "100%" }}
        zoomControl={false}
        preferCanvas={false}
      >
        <TileLayer attribution={ATTR} url={tiles} />
        <FIRPolygons atc={atc} show={settings.toggleFIRs}/>
        <AirportMarkerManager bounds={bounds} zoom={zoom} />
        <AirplaneManager />
      </Map>
    );
  }

  componentDidMount = () => {
    const { fetchAllData } = this.props;
    const { addBoundsChangeListener } = this;

    fetchAllData();
    addBoundsChangeListener();
    setInterval(this.updateData, UPDATE_TIME * 1000);
  };

  // The map will rerender only if the viewport is changed or new data is loaded.
  shouldComponentUpdate = (nextProps, nextState) => {

    if(nextProps.onlineData !== this.props.onlineData) return true;
    if(nextProps.focused !== this.props.focused) return true;
    if(nextState.bounds !== this.state.bounds) return true;
    if(nextState.center !== this.state.center) return true;
    if(this.props.settings !== nextProps.settings) return true;

    return false
  };

  // For checking if the map should goTo the focused aircrat.
  componentDidUpdate(prevProps, prevState) {

    // If the searchbar calls a focus, It'll set the goToFocused prop to true.
    if(this.props.focused && !prevProps.focused){
      if(this.props.goToFocused) {
        this.goTo(this.props.focusedData)
      }
    }
  }

  /**** Non-Lifecycle related Functions ****/

  // Adds leaflet listener that updates the bounds in our state.
  addBoundsChangeListener = () => {
    this.refs.map.leafletElement.on("moveend", e => {
      console.log("bounds update");
      
      const map = e.target;
      const zoom = map.getZoom();
      const center = map.getCenter();
      const bounds = map.getBounds();
      this.setState({ bounds, zoom, center });
    });
  };

  // Dispatches all redux data-fetching actions.
  updateData = () => {
    const {
      fetchAllData,
      fetchAircraftExtendedData,
      pending,
      focusedData
    } = this.props;

    fetchAllData();
    if (!pending && focusedData != null) {
      fetchAircraftExtendedData(focusedData.callsign);
    }
  };

  // Changes the map viewport to focus on the focused aircraft
  goTo = (station) => {
    const { coords } = station;
      this.setState({center: [coords.lat, coords.long ], zoom: 6})
  };

  // Gets the position of a focused aircraft on the map.
  getLocalPostion = (callsign) => {
    if (!this.props.onlineData || !this.props.focused) return null;

    for (const aircraft of this.props.onlineData.pilots) {
      if (aircraft.callsign === callsign){
        return aircraft.coords
      };
    }
  }
}

/** Redux Related Functions  **/
  
const mapStateToProps = state => ({
  onlineData: state.onlineData,
  settings: state.settings,
});

const mapDispatchToProps = {
  fetchAllData: fetchAllData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapContainer);

