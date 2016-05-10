import {
  SET_SPEED,
} from './types'


export function speed(s) {
  return {
    type: SET_SPEED,
    speed: s,
  }
}
