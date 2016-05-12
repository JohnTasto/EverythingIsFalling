import {
  SET_SPEED,
  SET_PAUSE,
  SET_PAUSE_HOVER,
  SET_FALLOFF,
  SET_RADII_SCALE,
  SET_BOUNCE_BODIES,
  SET_BOUNCE_SCREEN,
} from '../actions/types'

import {
  ATTRACTION_INVERSE_SQUARED,
} from '../constants'

const INITIAL_STATE = {
  speed: 1,
  pause: false,
  pauseHover: false,
  falloff: ATTRACTION_INVERSE_SQUARED,
  radiiScale: 1,
  bounceBodies: true,
  bounceScreen: true,
}

export default function(options = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SPEED:
      return { ...options, speed: action.speed }
    case SET_PAUSE:
      return { ...options, paused: action.paused }
    case SET_PAUSE_HOVER:
      return { ...options, pauseHover: action.pauseHover }
    case SET_FALLOFF:
      return { ...options, falloff: action.falloff }
    case SET_RADII_SCALE:
      return { ...options, radiiScale: action.radiiScale }
    case SET_BOUNCE_BODIES:
      return { ...options, bounceBodies: action.bounceBodies }
    case SET_BOUNCE_SCREEN:
      return { ...options, bounceScreen: action.bounceScreen }
  default:
    return options
  }
}
