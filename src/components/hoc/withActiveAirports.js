import React from 'react'
import { connect } from 'react-redux'
import memoize from "memoize-one";


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
            // If the airport does not exists in our javascript object, we initalize it.
            if (!activeAirports[icao]){
              activeAirports[icao] = {}
            }      
            // Insert the index to the appropriate array OR initalize it if it doesn't exist.
            activeAirports[icao].controllers ? activeAirports[icao].controllers.push(index) : activeAirports[icao].controllers = [index];
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
  
      console.log('Pilots ', pilotData.length);
      console.log('Controllers ', atcData.length);
      
      console.timeEnd('createActiveAirportArray');
      return activeAirports;
    });
  
    render() {
      const { pilotData, atcData } = this.props;
      const { airportData } = this.state;
      const activeAirports = this.createActiveAirportArray(pilotData, atcData, airportData);
      
      return (<WrappedComponent {...WrappedComponent.props} data={activeAirports}/>)
    }
  }
}

const mapStateToProps = state => ({
  pilotData: state.allAircraft.pilots,
  atcData: state.allAircraft.atc,
})

export default WrapperComponent => connect(mapStateToProps)(withActiveAirports(WrapperComponent))
