import Vector from '../geometry/vector'

import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  PLACE_BODY,
  MOVE_BODY,
  DRAG_BODY,
  ACTIVATE_BODY,
} from './types'


export function resize(size) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    // 1/2 * viewport.size * ((size - screen.size) / screen.size)
    let viewportDZoom = size.sub(screen.size).div(screen.size).mult(viewport.size).scale(0.5)
    let min = viewport.min.sub(viewportDZoom)
    let max = viewport.max.add(viewportDZoom)
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

export function pan(offset) {
  return (dispatch, getState) => {
    let viewport = getState().screen.viewport
    dispatch({
      type: PAN_WINDOW,
      min: viewport.min.add(offset),
      max: viewport.max.add(offset),
    })
  }
}

export function zoom(dZoom, point) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let pointPercent = point.sub(viewport.min).div(viewport.size)
    // (dZoom * viewport.size) - viewport.size
    let viewportDZoom = viewport.size.scale(dZoom).sub(viewport.size)
    let min = viewport.min.add(viewportDZoom.mult(pointPercent))
    let max = viewport.max.sub(viewportDZoom.mult(Vector.one().sub(pointPercent)))
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

export function select(bodyKey) {
  return {
    type: SELECT_BODY,
    bodyKey,
  }
}

export function deselect() {
  return {
    type: SELECT_BODY,
  }
}

export function place(bodyKey, position) {
  return {
    type: PLACE_BODY,
    bodyKey,
    position,
  }
}

export function move(bodyKey, offset) {
  return {
    type: MOVE_BODY,
    bodyKey,
    offset,
  }
}

export function drag(bodyKey, offset) {
  return {
    type: DRAG_BODY,
    bodyKey,
    offset,
  }
}

export function dragend(bodyKey) {
  return (dispatch, getState) => {
    dispatch({ type: DRAG_BODY })
    if (!getState().bodies[bodyKey].active) {
      dispatch ({
        type: ACTIVATE_BODY,
        bodyKey,
      })
    }
  }
}

export function checkHit(point, bodies) {
  let hit
  if (point) {
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (body.position.distanceToSquared(point) < body.radius * body.radius) {
        hit = bodyKey
      }
    }
  }
  return hit
}
