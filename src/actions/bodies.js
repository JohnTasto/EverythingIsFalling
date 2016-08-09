import Vector from '../geometry/vector'

import * as view from './view'
import sumDiameters from '../selectors/sumDiameters'

import {
  UPDATE_BODIES,
  REPLACE_BODIES,
  ADD_BODY,
} from './types'


export function init() {
  return (dispatch, getState) => {
    let templates = getState().templates
    dispatch({
      type: REPLACE_BODIES,
      bodies: {
        mercury: {
          ...templates['mercury'],
          position: new Vector(0e7, -2e7),
          velocity: Vector.zero(),
          active: true,
        },
        venus: {
          ...templates['venus'],
          position: new Vector(2e7, 0e7),
          velocity: Vector.zero(),
          active: true,
        },
        earth: {
          ...templates['earth'],
          position: new Vector(-2e7, 0e7),
          velocity: Vector.zero(),
          active: true,
        },
        mars: {
          ...templates['mars'],
          position: new Vector(1e7, 2e7),
          velocity: Vector.zero(),
          active: true,
        },
      },
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
        },
      },
    })
    dispatch(view.zoomMinSize(sumDiameters(getState())))
  }
}

export function deoverlap() {
  return (dispatch, getState) => {
    let { bodies, options: { radiiScale } } = getState()

    // clone bodies
    bodies = { ...bodies }
    for (let bodyKey in bodies) {
      bodies[bodyKey] = { ...bodies[bodyKey] }
    }

    let overlapped = true

    while (overlapped) {
      overlapped = false

      let deoverlapped = {}
      for (let bodyKey in bodies) {
        deoverlapped[bodyKey] = {}
      }

      for (let bodyKey in bodies) {
        let body = bodies[bodyKey]
        if (!body.active) continue

        for (let otherBodyKey in bodies) {
          let otherBody = bodies[otherBodyKey]
          if (!otherBody.active) continue

          if (body !== otherBody && !deoverlapped[bodyKey][otherBodyKey]) {
            deoverlapped[bodyKey][otherBodyKey] = true
            deoverlapped[otherBodyKey][bodyKey] = true
            let distance = body.position.distanceTo(otherBody.position)
            let angle = otherBody.position.subtract(body.position).angle()
            let overlap = (body.radius*radiiScale + otherBody.radius*radiiScale) - distance
            if (overlap > 0) {
              overlapped = true
              body.position = body.position.add(Vector.fromPolar(
                angle + Math.PI,
                overlap * (otherBody.mass / (body.mass + otherBody.mass)) + 1
              ))
              otherBody.position = otherBody.position.add(Vector.fromPolar(
                angle,
                overlap * (body.mass / (body.mass + otherBody.mass)) + 1
              ))
            }
          }
        }
      }
    }

    dispatch({
      type: UPDATE_BODIES,
      bodies,
    })
  }
}
