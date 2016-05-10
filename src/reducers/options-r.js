import {
  SET_SPEED,
} from '../actions/types'

const INITIAL_STATE = {
  speed: 1,
}

export default function(options = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SPEED:
      return { ...options, speed: action.speed }
  default:
    return options
  }
}
