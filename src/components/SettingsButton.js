import React, { Component } from 'react'
import { Button, Card, Form, FormGroup } from "shards-react";
import { FaCog } from "react-icons/fa";
import { connect } from 'react-redux'
import Switch from "react-switch";
import "../assets/css/Settings.css"
import { toggleFIRs, toggleColorMode, toggleAirportMarkerATCBadges, toggleAirportMarkers, toggleAirportMarkerApproachCircle } from "../redux/settingsActions";

class SettingsButton extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             containerOpen: false,
        }
    }

    render() {
        const containerClasses = ['settingsContainer'];
        const buttonClasses = ['settingsButton'];
        const cardClasses = ['settingsCard'];

        if (this.state.containerOpen) {
          containerClasses.push("settingsContainerOpen");
          buttonClasses.push("settingsButtonOpen");
          cardClasses.push('settingsCardOpen')
        }

        const { theme, airportMarkerVisibility, isDarkMode } = this.props

        return (
          <div className={containerClasses.join(" ")}>
            <Button style={{backgroundColor: theme.accent, borderColor: theme.accent}} className={buttonClasses.join(" ")} onClick={() => this.setState({ containerOpen: !this.state.containerOpen })}>
              <FaCog fontSize={22} />
              <div>
                <p>Settings</p>
              </div>
            </Button>
            <Card style={{backgroundColor: theme.primary, color: theme.textPrimary}} className={cardClasses.join(' ')}>
                <Form>
                    <FormSwitch title="Night Mode" onChange={() => this.props.toggleColorMode()} checked={isDarkMode} isDarkMode={isDarkMode}/>
                    <FormSwitch title="Show FIRs" onChange={(sw) => this.props.toggleFIRs(sw)} checked={this.props.showFIRs} isDarkMode={isDarkMode} />
                    <FormSwitch title="Show Airport Markers" onChange={() => this.props.toggleAirportMarkers()} checked={airportMarkerVisibility.enabled} isDarkMode={isDarkMode}/>
                    {
                      airportMarkerVisibility.enabled && (
                        <div style={{fontSize: '0.8em', marginLeft: '20%'}}>

                        <FormSwitch title="Show Controller Badges" onChange={(sw) => this.props.toggleAirportMarkerATCBadges()} 
                        checked={airportMarkerVisibility.showControllerBadges} isDarkMode={isDarkMode} subSection
                        />

                        <FormSwitch title="Show Approach Circle" onChange={(sw) => this.props.toggleAirportMarkerApproachCircle()} 
                        checked={airportMarkerVisibility.showApproachCircle} isDarkMode={isDarkMode} subSection
                        />

                        </div>
                        )
                    }
                </Form>
            </Card>
          </div>
        );
    }

    handleSwitch1 = (checked) => {
        this.setState({ settings: { ...this.state.settings, switch1: checked }});
    }
}

const FormSwitch = ({title, onChange, checked, subSection, isDarkMode}) => {

  let style = switchStyle;
  if (subSection) {
    style = subSwitchStyle
  }
  if (isDarkMode) {
    style = {...style, ...darkSwitchStyle}
  }

  return (
    <FormGroup style={{display: "flex", justifyContent: "space-between"}}>
      <label htmlFor={title.split(' ').join('-')}>{title}</label>
      <div id={title.split(' ').join('-')}>
          <Switch onChange={onChange} checked={checked} {...style}/>
      </div>
    </FormGroup>
  )
}

const switchStyle = {
    onColor: "#86d3ff",
    onHandleColor: "#2693e6",
    handleDiameter: 20,
    uncheckedIcon: false,
    checkedIcon: false,
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
    activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
    height: 20,
    width: 40,
}

const darkSwitchStyle = {
  onColor: '#666666',
  offColor: '#333333',
  onHandleColor: '#000',
  offHandleColor: '#000',
}

const subSwitchStyle = {
  ...switchStyle,
  handleDiameter: 15,
  height: 15,
  width: 30,
}

const mapStateToProps = (state) => ({
  showFIRs: state.settings.toggleFIRs,
  isDarkMode: state.settings.isDarkMode,
  airportMarkerVisibility: state.settings.airportMarkerVisibility,
})

const mapDispatchToProps = {
  toggleFIRs,
  toggleColorMode,
  toggleAirportMarkerATCBadges,
  toggleAirportMarkerApproachCircle,
  toggleAirportMarkers,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsButton)