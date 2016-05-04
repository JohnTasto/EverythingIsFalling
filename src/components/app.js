import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from '../actions/bodies'
import Planetarium from './planetarium'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(init())
  }

  render() {
    return (
      <Planetarium />
    )
  }
}


export default connect()(App)
