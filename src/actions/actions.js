import {
  RESIZE_WINDOW,
  GET_BODY_IMAGE
} from './types'

import bodyTemplates from '../body-templates.json'


export function getBodies() {
  return function(dispatch, getState) {
    for (let b in bodyTemplates) {
      let body = b
      let image = new Image()
      image.src = `/img/${body}.png`
      image.onload = function () {
        dispatch({
          type: GET_BODY_IMAGE,
          payload: { body, image }
        })
      }
    }
  }
}

export function resizeWindow(width, height) {
  return {
    type: RESIZE_WINDOW,
    payload: { width, height }
  }
}
