import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from "shards-react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import MapContainer from './MapContainer';
import SettingsButton from "./SettingsButton";

class MainContainer extends Component {
    render() {
        return (
            <Container fluid style={{padding: 0, height: '100vh', overflow: 'hidden'}}>
                <Row noGutters>
                    <Col md="12">
                        <TopBar theme={this.props.themeColors} isDarkMode={this.props.isDarkMode} height="5vh"></TopBar>
                    </Col>
                </Row>
                <Sidebar theme={this.props.themeColors} />
                <Row noGutters theme={this.props.themeColors}>  
                    <Col>
                        <SettingsButton theme={this.props.themeColors} />
                        <MapContainer theme={this.props.themeColors} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    themeColors: state.settings.themeColors,
    isDarkMode: state.settings.isDarkMode
})

const mapDispatchToProps = {
    
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContainer)