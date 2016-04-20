import { RESIZE_WINDOW } from './types'

function resizeWindow(width, height) {
  return {
    type: RESIZE_WINDOW,
    payload: { width, height }
  }
}
