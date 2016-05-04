import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
  UPDATE_BODIES,
} from '../actions/types'


export default function(bodies = {}, action) {
  let newBodies
  switch (action.type) {
    case REPLACE_BODIES:
      return { ...action.bodies }
    case UPDATE_BODIES:
      //  newBodies = { ...bodies }
      //  newBodies.sim[action.body].position = action.position
      //  return newBodies
      //return { ...bodies, sim: { ...bodies.sim, [action.body]: { ...bodies.sim[action.body], position: action.position }}}
      return { ...bodies, ...action.bodies }
    default:
      return bodies
  }
}
