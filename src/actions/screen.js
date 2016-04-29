import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW_START,
  PAN_WINDOW,
} from './types'

export function resize(width, height) {
  return (dispatch, getState) => {
    let screen = getState().screen
    let lastSimWidth = screen.maxX - screen.minX
    let lastSimHeight = screen.maxY - screen.minY
    let widthDxPercent = (width - screen.width) / screen.width
    let heightDxPercent = (height - screen.height) / screen.height
    let minX = screen.minX - (widthDxPercent * lastSimWidth) / 2
    let minY = screen.minY - (heightDxPercent * lastSimHeight) / 2
    let maxX = screen.maxX + (widthDxPercent * lastSimWidth) / 2
    let maxY = screen.maxY + (heightDxPercent * lastSimHeight) / 2
    let zoom = width / (maxX - minX)
    dispatch({
      type: RESIZE_WINDOW,
      size: { width, height },
      dimensions: { minX, minY, maxX, maxY },
      zoom,
    })
  }
}

export function zoom(dy, mX, mY) {
  return (dispatch, getState) => {
    let screen = getState().screen
    let dZoom = Math.pow(2, (dy / 100))
    let lastSimWidth = screen.maxX - screen.minX
    let lastSimHeight = screen.maxY - screen.minY
    let mXPercent = mX / screen.width
    let mYPercent = mY / screen.height
    let minX = screen.minX + ((dZoom * lastSimWidth) - lastSimWidth) * mXPercent
    let minY = screen.minY + ((dZoom * lastSimHeight) - lastSimHeight) * mYPercent
    let maxX = screen.maxX - ((dZoom * lastSimWidth) - lastSimWidth) * (1 - mXPercent)
    let maxY = screen.maxY - ((dZoom * lastSimHeight) - lastSimHeight) * (1 - mYPercent)
    let zoom = screen.width / (maxX - minX)
    dispatch({
      type: RESIZE_WINDOW,
      dimensions: { minX, minY, maxX, maxY },
      zoom,
    })
  }
}

export function mouseDown(mX, mY) {
  return (dispatch, getState) => {
    let screen = getState().screen
    //console.log(lerp(screen.minX, screen.maxX, mX/screen.width), lerp(screen.minY, screen.maxY, mY/screen.height))
    dispatch({
      type: PAN_WINDOW_START,
      panStartX: lerp(screen.minX, screen.maxX, mX/screen.width),
      panStartY: lerp(screen.minY, screen.maxY, mY/screen.height),
    })
  }
}

export function mouseMove(mX, mY) {
  return (dispatch, getState) => {
    let screen = getState().screen
    let dX = screen.panStartX - lerp(screen.minX, screen.maxX, mX/screen.width)
    let dY = screen.panStartY - lerp(screen.minY, screen.maxY, mY/screen.height)
    dispatch({
      type: PAN_WINDOW,
      dimensions: {
        minX: screen.minX + dX,
        minY: screen.minY + dY,
        maxX: screen.maxX + dX,
        maxY: screen.maxY + dY,
      },
    })
  }
}

export function mouseUp(mX, mY) {
  return mouseMove(mX, mY)
}

function lerp(min, max, percent) {
  return min * (1 - percent) + max * percent
}
