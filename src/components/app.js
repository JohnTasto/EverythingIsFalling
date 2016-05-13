import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from '../actions/bodies'
import Hamburger from './hamburger'
import MainControl from './main-control'
import Planetarium from './planetarium'

import { CONTROL_PANEL_WIDTH } from '../constants'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
      styles: {
        hamburger: {
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
        },
        wrapper: {
          display: 'flex',
          height: '100vh',
          width: '100vw',
        },
        mainControlWrapper: {
          flex: `0 0 ${CONTROL_PANEL_WIDTH}px`,
          position: 'relative',
        },
        mainControl: {
          position: 'absolute',
          height: '100%',
          width: `${CONTROL_PANEL_WIDTH}`,
          right: '0',
          padding: '1.5rem',
          background: 'rgb(63,95,127)',
        },
        planetariumWrapper: {
          flex: '1 0 0%',
          height: '100%',
        },
        planetarium: {
          background: 'url("img/stars.jpg") center',
          backgroundSize: 'cover',
          width: '100%',
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
          <div style={this.state.styles.mainControlWrapper}>
            <MainControl style={this.state.styles.mainControl}/>
          </div>
          <div style={this.state.styles.planetariumWrapper}>
            <Planetarium style={this.state.styles.planetarium} />
          </div>
        </div>
        <Hamburger
          isOpen={this.state.menuOpen}
          onClick={this.menuToggle}
          color='#fff'
          stroke={4}
          borderRadius={1.5}
          style={this.state.styles.hamburger}
        />
      </div>
    )
  }
}


export default connect()(App)
