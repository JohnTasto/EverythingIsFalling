import Vector from '../geometry/vector'

import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  HOVER_BODY,
} from './types'


let cursorPosition
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

export function mouseDown(cursor) {
  mousePressed = true
  cursorStart = cursorPosition
  return (dispatch, getState) => {
    let selected = checkHit(cursorPosition, getState().bodies)
    dispatch({
      type: SELECT_BODY,
      selected
    })
  }
}

export function mouseMove(cursor) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    cursorPosition = viewport.min.lerp(viewport.max, cursor.div(screen.size))
    if (mousePressed) {
      let offset = cursorStart.sub(cursorPosition)
      dispatch({
        type: PAN_WINDOW,
        min: viewport.min.add(offset),
        max: viewport.max.add(offset),
      })
    }
  }
}

export function mouseUp(cursor) {
  mousePressed = false
  return mouseMove(cursor)
}

export function checkHover() {
  return (dispatch, getState) => {
    let hovered = checkHit(cursorPosition, getState().bodies)
    dispatch({
      type: HOVER_BODY,
      hovered
    })
  }
}

function checkHit(cursor, bodies) {
  let hit
  if (cursor) {
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (body.position.distanceToSquared(cursorPosition) < body.radius * body.radius) {
        hit = bodyKey
      }
    }
  }
  return hit
}
