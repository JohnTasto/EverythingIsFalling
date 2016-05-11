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
      wrapperStyle: {
        height: '100vh',
        width: '100vw',
      },
      mainControlStyle: {
        width: `${CONTROL_PANEL_WIDTH}px`,
        height: '100%',
        float: 'left',
        background: 'rgb(63,95,127)',
      },
      planetariumWrapperStyle: {
        marginLeft: `${CONTROL_PANEL_WIDTH}px`,
        height: '100%',
      },
      planetariumStyle: {
        background: 'url("/img/stars.jpg") center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      },
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
  }

  render() {
    return (
      <div style={this.state.wrapperStyle}>
        <MainControl style={this.state.mainControlStyle}/>
        <div style={this.state.planetariumWrapperStyle}>
          <Planetarium style={this.state.planetariumStyle} />
        </div>
      </div>
    )
  }
}
//        <Planetarium style={this.state.planetariumStyle}/>

export default connect()(App)
