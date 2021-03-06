/* eslint react/prop-types: [1, {ignore: [view, mouse, dragging, hovering, options, update, bodies, screen, viewport, selected]}]*/

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Radium from 'radium'
import AnimationFrame from 'animation-frame'

import Vector from '../geometry/vector'
import * as view from '../actions/view'
import * as update from '../actions/update'
import * as mouse from '../actions/mouse'


const FRAMERATE_INDEPENDENT_TIME = false


class Planetarium extends Component {

  static propTypes = {
    style: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      animationFrame: new AnimationFrame(),
      ratio: window.devicePixelRatio || 1,
      justDragged: false,
      canvasOffset: undefined,
      isMouseInCanvas: undefined,
      styles: {
        canvas: {
          height: '100%',
          width: '100%',
        },
      },
    }
    if (FRAMERATE_INDEPENDENT_TIME) this.state.lastMs = 0  // eslint-disable-line react/no-direct-mutation-state
  }

  componentDidMount() {
    window.addEventListener('resize', this, false)
    this.canvas.addEventListener('wheel', this, false)
    this.canvas.addEventListener('mousedown', this, false)
    this.canvas.addEventListener('mousemove', this, false)
    this.canvas.addEventListener('mouseover', this, false)
    this.canvas.addEventListener('mouseout', this, false)
    this.requestFrame()
  }

  componentWillReceiveProps(props) {
    this.canvas.width = props.screen.size.x * this.state.ratio
    this.canvas.height = props.screen.size.y * this.state.ratio
  }

  shouldComponentUpdate() { return false }

  componentWillUnmount() {
    this.cancelFrame()
    window.removeEventListener('resize', this, false)
    this.canvas.removeEventListener('wheel', this, false)
    this.canvas.removeEventListener('mousedown', this, false)
    this.canvas.removeEventListener('mousemove', this, false)
    this.canvas.removeEventListener('mouseover', this, false)
    this.canvas.removeEventListener('mouseout', this, false)
  }

  handleEvent(e) {
    let posWindow, posCanvas
    switch (e.type) {
      case 'resize': {
        let bounds = this.canvas.getBoundingClientRect()
        this.props.view.resize(new Vector(bounds.width, bounds.height))
        break
      }
      case 'wheel': {
        this.props.mouse.wheel(e.deltaY, new Vector(e.offsetX, e.offsetY))
        e.preventDefault()
        break
      }
      case 'mousedown': {
        posCanvas = new Vector(e.offsetX, e.offsetY)
        posWindow = new Vector(e.screenX, e.screenY)
        this.props.mouse.mouseDown(posCanvas)
        this.setState({ canvasOffset: posWindow.sub(posCanvas) })
        this.canvas.removeEventListener('mousemove', this, false)
        window.addEventListener('mousemove', this, false)
        window.addEventListener('mouseup', this, false)
        break
      }
      case 'mousemove': {
        if (this.state.canvasOffset) {
          posWindow = new Vector(e.screenX, e.screenY)
          this.props.mouse.mouseMove(posWindow.sub(this.state.canvasOffset))
        } else {
          this.props.mouse.mouseMove(new Vector(e.offsetX, e.offsetY))
        }
        break
      }
      case 'mouseup': {
        posWindow = new Vector(e.screenX, e.screenY)
        this.props.mouse.mouseUp(posWindow.sub(this.state.canvasOffset))
        this.setState({ canvasOffset: undefined })
        this.canvas.addEventListener('mousemove', this, false)
        window.removeEventListener('mousemove', this, false)
        window.removeEventListener('mouseup', this, false)
        break
      }
      case 'mouseover': {
        this.setState({ isMouseInCanvas: true })
        break
      }
      case 'mouseout': {
        this.props.mouse.cancelHover()
        this.setState({ isMouseInCanvas: false })
        break
      }
    }
  }

  requestFrame() {
    this.setState({
      frame: this.state.animationFrame.request(this.update.bind(this)),
    })
  }

  cancelFrame() {
    this.animationFrame.cancel(this.state.frame)
  }

  update(currentMs) {

    this.props.mouse.checkDragging()
    if (this.state.isMouseInCanvas) this.props.mouse.checkHovering()

    if (this.props.dragging) {
      this.canvas.style.cursor = 'pointer'
      this.canvas.style.cursor = '-moz-grabbing'
      this.canvas.style.cursor = '-webkit-grabbing'
      this.canvas.style.cursor = 'grabbing'
      this.setState({ justDragged: true })
    } else if (this.props.hovering) {
      this.canvas.style.cursor = 'pointer'
      this.canvas.style.cursor = '-moz-grab'
      this.canvas.style.cursor = '-webkit-grab'
      this.canvas.style.cursor = 'grab'
    } else {
      this.canvas.style.cursor = 'auto'
      this.setState({ justDragged: false })
    }

    // update bodies
    if (!this.props.options.paused || (this.props.dragging && this.props.options.showVectors)) {
      if (this.state.justDragged || !(this.props.options.pauseHover && this.props.hovering)) {
        if (FRAMERATE_INDEPENDENT_TIME) {
          this.setState({ lastMs: currentMs, dMs: currentMs - this.state.lastMs })
          this.props.update.update(this.state.dMs * this.props.options.speed, this.props.bodies)
        } else {
          this.props.update.update(16.666666 * this.props.options.speed, this.props.bodies)
        }
      }
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

    if (this.props.options.showVectors) {
      for (let bodyKey in this.props.bodies) {
        this.renderVectors(ctx, bodyKey)
      }
    }

    // // draw box in very center for debugging
    // ctx.fillStyle = 'white'
    // ctx.fillRect(-1000000,-1000000,2000000,2000000)

    ctx.restore()

    this.requestFrame()
  }

  renderBody(ctx, bodyKey) {
    let body = this.props.bodies[bodyKey]

    ctx.save()
    ctx.translate(body.position.x, body.position.y)

    // scale radii
    ctx.scale(this.props.options.radiiScale, this.props.options.radiiScale)

    // scale images
    ctx.save()
    ctx.scale(
      2 * body.radius / body.bodyImage.naturalWidth,
      2 * body.radius / body.bodyImage.naturalHeight
    )

    // draw body
    if (!body.active) ctx.globalAlpha = 0.5
    this.drawImageCentered(ctx, body.bodyImage)
    ctx.globalAlpha = 1

    // draw shadow
    if (body.shadowAngle !== undefined) {
      ctx.save()
      ctx.rotate(body.shadowAngle)
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
      this.drawCircle(ctx, body.radius, null, 'rgba(0,127,255,.5)', 10 / this.props.options.radiiScale, false)
    }
    // draw hover
    if (bodyKey === this.props.hovering) {
      this.drawCircle(ctx, body.radius, 'rgba(255,255,255,.25)')
    }

    ctx.restore()
  }

  renderVectors(ctx, bodyKey) {
    let body = this.props.bodies[bodyKey]

    if (!body.active) return

    ctx.save()
    ctx.translate(body.position.x, body.position.y)

    // draw force and velocity vectors
    if (body.force)
      this.drawVector(ctx, body.force, 'red', 3, .000000000000000005)
    if (body.velocity)
      this.drawVector(ctx, body.velocity, 'green', 3, 1000)
    for (let forceKey in body.forces) {
      this.drawVector(ctx, body.forces[forceKey], 'blue', 2, .000000000000000005)
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
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(v.x, v.y)
    ctx.stroke()
    ctx.restore()
  }

  render() {
    return (
      <canvas style={[this.props.style, this.state.styles.canvas]}
        width={this.props.screen.size.x * this.state.ratio}
        height={this.props.screen.size.y * this.state.ratio}
        ref={(ref) => this.canvas = ref}
      />
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
    options: state.options,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    view: bindActionCreators(view, dispatch),
    update: bindActionCreators(update, dispatch),
    mouse: bindActionCreators(mouse, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(Radium(Planetarium))
