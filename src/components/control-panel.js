import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'
import Color from 'color'

import ControlMain from './control-main'

import * as view from '../actions/view'
import * as options from '../actions/options'

import { COLOR } from '../constants'
import {
  CONTROL_PANEL_WIDTH,
  CONTROL_PANEL_WIDTH_UNITS,
  CONTROL_PANEL_PADDING,
  CONTROL_PANEL_PADDING_UNITS,
} from '../constants'


class ControlPanel extends Component {

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        container: {
          position: 'relative',
          height: '100%',
          width: `${CONTROL_PANEL_WIDTH + CONTROL_PANEL_WIDTH_UNITS}`,
          background: COLOR.clone().desaturate(0.5).clearer(0.5).rgbString(),
          overflow: 'scroll',
        },
        heading: {
          position: 'fixed',
          width: `${CONTROL_PANEL_WIDTH + CONTROL_PANEL_WIDTH_UNITS}`,
          zIndex: '100',
          fontSize: `${CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
          padding: `${CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
          textAlign: 'right',
          background: COLOR.clone().darken(0.5).rgbString(),
        },
        controls: {
          marginTop: `${3 * CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
          padding: `${CONTROL_PANEL_PADDING + CONTROL_PANEL_PADDING_UNITS}`,
        },
      }
    }
  }

  render() {
    return (
      <div style={[this.state.styles.container, this.props.style]}>
        <div style={this.state.styles.heading}>Everything Is Falling</div>
        <ControlMain style={this.state.styles.controls}/>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    // screen: state.screen.screen,
    // viewport: state.screen.viewport,
    // selected: state.screen.selected,
    // bodies: state.bodies,
    // templates: state.templates,
    // options: state.options,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // view: bindActionCreators(view, dispatch),
    // set: bindActionCreators(options, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ControlPanel))
