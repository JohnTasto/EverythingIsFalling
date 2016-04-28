import {
  RESIZE_WINDOW,
  ZOOM_WINDOW
} from '../actions/types'

const INITIAL_STATE = {
  width: window.innerWidth,
  height: window.innerHeight,
  zoom: .000005
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...state, ...action.size }
      break
    case ZOOM_WINDOW:
      return { ...state, zoom: action.zoom }
      break
  default:
    return state
  }
}
