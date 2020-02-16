import React, { Component } from 'react'
import { Navbar, NavbarBrand } from "shards-react";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

export default class TopBar extends Component {
    render() {
        const { theme } = this.props;
        return (
            <Navbar expand="md" style={{...navbarStyle, backgroundColor: theme.primary}}>
                    <NavbarBrand style={{padding: 0, color: theme.textPrimary}}>Yet Another Airplane Map</NavbarBrand>
                    <Search isDarkMode={this.props.isDarkMode} style={{color: theme.textPrimary, backgroundColor: theme.primary}}/>
                    <div></div>
            </Navbar>
        )
    }
}

const navbarStyle = {
    display: 'flex',
    minHeight: '6vh',
    justifyContent: 'space-between',
    boxShadow: '10px 0px 10px 0px rgba(0,0,0,0.1)',
    zIndex: 12000,
}