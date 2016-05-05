import Vector from '../geometry/vector'

import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  HOVER_BODY,
  DRAG_BODY,
} from './types'


let cursorSPosition
let cursorVPosition
let cursorSStart
let cursorVStart
let dragging
let mousePressed = false
let shouldDeselect
let justSelected
let bodyStart


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
    let dZoom = Math.pow(2, (-dY / 100))
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
  dragging = false
  cursorSStart = cursorSPosition
  cursorVStart = cursorVPosition
  return (dispatch, getState) => {
    let bodies = getState().bodies
    justSelected = checkHit(cursorVPosition, bodies)
    if (justSelected) {
      shouldDeselect = false
      bodyStart = bodies[justSelected].position
      dispatch({
        type: SELECT_BODY,
        body: justSelected,
      })
    } else {
      shouldDeselect = true
    }
  }
}

export function mouseMove(cursor) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport }, bodies } = getState()
    cursorSPosition = cursor
    cursorVPosition = viewport.min.lerp(viewport.max, cursor.div(screen.size))
    if (mousePressed) {
      let offset = cursorVStart.sub(cursorVPosition)
      if (dragging || cursorSStart.sub(cursorSPosition).lengthSquared() > 25) {
        dragging = true
        shouldDeselect = false
        if (!justSelected) {
          dispatch({
            type: PAN_WINDOW,
            min: viewport.min.add(offset),
            max: viewport.max.add(offset),
          })
        }
      }
    }
  }
}

export function mouseUp(cursor) {
  mousePressed = false
  return (dispatch, getState) => {
    if (shouldDeselect) {
      dispatch({
        type: SELECT_BODY,
        body: undefined,
      })
    }
    if (justSelected) {
      dispatch({
        type: DRAG_BODY,
        body: undefined,
        position: undefined,
      })
    }
  }
}

export function checkHover() {
  return (dispatch, getState) => {
    let hovered = checkHit(cursorVPosition, getState().bodies)
    dispatch({
      type: HOVER_BODY,
      body: hovered,
    })
  }
}

export function checkDragging() {
  return (dispatch, getState) => {
    if (mousePressed && justSelected && dragging) {
      let offset = cursorVStart.sub(cursorVPosition)
      dispatch({
        type: DRAG_BODY,
        body: justSelected,
        position: bodyStart.sub(offset),
      })
    }
  }
}

function checkHit(cursor, bodies) {
  let hit
  if (cursor) {
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (body.position.distanceToSquared(cursorVPosition) < body.radius * body.radius) {
        hit = bodyKey
      }
    }
  }
  return hit
}
