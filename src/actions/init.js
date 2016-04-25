import {
  GET_SHADOW_IMAGE,
  GET_BODY_IMAGE,
  GET_RING_IMAGE
} from './types'

import bodyTemplates from '../body-templates.json'


export function getImages() {
  return function(dispatch, getState) {
    let shadowImage = new Image()
    shadowImage.src = '/img/shadow.png'
    shadowImage.onload = function () {
      dispatch({
        type: GET_SHADOW_IMAGE,
        payload: { shadowImage }
      })
    }
    for (let b in bodyTemplates) {
      let body = b
      let bodyImage = new Image()
      bodyImage.src = `/img/${body}.png`
      bodyImage.onload = function () {
        dispatch({
          type: GET_BODY_IMAGE,
          payload: { body, bodyImage }
        })
      }
      if (bodyTemplates[body].rings) {
        let ringImage = new Image()
        ringImage.src = `/img/${body}-rings.png`
        ringImage.onload = function () {
          dispatch({
            type: GET_RING_IMAGE,
            payload: { body, ringImage }
          })
        }
      }
    }
  }
}
