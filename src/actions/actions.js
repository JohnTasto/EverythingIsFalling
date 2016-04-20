import { RESIZE_WINDOW } from './types'

export function resizeWindow(width, height) {
  return {
    type: RESIZE_WINDOW,
    payload: { width, height }
  }
}
