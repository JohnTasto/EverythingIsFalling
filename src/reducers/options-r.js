import {
  SET_SPEED,
  SET_RADII_SCALE,
} from '../actions/types'

const INITIAL_STATE = {
  speed: 1,
  radiiScale: 1,
}

export default function(options = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SPEED:
      return { ...options, speed: action.speed }
    case SET_RADII_SCALE:
      return { ...options, radiiScale: action.radiiScale }
  default:
    return options
  }
}
