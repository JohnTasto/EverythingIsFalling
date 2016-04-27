import {
  UPDATE_POSITION
} from './types'


export function update(dMs) {
  return (dispatch, getState) => {
    let bodies = getState().bodies.sim
    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      dispatch({
        type: UPDATE_POSITION,
        body: bodyKey,
        position: body.position.clone().add(body.velocity)
      })
    }
  }
}
