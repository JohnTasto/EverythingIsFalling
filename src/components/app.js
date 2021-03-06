/* eslint react/prop-types: [1, {ignore: [dispatch]}]*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import { init } from '../actions/bodies'
import Hamburger from './hamburger'
import ControlPanel from './control-panel'
import Planetarium from './planetarium'

import {
  CONTROL_PANEL_WIDTH,
  CONTROL_PANEL_PADDING,
} from '../constants'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: true,
      styles: {
        hamburger: {
          position: 'absolute',
          top: `${CONTROL_PANEL_PADDING}rem`,
          left: `${CONTROL_PANEL_PADDING}rem`,
          zIndex: '1000',
        },
        wrapper: {
          position: 'relative',
          height: '100vh',
          width: '100vw',
          background: 'black',
        },
        controlPanelWrapper: {
          position: 'absolute',
          height: '100%',
          width: `${CONTROL_PANEL_WIDTH}px`,
          left: `-${CONTROL_PANEL_WIDTH}px`,
          transition: `0.5s ease-in-out`,
          zIndex: '1',
        },
        controlPanelWrapperMenuOpen: {
          transform: `translateX(${CONTROL_PANEL_WIDTH}px)`,
        },
        planetariumWrapper: {
          height: '100%',
          width: '100%',
        },
      },
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
  }

  menuToggle = (isOpen) => {
    this.setState({ menuOpen: isOpen })
  }

  render() {
    return (
      <div>
        <div style={this.state.styles.wrapper}>
          <div style={[
            this.state.styles.controlPanelWrapper,
            this.state.menuOpen ? this.state.styles.controlPanelWrapperMenuOpen : {},
          ]}>
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
          color="#fff"
          stroke={4}
          borderRadius={1.5}
          style={this.state.styles.hamburger}
        />
      </div>
    )
  }
}


export default connect()(Radium(App))
