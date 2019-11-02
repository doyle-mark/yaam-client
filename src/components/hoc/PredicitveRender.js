import React from 'react'
import { computeDestinationPoint } from "geolib";
import AircraftMarkerManager from '../map_components/AircraftMarkerManager';

export default class PredicitveRenderer extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         pilots: props.pilots,
         prevProps: props.pilots
      }
    }

    UPDATE_FREQ = 1;
    METERS_IN_NAUTICAL_MILE = 1852;

    predictNextPosition = (pilot) => {
      const { coords, heading, speed} = pilot;
      const pos = {latitude: coords.lat, longitude: coords.long }

      if (!pos.latitude || !pos.longitude) return coords;

      // 1kt is 1nm per hour.
      //             convert nm/h to nm/s,     convet to m/s,        multiply by frequency rate
      const distance = (speed / 3600) * this.METERS_IN_NAUTICAL_MILE * this.UPDATE_FREQ;
      const res = computeDestinationPoint(pos, distance, heading);
      return {lat: res.latitude, long: res.longitude};
      

    }

    updatePilotPositions = (pilots) => {
      const updatedPilotsList = [];
      pilots.forEach(pilot => {
        const newPos = this.predictNextPosition(pilot);
        
        const updatedPilot = { ...pilot, coords: newPos };
        updatedPilotsList.push(updatedPilot);
      });
      
      return updatedPilotsList;
    }

    componentDidMount() {
      const renderInterval = setInterval(() => {
        const { pilots } = this.state;
        this.setState({pilots: this.updatePilotPositions(pilots)});
      },
      this.UPDATE_FREQ * 1000
      )

      this.setState({renderInterval})
    }

    componentWillUnmount() {
      this.setState({ renderInterval: null })
    }

    componentDidUpdate() {
      console.log("update");
      if (this.props !== this.state.prevProps) {
        this.setState({prevProps: this.props, pilots: this.props.pilots})
        return
      }
    }

    render() {
      
      return(<AircraftMarkerManager {...this.props} pilots={this.state.pilots} />);
    }
  }

