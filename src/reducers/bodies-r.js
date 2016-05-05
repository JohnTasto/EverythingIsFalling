import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
  UPDATE_BODIES,
  DRAG_BODY,
} from '../actions/types'


export default function(bodies = {}, action) {
  let newBodies
  switch (action.type) {
    case REPLACE_BODIES:
      return { ...action.bodies }
    case UPDATE_BODIES:
      return { ...bodies, ...action.bodies }
    case DRAG_BODY:
      if (action.body) {
        let velocity = action.position.sub(bodies[action.body].position)
        return {
          ...bodies,
          [action.body]: {
            ...bodies[action.body],
            position: action.position,
            velocity,
          }
        }
      }
    default:
      return bodies
  }
}
