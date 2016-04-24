import {
  GET_BODY_IMAGE,
  GET_RING_IMAGE,
  UPDATE_BODIES
} from '../actions/types'

import bodyTemplates from '../body-templates.json'


const INITIAL_STATE = {
  templates: bodyTemplates,
  sim: []
}

export default function(bodies = INITIAL_STATE, action) {
  let newBodies
  switch (action.type) {
    case GET_BODY_IMAGE:
      newBodies = { ...bodies }
      newBodies.templates[action.payload.body].bodyImage = action.payload.bodyImage
      return newBodies
    case GET_RING_IMAGE:
      newBodies = { ...bodies }
      newBodies.templates[action.payload.body].ringImage = action.payload.ringImage
      return newBodies
    case UPDATE_BODIES:
      newBodies = { ...bodies }
      return newBodies
    default:
      return bodies
  }
}
