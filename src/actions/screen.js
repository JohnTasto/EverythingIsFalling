import Vector from '../geometry/vector'

import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  HOVER_BODY,
} from './types'


let cursorStart
let mousePressed = false


export function resize(size) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    // 1/2 * viewport.size * ((size - screen.size) / screen.size)
    let viewportDx = size.sub(screen.size).div(screen.size).mult(viewport.size).scale(0.5)
    let min = viewport.min.sub(viewportDx)
    let max = viewport.max.add(viewportDx)
    let zoom = size.x / (max.x - min.x)
    dispatch({
      type: RESIZE_WINDOW,
      screen: {
        size,
      },
      viewport: {
        min,
        max,
        size: max.subtract(min),
        zoom,
      },
    })
  }
}

export function zoom(dY, cursor) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let dZoom = Math.pow(2, (dY / 100))
    let mousePercent = cursor.div(screen.size)
    // (dZoom * viewport.size) - viewport.size
    let viewportDx = viewport.size.scale(dZoom).sub(viewport.size)
    let min = viewport.min.add(viewportDx.mult(mousePercent))
    let max = viewport.max.sub(viewportDx.mult(Vector.one().sub(mousePercent)))
    let zoom = screen.size.x / (max.x - min.x)
    dispatch({
      type: ZOOM_WINDOW,
      viewport: {
        min,
        max,
        size: max.subtract(min),
        zoom,
      },
    })
  }
}

export function mouseDown(cursor, hover) {
  return (dispatch, getState) => {
    let { bodies, screen: { screen, viewport } } = getState()
    cursor = viewport.min.lerp(viewport.max, cursor.div(screen.size))
    if (!hover) {
      mousePressed = true
      cursorStart = cursor
    }
    let selected
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (body.position.distanceToSquared(cursor) < body.radius * body.radius) {
        selected = bodyKey
      }
    }
    dispatch({
      type: hover ? HOVER_BODY : SELECT_BODY,
      selected
    })
  }
}

export function mouseMove(cursor) {
  if (!mousePressed) {
    return mouseDown(cursor, true)
  }
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let offset = cursorStart.sub(viewport.min.lerp(viewport.max, cursor.div(screen.size)))
    dispatch({
      type: PAN_WINDOW,
      min: viewport.min.add(offset),
      max: viewport.max.add(offset),
    })
  }
}

export function mouseUp(cursor) {
  mousePressed = false
  return mouseMove(cursor)
}
