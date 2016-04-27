import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Planetarium from './planetarium'


class App extends Component {

  render() {
    return (
      <Planetarium />
    )
  }
}


export default App
