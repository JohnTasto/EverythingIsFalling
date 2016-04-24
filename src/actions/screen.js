import {
  RESIZE_WINDOW
} from './types'

export function resize(width, height) {
  return {
    type: RESIZE_WINDOW,
    payload: { width, height }
  }
}
