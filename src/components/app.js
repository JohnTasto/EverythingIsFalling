import React, { Component } from 'react'
import { connect } from 'react-redux'

import Planetarium from './planetarium'
//import * as actions from '../actions/actions'
import * as init from '../actions/init'


class App extends Component {

  componentDidMount() {
    this.props.dispatch(init.getImages())
  }

  render() {
    return (
      <Planetarium />
    )
  }
}


export default connect()(App)
