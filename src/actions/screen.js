import {
  RESIZE_WINDOW,
  ZOOM_WINDOW
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
