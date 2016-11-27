import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'

import ControlMain from './control-main'

import {
  COLOR,
  CONTROL_PANEL_WIDTH,
  CONTROL_PANEL_PADDING,
} from '../constants'


class ControlPanel extends Component {

  static propTypes = {
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      styles: {
        container: {
          position: 'relative',
          height: '100%',
          width: `${CONTROL_PANEL_WIDTH}px`,
          background: COLOR.clone().desaturate(0.5).clearer(0.5).rgbString(),
        },
        heading: {
          height: `${CONTROL_PANEL_PADDING * 3.5}rem`,
          width: `${CONTROL_PANEL_WIDTH}px`,
          fontSize: `${CONTROL_PANEL_PADDING}rem`,
          padding: `${CONTROL_PANEL_PADDING}rem`,
          textAlign: 'right',
          background: COLOR.clone().darken(0.5).clearer(0.25).rgbString(),
        },
        controls: {
          height: `calc(100% - ${CONTROL_PANEL_PADDING * 3.5}rem)`,
          padding: `${CONTROL_PANEL_PADDING}rem`,
          overflow: 'scroll',
        },
      },
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


function mapStateToProps(state) {  // eslint-disable-line no-unused-vars
  return {
    // screen: state.screen.screen,
    // viewport: state.screen.viewport,
    // selected: state.screen.selected,
    // bodies: state.bodies,
    // templates: state.templates,
    // options: state.options,
  }
}

function mapDispatchToProps(dispatch) {  // eslint-disable-line no-unused-vars
  return {
    // view: bindActionCreators(view, dispatch),
    // set: bindActionCreators(options, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(ControlPanel))
