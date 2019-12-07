import React, { Component } from 'react'
import { useSelector } from 'react-redux'
import Details from "./sidebar_components/FlightDetails";
import History from "./sidebar_components/FlightHistory";
import '../assets/css/Sidebar.css'
import PropTypes from 'prop-types'

function Sidebar(props) {
    const focused = useSelector(state => state.focused);
    const theme = useSelector(state => state.settings.themeColors);

    if (focused) {
        return(
            <div className={"sidebar"} style={{backgroundColor: theme.secondary}}>
                <Details theme={theme} data={focused} />
                <History theme={theme} data={focused.trail} />
            </div>
        )
    } else {
        return null;
    }
}

Sidebar.propTypes = {

}

export default Sidebar

