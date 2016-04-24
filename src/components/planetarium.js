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
    this.canvas.width = props.window.width * this.state.ratio
    this.canvas.height = props.window.height * this.state.ratio
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
    ctx.clearRect(0, 0, this.props.window.width, this.props.window.height)

    this.renderBody(ctx, this.props.bodies.templates.saturn, 200, 200, 64)

    ctx.restore()
    this.getFrame()
  }

  renderBody(ctx, body, x, y, r) {
    if (body.bodyImage) {
      let sX = 2 * r / body.bodyImage.naturalWidth
      let sY = 2 * r / body.bodyImage.naturalHeight
      ctx.save()
      ctx.translate(x - r, y - r)
      ctx.scale(sX, sY)
      ctx.drawImage(body.bodyImage, 0, 0)
      if (body.ringImage) {
        ctx.translate((body.bodyImage.naturalWidth - body.ringImage.naturalWidth) / 2,
                      (body.bodyImage.naturalHeight - body.ringImage.naturalHeight) / 2)
        ctx.drawImage(body.ringImage, 0, 0)
      }
      ctx.restore()
    }
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
    window: state.window,
    bodies: state.bodies
  }
}

export default connect(mapStateToProps, actions)(Planetarium)
