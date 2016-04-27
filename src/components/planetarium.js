import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnimationFrame from 'animation-frame'

import * as screen from '../actions/screen'
import * as update from '../actions/update'


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
    this.props.screen.resize(window.innerWidth, window.innerHeight)
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
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
    this.props.update.update(dMs * 10, this.props.bodies)

    let ctx = this.canvas.getContext('2d')
    ctx.save()
    ctx.scale(this.state.ratio, this.state.ratio)
    ctx.clearRect(0, 0, this.props.window.width, this.props.window.height)

    ctx.scale(.000005, .000005)

    for (let body in this.props.bodies) {
      this.renderBody(ctx, this.props.bodies[body])
    }

    ctx.restore()
    this.getFrame()
  }

  renderBody(ctx, body) {
    // let sX = 2 * (body.radius / 2e5) / body.bodyImage.naturalWidth
    // let sY = 2 * (body.radius / 2e5) / body.bodyImage.naturalHeight
    let sX = 2 * body.radius / body.bodyImage.naturalWidth
    let sY = 2 * body.radius / body.bodyImage.naturalHeight
    ctx.save()
    // ctx.translate(body.position.x / 2e5, body.position.y / 2e5)
    ctx.translate(body.position.x, body.position.y)
    ctx.scale(sX, sY)

    // draw body
    this.drawImageCentered(ctx, body.bodyImage)

    // draw shadow
    if (body.shadowAngle !== undefined) {
      ctx.save()
      ctx.rotate(shadowAngle)
      this.drawImageCentered(ctx, body.shadowImage)
      ctx.restore()
    }

    // draw rings
    if (body.ringImage) {
      this.drawImageCentered(ctx, body.ringImage)
    }

    // draw force and velocity vectors
    ctx.scale(1/sX, 1/sY)
    if (true) {
      this.drawVector(ctx, body.force, 'red', 500000, .00000000000000001)
      this.drawVector(ctx, body.velocity, 'green', 200000, 500)
      for (let forceKey in body.forces) {
        this.drawVector(ctx, body.forces[forceKey], 'blue', 300000, .00000000000000001)
      }
    }

    ctx.restore()
  }

  drawVector(ctx, vector, color, width, scale) {
    let v = vector.clone().scale(scale)
    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(v.x, v.y)
    ctx.stroke()
    ctx.restore()
  }

  drawImageCentered(ctx, image) {
    ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
  }

  render() {
    return (
      <canvas style={this.state.canvasStyle}
        width={this.props.window.width * this.state.ratio}
        height={this.props.window.height * this.state.ratio}
        ref={(ref) => this.canvas = ref}>
      </canvas>
    )
  }
}


function mapStateToProps(state) {
  return {
    window: state.window,
    bodies: state.bodies.sim
  }
}

function mapDispatchToProps(dispatch) {
  return {
    screen: bindActionCreators(screen, dispatch),
    update: bindActionCreators(update, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Planetarium)
