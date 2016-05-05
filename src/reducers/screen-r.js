import Vector from '../geometry/vector'
import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  HOVER_BODY,
  DRAG_BODY,
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
  },
  selected: undefined,
  dragging: undefined,
}

export default function(screen = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...screen, screen: action.screen, viewport: action.viewport }
    case ZOOM_WINDOW:
      return { ...screen, viewport: action.viewport }
    case PAN_WINDOW:
      return { ...screen, viewport: { ...screen.viewport, min: action.min, max: action.max } }
    case SELECT_BODY:
      return { ...screen, selected: action.body }
    case HOVER_BODY:
      return { ...screen, hovered: action.body }
    case DRAG_BODY:
      return { ...screen, dragging: action.body }
  default:
    return screen
  }
}
