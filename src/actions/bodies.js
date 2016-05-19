import Vector from '../geometry/vector'

import {
  REPLACE_BODIES,
  ADD_BODY,
} from './types'


export function init() {
  return (dispatch, getState) => {
    let templates = getState().templates
    dispatch({
      type: REPLACE_BODIES,
      bodies: {
        // sun: {
        //   ...templates['sun'],
        //   position: new Vector(-1e9, -1e9),
        //   velocity: Vector.zero(),
        //   active: true,
        // },
        mercury: {
          ...templates['mercury'],
          position: new Vector(9e7, 6e7),
          velocity: Vector.zero(),
          active: true,
        },
        venus: {
          ...templates['venus'],
          position: new Vector(1.1e8, 8e7),
          velocity: Vector.zero(),
          active: true,
        },
        earth: {
          ...templates['earth'],
          position: new Vector(7e7, 8e7),
          velocity: Vector.zero(),
          active: true,
        },
        mars: {
          ...templates['mars'],
          position: new Vector(1e8, 1e8),
          velocity: Vector.zero(),
          active: true,
        },
        // jupiter: {
        //   ...templates['jupiter'],
        //   position: new Vector(-1e8, -1e8),
        //   velocity: Vector.zero(),
        //   active: true,
        // },
        // saturn: {
        //   ...templates['saturn'],
        //   position: new Vector(2e8, 2e8),
        //   velocity: Vector.zero(),
        //   active: true,
        // },
        // uranus: {
        //   ...templates['uranus'],
        //   position: new Vector(-1e8, 2e8),
        //   velocity: Vector.zero(),
        //   active: true,
        // },
        // neptune: {
        //   ...templates['neptune'],
        //   position: new Vector(2e8, -1e8),
        //   velocity: Vector.zero(),
        //   active: true,
        // },
      }
    })
  }
}

export function addBody(template) {
  return (dispatch, getState) => {
    let viewport = getState().screen.viewport
    dispatch({
      type: ADD_BODY,
      body: {
        [template.name]: {
          ...template,
          position: viewport.min.add(viewport.size.scale(0.5)),
          velocity: Vector.zero(),
          active: false,
        }
      },
    })
  }
}
