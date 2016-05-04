import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
} from './types'


export function init() {
  return (dispatch, getState) => {
    let templates = getState().templates
    let bodies = {
      // sun: Object.assign({}, templates['sun'], {
      //   position: new Vector(-1e9, -1e9),
      //   velocity: new Vector(0, 0)
      // }),
      mercury: Object.assign({}, templates['mercury'], {
        position: new Vector(9e7, 6e7),
        velocity: new Vector(0, 0)
      }),
      venus: Object.assign({}, templates['venus'], {
        position: new Vector(1.1e8, 8e7),
        velocity: new Vector(0, 0)
      }),
      earth: Object.assign({}, templates['earth'], {
        position: new Vector(7e7, 8e7),
        velocity: new Vector(0, 0)
      }),
      mars: Object.assign({}, templates['mars'], {
        position: new Vector(1e8, 1e8),
        velocity: new Vector(0, 0)
      }),
      // jupiter: Object.assign({}, templates['jupiter'], {
      //   position: new Vector(-1e8, -1e8),
      //   velocity: new Vector(0, 0)
      // }),
      // saturn: Object.assign({}, templates['saturn'], {
      //   position: new Vector(2e8, 2e8),
      //   velocity: new Vector(0, 0)
      // }),
      // uranus: Object.assign({}, templates['uranus'], {
      //   position: new Vector(-1e8, 2e8),
      //   velocity: new Vector(0, 0)
      // }),
      // neptune: Object.assign({}, templates['neptune'], {
      //   position: new Vector(2e8, -1e8),
      //   velocity: new Vector(0, 0)
      // }),
    }
    dispatch({
      type: REPLACE_BODIES,
      bodies,
    })
  }
}
