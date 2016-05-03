import Vector from '../geometry/vector'
import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW_START,
  PAN_WINDOW,
} from '../actions/types'

const INITIAL_STATE = {
  screen: {
    size: new Vector (window.innerWidth, window.innerHeight),
  },
  viewport: {
    min: new Vector(-window.innerWidth * 2500000, -window.innerHeight * 2500000),
    max: new Vector( window.innerWidth * 2500000,  window.innerHeight * 2500000),
    size: new Vector( window.innerWidth * 5000000,  window.innerHeight * 5000000),
    zoom: 1 / 5000000,
  }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...state, screen: action.screen, viewport: action.viewport }
    case ZOOM_WINDOW:
      return { ...state, viewport: action.viewport }
    case PAN_WINDOW_START:
      return { ...state, panStart: action.panStart }
    case PAN_WINDOW:
      return { ...state, viewport: { ...state.viewport, min: action.min, max: action.max } }
  default:
    return state
  }
}
