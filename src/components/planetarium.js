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
      ratio: window.devicePixelRatio || 1,
      canvasStyle: {
        background: 'url("/img/stars.jpg") center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
      }
    }
  }

  handleResize() {
    this.props.resizeWindow(window.innerWidth, window.innerHeight)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({ context: this.canvas.getContext('2d') })
    this.getFrame()
  }

  componentWillUnmount() {
    this.animationFrame.cancel(this.state.frame)
  }

  componentWillReceiveProps(props) {
    this.canvas.width = props.window.width
    this.canvas.height = props.window.height
  }

  shouldComponentUpdate() { return false }

  getFrame() {
    this.setState({
      frame: this.state.animationFrame.request(this.update.bind(this))
    })
  }

  update(currentMs) {
    let dMs = currentMs - this.state.lastMs
    this.setState({ lastMs: currentMs })
    let ctx = this.state.context
    ctx.save()
    ctx.scale(this.state.ratio, this.state.ratio)

    // draw...
    ctx.fillStyle = '#29F'
    ctx.fillRect(50, 50, 100, 100)

    ctx.restore()
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
    window: state.window
  }
}

export default connect(mapStateToProps, actions)(Planetarium)