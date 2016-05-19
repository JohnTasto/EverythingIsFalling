import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
  ADD_BODY,
  UPDATE_BODIES,
  PLACE_BODY,
  MOVE_BODY,
  DRAG_BODY,
  ACTIVATE_BODY,
} from '../actions/types'


export default function(bodies = {}, action) {
  let newBodies, position, velocity
  switch (action.type) {
    case REPLACE_BODIES:
      return { ...action.bodies }
    case ADD_BODY:
      return { ...bodies, ...action.body }
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
      position = bodies[action.bodyKey].position.sub(action.offset)
      return {
        ...bodies,
        [action.bodyKey]: {
          ...bodies[action.bodyKey],
          position,
        }
      }
    case DRAG_BODY:
      if (action.bodyKey) {
        position = bodies[action.bodyKey].position.sub(action.offset)
        velocity = position.sub(bodies[action.bodyKey].position).scale(.01)
        return {
          ...bodies,
          [action.bodyKey]: {
            ...bodies[action.bodyKey],
            position,
            velocity,
          }
        }
      }
      return bodies
    case ACTIVATE_BODY:
      return {
        ...bodies,
        [action.bodyKey]: {
          ...bodies[action.bodyKey],
          active: true,
        }
      }
    default:
      return bodies
  }
}
