import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnimationFrame from 'animation-frame'

import Vector from '../geometry/vector'
import * as view from '../actions/view'
import * as update from '../actions/update'
import * as mouse from '../actions/mouse'


const FRAMERATE_INDEPENDENT_TIME = false


class Planetarium extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationFrame: new AnimationFrame(),
      ratio: window.devicePixelRatio || 1,
      canvasStyle: {
        background: 'url("/img/stars.jpg") center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%',
      },
    }
    if (FRAMERATE_INDEPENDENT_TIME) this.state.lastMs = 0
  }

  handleEvent(e) {
    switch (e.type) {
      case 'resize':
        this.props.view.resize(new Vector(window.innerWidth, window.innerHeight))
        break
      case 'wheel':
        this.props.mouse.wheel(e.deltaY, new Vector(e.clientX, e.clientY))
        e.preventDefault()
        break
      case 'mousedown':
        this.props.mouse.mouseDown(new Vector(e.clientX, e.clientY))
        window.addEventListener('mouseup', this, false)
        break
      case 'mousemove':
        this.props.mouse.mouseMove(new Vector(e.clientX, e.clientY))
        break
      case 'mouseup':
        this.props.mouse.mouseUp(new Vector(e.clientX, e.clientY))
        window.removeEventListener('mouseup', this, false)
        break
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this, false)
    window.addEventListener('mousemove', this, false)
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('wheel', this, false)
    this.requestFrame()
  }

  componentWillUnmount() {
    this.cancelFrame()
    this.canvas.removeEventListener('wheel', this, false)
    this.canvas.removeEventListener('mousedown', this, false)
    window.removeEventListener('mousemove', this, false)
    window.removeEventListener('resize', this, false)
  }

  componentWillReceiveProps(props) {
    this.canvas.width = props.screen.size.x * this.state.ratio
    this.canvas.height = props.screen.size.y * this.state.ratio
  }

  shouldComponentUpdate() { return false }

  requestFrame() {
    this.setState({
      frame: this.state.animationFrame.request(this.update.bind(this))
    })
  }

  cancelFrame() {
    this.animationFrame.cancel(this.state.frame)
  }

  update(currentMs) {
    this.props.mouse.checkDragging()
    this.props.mouse.checkHovering()

    if (this.props.dragging) {
      this.canvas.style.cursor = 'pointer'
      this.canvas.style.cursor = '-moz-grabbing'
      this.canvas.style.cursor = '-webkit-grabbing'
      this.canvas.style.cursor = 'grabbing'
    } else if (this.props.hovering) {
      this.canvas.style.cursor = 'pointer'
      this.canvas.style.cursor = '-moz-grab'
      this.canvas.style.cursor = '-webkit-grab'
      this.canvas.style.cursor = 'grab'
    } else {
      this.canvas.style.cursor = 'auto'
    }

    if (FRAMERATE_INDEPENDENT_TIME) {
      this.setState({ lastMs: currentMs, dMs: currentMs - this.state.lastMs })
      this.props.update.update(this.state.dMs, this.props.bodies)
    } else {
      this.props.update.update(1000, this.props.bodies)
    }

    let ctx = this.canvas.getContext('2d')
    ctx.save()

    // scale for hi DPI screens
    ctx.scale(this.state.ratio, this.state.ratio)

    // clear the canvas
    ctx.clearRect(0, 0, this.props.screen.size.x, this.props.screen.size.y)

    // convert to viewport coordinates
    ctx.scale(this.props.viewport.zoom, this.props.viewport.zoom)
    ctx.translate(-this.props.viewport.min.x, -this.props.viewport.min.y)

    for (let bodyKey in this.props.bodies) {
      this.renderBody(ctx, bodyKey)
    }

    // // draw box in very center for debugging
    // ctx.fillStyle = 'white'
    // ctx.fillRect(-1000000,-1000000,2000000,2000000)

    ctx.restore()

    this.requestFrame()
  }

  renderBody(ctx, bodyKey) {
    ctx.save()

    let body = this.props.bodies[bodyKey]

    ctx.translate(body.position.x, body.position.y)

    // scale images
    ctx.save()
    ctx.scale(
      2 * body.radius / body.bodyImage.naturalWidth,
      2 * body.radius / body.bodyImage.naturalHeight
    )

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

    // undo scale images
    ctx.restore()

    // draw selection
    if (bodyKey === this.props.selected) {
      this.drawCircle(ctx, body.radius, null, 'rgba(0,127,255,.5)', 10, false)
    }
    if (bodyKey === this.props.hovering) {
      this.drawCircle(ctx, body.radius, 'rgba(255,255,255,.25)')
    }

    // draw force and velocity vectors
    let vectors = true
    if (vectors) {
      this.drawVector(ctx, body.force, 'red', 3, .00000000000000001)
      this.drawVector(ctx, body.velocity, 'green', 3, 100)
      for (let forceKey in body.forces) {
        this.drawVector(ctx, body.forces[forceKey], 'blue', 2, .00000000000000001)
      }
    }

    ctx.restore()
  }

  drawImageCentered(ctx, image) {
    ctx.drawImage(image, -image.naturalWidth / 2, -image.naturalHeight / 2)
  }

  drawCircle(ctx, radius, fillColor, strokeColor, strokeWidth, outer) {
    ctx.save()
    strokeWidth *= 1 / this.props.viewport.zoom
    if (strokeWidth) {
      if ( outer) radius += .5 * strokeWidth
      if (!outer) radius -= .5 * strokeWidth
      if (radius < strokeWidth / 2) radius = strokeWidth / 2
    }
    ctx.beginPath()
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false)
    if (fillColor) {
      ctx.fillStyle = fillColor
      ctx.fill()
    }
    if (strokeColor) {
      ctx.lineWidth = strokeWidth
      ctx.strokeStyle = strokeColor
      ctx.stroke()
    }
    ctx.restore()
  }

  drawVector(ctx, vector, color, width, scale) {
    ctx.save()
    width *= 1 / this.props.viewport.zoom
    //scale *= 1 / this.props.viewport.zoom
    let v = vector.scale(scale)
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(v.x, v.y)
    ctx.stroke()
    ctx.restore()
  }

  render() {
    return (
      <canvas style={this.state.canvasStyle}
        width={this.props.screen.size.x * this.state.ratio}
        height={this.props.screen.size.y * this.state.ratio}
        ref={(ref) => this.canvas = ref}>
      </canvas>
    )
  }
}


function mapStateToProps(state) {
  return {
    screen: state.screen.screen,
    viewport: state.screen.viewport,
    selected: state.screen.selected,
    hovering: state.screen.hovering,
    dragging: state.screen.dragging,
    bodies: state.bodies,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    view: bindActionCreators(view, dispatch),
    update: bindActionCreators(update, dispatch),
    mouse: bindActionCreators(mouse, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Planetarium)
