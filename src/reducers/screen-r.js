import {
  RESIZE_WINDOW,
  ZOOM_WINDOW
} from '../actions/types'

const INITIAL_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  // zoom: .000005,
  minX: 0,
  minY: 0,
  maxX: window.innerWidth * 250000,
  maxY: window.innerHeight * 250000,
  zoom: 1 / 250000,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...state, ...action.size, ...action.dimensions, zoom: action.zoom }
      break
    case ZOOM_WINDOW:
      return { ...state, ...action.dimensions, zoom: action.zoom }
      break
  default:
    return state
  }
}
