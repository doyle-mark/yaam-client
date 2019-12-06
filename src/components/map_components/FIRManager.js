import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { getFIRData } from "../../redux/api";
import FIRPoly from "./FIRPoly";

function FIRManager(props) {
  const FIRData = useFIRs([]);
  const ATCData = useSelector(state => state.onlineData.atc);
  const polygons = matchControllersToFIRs(FIRData, ATCData);

  return (
    polygons
  )
}

const matchControllersToFIRs = (FIRData, ATCData) => {
  const polys = [];
  if (FIRData != null) {
    FIRData.forEach((sector, index) => {
      let { coordinates: coordsList } = sector.geometry;
      const { FIRname: name, ICAOCODE: code } = sector.properties;          

      if (ignored.includes(code)) {
        return;
      }

      if (coordsList.length > 1) {
        if (coordsList[0].length === 1) {

          // Special cases
          if (code === 'LPPC'){
            coordsList = coordsList[1]
          } else {
            coordsList = coordsList[0]
          }
        }
      }

      let fill = false;
      let weight = 0.5;
      const netName = nameOnNetwork(code);

      ATCData.forEach(station => {
        const subLen = netName.length;

        if (station.callsign.substr(0, subLen) === netName) {
          
          fill = true;
          weight = 2;
        }
      });


      polys.push(
        <FIRPoly
          key={index}
          onClick={() => console.log(`${code}: ${name}`)}
          weight={weight}
          dashArray="5"
          positions={coordsList}
          name={name}
          fill={fill}
          code={code}
          fillOpacity={0.25}
          color="gray"
        />
      );
    });
    return polys;
  }
}

const useFIRs = () => {
  const [ FIRData, setFIRData ] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const rawData = await getFIRData();
        const formattedData = fixICAOData(rawData);
        setFIRData(formattedData);

      } catch (error) {
        console.log(error);
        return [];
      }
    }

    getData()

  }, []);
  return FIRData;
}

const fixICAOData = (data) => {
  return data.map((sector) => {
    const newSectorObject = { ...sector };
    const { coordinates: coordsList } = newSectorObject.geometry;

    /* For some reason, ICAO data comes like this: long, lat.
          Leaflet (and pretty much any sane person) accepts coords as 'lat, long'... */

    if (coordsList.length > 1) {
      if (coordsList[0].length === 1) {
        coordsList.forEach(lvl1 => {
          let lvl2 = lvl1[0];
          lvl2.forEach(lvl3 => {
            lvl3 = lvl3.reverse();
          });
        });
      }
    }

    let list = coordsList[0];
    list.forEach(element => {
      element = element.reverse();
    });

    return newSectorObject;
  });
}

FIRManager.propTypes = {

}

export default FIRManager

const ignored = ["ULMM", "CZQX"];

  // For specific cases, an FIR might have a different name on the network than it does in the ICAO DB.
const nameOnNetwork = FIR => {
    const list = [
      { netName: "LON", FIR: "EGTT" },
      { netName: "OAK", FIR: "KZOA" },
      { netName: "TOR", FIR: "CZYZ" },
      { netName: "JAX", FIR: "KZJX" },
      { netName: "HOU", FIR: "KZHU" },
      { netName: "NY", FIR: "KZNY" },
      { netName: "CLE", FIR: "KZOB" },
    ];
    for (const e of list) {
      if (e.FIR === FIR) return e.netName;
    }
    return FIR;
};

