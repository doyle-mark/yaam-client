import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'
import { getFIRData } from "../../redux/api";

function FIRManager(props) {
  const FIRData = useFIRs([]);
  

}

const useFIRs = () => {
  const [ FIRData, setFIRData ] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFIRData();
        return data
      } catch (error) {
        console.log(error);
        return [];
      }
    }

    const rawData = getData();
    const formattedData = fixICAOData(rawData);
    setFIRData(formattedData);
  }, []);

}

const fixICAOData = (data) => {
  return data.map((sector) => {
    const { coordinates: coordsList } = sector.geometry;
    const newSectorObject = [...coordsList]

    /* For some reason, ICAO data comes like this: long, lat.
          Leaflet (and pretty much any sane person) accepts coords as 'lat, long'... */

    if (newSectorObject.length > 1) {
      if (newSectorObject[0].length === 1) {
        newSectorObject.forEach(lvl1 => {
          let lvl2 = lvl1[0];
          lvl2.forEach(lvl3 => {
            lvl3 = lvl3.reverse();
          });
        });
      }
    }

    let list = newSectorObject[0];
    list.forEach(element => {
      element = element.reverse();
    });

    return newSectorObject;
  });
}

FIRManager.propTypes = {

}

export default FIRManager

