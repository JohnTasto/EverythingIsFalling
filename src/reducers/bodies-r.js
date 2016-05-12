import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
  UPDATE_BODIES,
  PLACE_BODY,
  MOVE_BODY,
  DRAG_BODY,
} from '../actions/types'


export default function(bodies = {}, action) {
  let newBodies
  switch (action.type) {
    case REPLACE_BODIES:
      return { ...action.bodies }
    case UPDATE_BODIES:
      return { ...bodies, ...action.bodies }
    case PLACE_BODY:
      return {
        ...bodies,
        [action.bodyKey]: {
          ...bodies[action.bodyKey],
          position: action.position,
        }
      }
    case MOVE_BODY:
      let position = bodies[action.bodyKey].position.sub(action.offset)
      return {
        ...bodies,
        [action.bodyKey]: {
          ...bodies[action.bodyKey],
          position,
        }
      }
    case DRAG_BODY:
      if (action.bodyKey) {
        let position = bodies[action.bodyKey].position.sub(action.offset)
        let velocity = position.sub(bodies[action.bodyKey].position).scale(.01)
        return {
          ...bodies,
          [action.bodyKey]: {
            ...bodies[action.bodyKey],
            position,
            velocity,
          }
        }
      }
    default:
      return bodies
  }
}
