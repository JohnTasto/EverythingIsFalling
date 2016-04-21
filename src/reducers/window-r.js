import { RESIZE_WINDOW } from '../actions/types'

const INITIAL_STATE = {
  width: window.innerWidth,
  height: window.innerHeight
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case RESIZE_WINDOW:
    return action.payload
  default:
    return state
  }
}
