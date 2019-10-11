import React from 'react'
import { connect } from 'react-redux'
import memoize from "memoize-one";
import { CONTROLLER_TYPE } from "../map_components/ControllerBadge";


const withActiveAirports = (WrappedComponent) => {
  return class withActiveAirports extends React.Component {
    constructor(props) {
      super(props)
    
      this.state = {
         airportData: [],
      }
    }

    async componentDidMount() {
      const res = await fetch('http://localhost:5000/airports');
      const airportData = await res.json();
      this.setState({airportData})
    }
    
    createActiveAirportArray = memoize((pilotData, atcData, airportData) => {
      console.time('createActiveAirportArray');
      const activeAirports = {};

      if (!pilotData || !atcData) return null;
  
      pilotData.forEach((pilot, index) => {
        if (pilot) {
          // Check if pilot does have a departure airport
          if(pilot.dep && pilot.dep.code.icao) {
            const depIcao = pilot.dep.code.icao;
            
            // If the airport does not exists in our javascript object, we initalize it.
            if (!activeAirports[depIcao]){
              activeAirports[depIcao] = {}
            }
  
            // Insert the index to the appropriate array OR initalize it if it doesn't exist.
            activeAirports[depIcao].dep ? activeAirports[depIcao].dep.push(index) : activeAirports[depIcao].dep = [index];
          }
  
          // Now we do the same thing, but for the arrival airport.
          if(pilot.arr && pilot.arr.code.icao) {
            const arrIcao = pilot.arr.code.icao;
  
            if (!activeAirports[arrIcao]){
              activeAirports[arrIcao] = {}
            }
  
            activeAirports[arrIcao].arr ? activeAirports[arrIcao].arr.push(index) : activeAirports[arrIcao].arr = [index];
          }
        }
      });
  
      atcData.forEach((controller, index) => {
        if (controller) {
          const icao = controller.callsign.substr(0, 4);
          // We are expecting the first 4 letters to be an ICAO code.          
          if (icao.match(/[A-Z]{4}/g)) {
            const type = this.toControllerType(controller.callsign)
            if (type === CONTROLLER_TYPE.ATIS || type === -1) return;
            // If the airport does not exists in our javascript object, we initalize it.
            if (!activeAirports[icao]){
              activeAirports[icao] = {}
            }      
            // Insert the index to the appropriate array OR initalize it if it doesn't exist.
            activeAirports[icao].controllers ? activeAirports[icao].controllers.push(type) : activeAirports[icao].controllers = [type];
          }
        }
      });

      airportData.forEach(airport => {
        const icao = airport.code.icao
        if (airport) {
          if (activeAirports[icao]) {
            Object.assign(activeAirports[icao], airport)
            delete activeAirports[icao]._id;
          }
        }
      });
      console.timeEnd('createActiveAirportArray');
      return activeAirports;
    });
    
    toControllerType = (callsign) => {
      const exp  = /_([A-Z]{3})/g;
      const match = exp.exec(callsign);
      if(match) {
        const prefix = match[1];
        switch (prefix) {
          case 'DEL':
            return CONTROLLER_TYPE.DELIVERY;
          case 'GND':
            return CONTROLLER_TYPE.GROUND;
          case 'TWR':
            return CONTROLLER_TYPE.TOWER;
          case 'APP':
            return CONTROLLER_TYPE.APPROACH;
          case 'ATI':
            return CONTROLLER_TYPE.ATIS;
          default:
            return -1;
        }
      } else {
        return null;
      }
      
    }

    render() {
      const { pilotData, atcData } = this.props;
      const { airportData } = this.state;
      const activeAirports = this.createActiveAirportArray(pilotData, atcData, airportData);
      
      return (<WrappedComponent {...this.props} data={activeAirports}/>)
    }
  }
}

const mapStateToProps = state => ({
  pilotData: state.allAircraft.pilots,
  atcData: state.allAircraft.atc,
})

export default WrapperComponent => connect(mapStateToProps)(withActiveAirports(WrapperComponent))
