import {
  SET_SPEED,
  SET_PAUSE,
  SET_PAUSE_HOVER,
  SET_FALLOFF,
  SET_RADII_SCALE,
  SET_BOUNCE_BODIES,
  SET_BOUNCE_SCREEN,
  SET_SHOW_VECTORS,
} from './types'


export function speed(speed) {
  return {
    type: SET_SPEED,
    speed,
  }
}

export function pause(paused) {
  return {
    type: SET_PAUSE,
    paused,
  }
}

export function pauseHover(pauseHover) {
  return {
    type: SET_PAUSE_HOVER,
    pauseHover,
  }
}

export function falloff(falloff) {
  return {
    type: SET_FALLOFF,
    falloff,
  }
}

export function radiiScale(radiiScale) {
  return {
    type: SET_RADII_SCALE,
    radiiScale,
  }
}

export function bounceBodies(bounceBodies) {
  return {
    type: SET_BOUNCE_BODIES,
    bounceBodies,
  }
}

export function bounceScreen(bounceScreen) {
  return {
    type: SET_BOUNCE_SCREEN,
    bounceScreen,
  }
}

export function showVectors(showVectors) {
  return {
    type: SET_SHOW_VECTORS,
    showVectors,
  }
}
