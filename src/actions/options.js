import {
  SET_SPEED,
  SET_FALLOFF,
  SET_RADII_SCALE,
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
