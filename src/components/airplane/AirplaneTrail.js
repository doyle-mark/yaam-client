import React from 'react'
import PropTypes from 'prop-types'
import { Polyline } from "react-leaflet";

function AirplaneTrail(props) {
    const { data, position } = props;

    if (data) {
        // Filter data for invalid points.
        const trail = data.filter((point) => {
            const {lat, lng, alt} = point;
            return (lat != null && lng != null && alt != null);
        })

        if(trail[0].lat !== position.lat || trail[0].lng !== position.long){
            trail.shift()
        }

        return (<Polyline positions={trail} />);
    }
    
    return null;
}

AirplaneTrail.propTypes = {
    data: PropTypes.array,
    position: PropTypes.object,
}

export default AirplaneTrail

