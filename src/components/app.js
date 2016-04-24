import React, { Component } from 'react'
import { connect } from 'react-redux'

import Planetarium from './planetarium'
import * as actions from '../actions/actions'


class App extends Component {

  componentDidMount() {
    this.props.getImages()
  }

  render() {
    return (
      <Planetarium />
    )
  }
}


export default connect(null, actions)(App)
