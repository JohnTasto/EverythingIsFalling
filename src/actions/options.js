import {
  SET_SPEED,
  SET_FALLOFF,
  SET_RADII_SCALE,
  SET_BOUNCE_BODIES,
  SET_BOUNCE_SCREEN,
} from './types'


export function speed(s) {
  return {
    type: SET_SPEED,
    speed: s,
  }
}

export function falloff(f) {
  return {
    type: SET_FALLOFF,
    falloff: f,
  }
}

export function radiiScale(scale) {
  return {
    type: SET_RADII_SCALE,
    radiiScale: scale,
  }
}

export function bounceBodies(b) {
  return {
    type: SET_BOUNCE_BODIES,
    bounceBodies: b,
  }
}

export function bounceScreen(b) {
  return {
    type: SET_BOUNCE_SCREEN,
    bounceScreen: b,
  }
}
