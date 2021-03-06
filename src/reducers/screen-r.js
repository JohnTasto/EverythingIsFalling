import initialState from './initialState'

import {
  RESIZE_WINDOW,
  ZOOM_WINDOW,
  PAN_WINDOW,
  SELECT_BODY,
  HOVER_BODY,
  DRAG_BODY,
  MOVE_BODY,
} from '../actions/types'


export default function(screen = initialState.screen, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
      return { ...screen, screen: action.screen, viewport: action.viewport }
    case ZOOM_WINDOW:
      return { ...screen, viewport: action.viewport }
    case PAN_WINDOW:
      return { ...screen, viewport: { ...screen.viewport, min: action.min, max: action.max } }
    case SELECT_BODY:
      return { ...screen, selected: action.bodyKey }
    case HOVER_BODY:
      return { ...screen, hovering: action.bodyKey }
    case DRAG_BODY:
    case MOVE_BODY:
      return { ...screen, dragging: action.bodyKey }
  default:
    return screen
  }
}
