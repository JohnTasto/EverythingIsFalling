import Vector from '../geometry/vector'
import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW_START,
  PAN_WINDOW,
} from './types'

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

export function zoom(dY, cursorPos) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    let dZoom = Math.pow(2, (dY / 100))
    let mousePercent = cursorPos.div(screen.size)
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

export function mouseDown(cursorPos) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport } } = getState()
    dispatch({
      type: PAN_WINDOW_START,
      panStart: viewport.min.lerp(viewport.max, cursorPos.div(screen.size)),
    })
  }
}

export function mouseMove(cursorPos) {
  return (dispatch, getState) => {
    let { screen: { screen, viewport, panStart } } = getState()
    let offset = panStart.sub(viewport.min.lerp(viewport.max, cursorPos.div(screen.size)))
    dispatch({
      type: PAN_WINDOW,
      min: viewport.min.add(offset),
      max: viewport.max.add(offset),
    })
  }
}

export function mouseUp(cursorPos) {
  return mouseMove(cursorPos)
}
