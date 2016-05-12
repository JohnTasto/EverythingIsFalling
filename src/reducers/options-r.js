import {
  SET_SPEED,
  SET_FALLOFF,
  SET_RADII_SCALE,
} from '../actions/types'

import {
  ATTRACTION_INVERSE_SQUARED,
} from '../constants'

const INITIAL_STATE = {
  speed: 1,
  falloff: ATTRACTION_INVERSE_SQUARED,
  radiiScale: 1,
}

export default function(options = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SPEED:
      return { ...options, speed: action.speed }
    case SET_FALLOFF:
      return { ...options, falloff: action.falloff }
    case SET_RADII_SCALE:
      return { ...options, radiiScale: action.radiiScale }
  default:
    return options
  }
}
