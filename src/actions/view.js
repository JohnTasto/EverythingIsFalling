import Vector from '../geometry/vector'

import * as bodies from './bodies'

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

export function zoomPercent(percent, point) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let pointPercent = point.sub(viewport.min).div(viewport.size)
    let size = viewport.size.scale(percent)
    let viewportDZoom = size.sub(viewport.size)
    let min = viewport.min.sub(viewportDZoom.mult(pointPercent))
    let max = viewport.max.add(viewportDZoom.mult(Vector.one().sub(pointPercent)))
    let zoom = screen.size.x / (max.x - min.x)
    dispatch({
      type: ZOOM_WINDOW,
      viewport: { size, min, max, zoom },
    })
  }
}

export function zoomMinSize(minSize, point) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    if (viewport.size.x < minSize || viewport.size.y < minSize) {
      let size = (viewport.size.x > viewport.size.y) ?
        new Vector(viewport.size.x * (minSize / viewport.size.y), minSize) :
        new Vector(minSize, viewport.size.y * (minSize / viewport.size.x))
      let pointPercent = point ?
        point.sub(viewport.min).div(viewport.size) :
        new Vector(0.5, 0.5)
      let viewportDZoom = size.sub(viewport.size)
      let min = viewport.min.sub(viewportDZoom.mult(pointPercent))
      let max = viewport.max.add(viewportDZoom.mult(Vector.one().sub(pointPercent)))
      let zoom = screen.size.x / (max.x - min.x)
      dispatch({
        type: ZOOM_WINDOW,
        viewport: { size, min, max, zoom },
      })
    }
  }
}

// function zoom(size, pointPercent) {
//
// }

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
      dispatch({
        type: ACTIVATE_BODY,
        bodyKey,
      })
      dispatch(bodies.deoverlap())
    }
  }
}

export function checkHit(point, bodies, radiiScale) {
  let hit
  if (point) {
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (body.position.distanceToSquared(point) < body.radius * body.radius * radiiScale * radiiScale) {
        hit = bodyKey
      }
    }
  }
  return hit
}
