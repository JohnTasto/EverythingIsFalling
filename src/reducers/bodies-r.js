import {
  GET_BODY_IMAGE
} from '../actions/types'

import bodyTemplates from '../body-templates.json'


const INITIAL_STATE = {
  templates: bodyTemplates,
  sim: []
}


export default function(bodies = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_BODY_IMAGE:
      let newBodies = Object.assign({}, bodies)
      newBodies[action.payload.body] = action.payload.image
      return newBodies
  default:
    return bodies
  }
}
