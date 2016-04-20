import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnimationFrame from 'animation-frame'

import * as actions from '../actions/actions'


class Planetarium extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastMs: 0,
      animationFrame: new AnimationFrame(),
      canvasStyle: {
        background: 'black',
        width: '100%',
        height: '100%'
      }
    }
  }

  componentDidMount() {
    this.getFrame()
  }

  getFrame() {
    this.setState({
      frame: this.state.animationFrame.request(this.update.bind(this))
    })
  }

  componentWillUnmount() {
    this.animationFrame.cancel(this.state.frame)
  }

  componentWillReceiveProps(props) {
    this.canvas.width = props.window.width
    this.canvas.height = props.window.height
  }

  shouldComponentUpdate() { return false }

  static contextTypes = {}
  static propTypes = {}
  static defaultProps = {}

  update(currentMs) {
    let dMs = currentMs - this.state.lastMs
    this.setState({ lastMs: currentMs })

    this.getFrame()
  }

  render() {
    return (
      <canvas style={this.state.canvasStyle}
        width={this.props.window.width}
        height={this.props.window.height}
        ref={(ref) => this.canvas = ref}>
      </canvas>
    )
  }
}

function mapStateToProps(state) {
  return {
    window: state.planetarium.window
  }
}

export default connect(mapStateToProps, actions)(Planetarium)
