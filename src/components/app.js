import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Planetarium from './planetarium'
import * as init from '../actions/init'


class App extends Component {

  componentDidMount() {
    this.props.init.getImages()
  }

  render() {
    return (
      <Planetarium />
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    init: bindActionCreators(init, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(App)
