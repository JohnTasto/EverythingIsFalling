import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from '../actions/bodies'
import Planetarium from './planetarium'
import MainControl from './main-control'

import { CONTROL_PANEL_WIDTH } from '../constants'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      style: {
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

  render() {
    return (
      <div style={this.state.style.wrapper}>
        <div style={this.state.style.mainControlWrapper}>
          <MainControl style={this.state.style.mainControl}/>
        </div>
        <div style={this.state.style.planetariumWrapper}>
          <Planetarium style={this.state.style.planetarium} />
        </div>
      </div>
    )
  }
}


export default connect()(App)
