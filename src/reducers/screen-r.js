import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW_START,
  PAN_WINDOW,
} from '../actions/types'

const INITIAL_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  minX: -window.innerWidth * 2500000,
  minY: -window.innerHeight * 2500000,
  maxX: window.innerWidth * 2500000,
  maxY: window.innerHeight * 2500000,
  zoom: 1 / 5000000,
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...state, ...action.size, ...action.dimensions, zoom: action.zoom }
    case ZOOM_WINDOW:
      return { ...state, ...action.dimensions, zoom: action.zoom }
    case PAN_WINDOW_START:
      return { ...state, panStartX: action.panStartX, panStartY: action.panStartY }
    case PAN_WINDOW:
      return { ...state, ...action.dimensions }
  default:
    return state
  }
}
