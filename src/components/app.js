import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import { init } from '../actions/bodies'
import Hamburger from './hamburger'
import ControlPanel from './control-panel'
import Planetarium from './planetarium'

import {
  CONTROL_PANEL_WIDTH,
  CONTROL_PANEL_WIDTH_UNITS,
  CONTROL_PANEL_PADDING,
  CONTROL_PANEL_PADDING_UNITS,
} from '../constants'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      styles: {
        hamburger: {
          position: 'absolute',
          top: `${CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
          left: `${CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
          zIndex: '1000',
        },
        wrapper: {
          display: 'flex',
          height: '100vh',
          width: '100vw',
        },
        controlPanelWrapper: {
          flex: `0 0 ${CONTROL_PANEL_WIDTH + CONTROL_PANEL_WIDTH_UNITS}`,
          position: 'relative',
        },
        planetariumWrapper: {
          flex: '1 0 0%',
          height: '100%',
        },
      },
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
  }

  menuToggle = isOpen => {
    this.setState({ menuOpen: isOpen })
  }

  render() {
    return (
      <div>
        <div style={this.state.styles.wrapper}>
          <div style={this.state.styles.controlPanelWrapper}>
            <ControlPanel />
          </div>
          <div style={this.state.styles.planetariumWrapper}>
            <Planetarium />
          </div>
        </div>
        <Hamburger
          isOpen={this.state.menuOpen}
          onClick={this.menuToggle}
          height={28}
          color='#fff'
          stroke={4}
          borderRadius={1.5}
          style={this.state.styles.hamburger}
        />
      </div>
    )
  }
}


export default connect()(Radium(App))
