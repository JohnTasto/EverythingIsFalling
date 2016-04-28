import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnimationFrame from 'animation-frame'
import wheel from 'mouse-wheel'

import * as screen from '../actions/screen'
import * as update from '../actions/update'


class Planetarium extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lastMs: 0,
      animationFrame: new AnimationFrame(),
      ratio: window.devicePixelRatio || 1,
      zoom: .000005,
      canvasStyle: {
        background: 'url("/img/stars.jpg") center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
      }
    }
  }

  handleEvent(e) {
    switch (e.type) {
      case 'resize':
        this.props.screenA.resize(window.innerWidth, window.innerHeight)
        break
    }
  }

  handleZoom(dx, dy, dz) {
    this.props.screenA.zoom(dy)
  }

  componentDidMount() {
    window.addEventListener('resize', this, false)
    let wheelListener = wheel(this.canvas, this.handleZoom.bind(this), true)
    this.setState({ wheelListener })
    this.getFrame()
  }

  componentWillUnmount() {
    this.animationFrame.cancel(this.state.frame)
    this.canvas.removeEventListener('wheel', this.state.wheelListener)
    window.removeEventListener('resize', this, false)
  }

  componentWillReceiveProps(props) {
    this.canvas.width = props.screen.width * this.state.ratio
    this.canvas.height = props.screen.height * this.state.ratio
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
    this.props.update.update(2000, this.props.bodies)

    let ctx = this.canvas.getContext('2d')
    ctx.save()
    ctx.scale(this.state.ratio, this.state.ratio)
    ctx.clearRect(0, 0, this.props.screen.width, this.props.screen.height)

    ctx.scale(this.props.screen.zoom, this.props.screen.zoom)

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
    let vectors = true
    if (vectors) {
      ctx.scale(1/sX, 1/sY)
      this.drawVector(ctx, body.force, 'red', 500000, .00000000000000001)
      this.drawVector(ctx, body.velocity, 'green', 500000, 100)
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
        width={this.props.screen.width * this.state.ratio}
        height={this.props.screen.height * this.state.ratio}
        ref={(ref) => this.canvas = ref}>
      </canvas>
    )
  }
}


function mapStateToProps(state) {
  return {
    screen: state.screen,
    bodies: state.bodies.sim
  }
}

function mapDispatchToProps(dispatch) {
  return {
    screenA: bindActionCreators(screen, dispatch),
    update: bindActionCreators(update, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Planetarium)
