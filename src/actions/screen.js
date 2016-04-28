import {
  RESIZE_WINDOW,
  ZOOM_WINDOW
} from './types'

export function resize(width, height) {
  return {
    type: RESIZE_WINDOW,
    size: { width, height }
  }
}

export function zoom(dy) {
  return (dispatch, getState) => {
    dispatch({
      type: ZOOM_WINDOW,
      zoom: getState().screen.zoom * (Math.pow(2, (dy / 100)))
    })
  }
}
