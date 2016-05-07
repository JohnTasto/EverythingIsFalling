import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from '../actions/bodies'
import Planetarium from './planetarium'
import MainControl from './main-control'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      wrapperStyle: {
        position: 'relative',
      },
      mainControlStyle: {
        position: 'absolute',
        background: 'rgba(63,95,127,.75)',
        width: '320px',
        right: '2rem',
        top: '2rem',
        borderRadius: '0.25rem'
      },
    }
  }

  componentDidMount() {
    this.props.dispatch(init())
  }

  render() {
    return (
      <div style={this.state.wrapperStyle}>
        <Planetarium />
        <MainControl style={this.state.mainControlStyle}/>
      </div>
    )
  }
}


export default connect()(App)
