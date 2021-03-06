import Vector from '../geometry/vector'

import {
  UPDATE_BODIES,
} from './types'

import {
  ATTRACTION_INVERSE_SQUARED,
  ATTRACTION_INVERSE_LINEAR,
  ATTRACTION_CONSTANT,
  ATTRACTION_LINEAR,
  ATTRACTION_SQUARED,
  ATTRACTION_NONE,
} from '../constants'

const G = 6.67308e-11


export function update(dMs) {
  return (dispatch, getState) => {
    let {
      bodies,
      screen: { dragging },
      options: { paused, falloff, radiiScale, bounceBodies, bounceScreen },
    } = getState()

    // make new body container
    bodies = { ...bodies }

    for (let bodyKey in bodies) {
      // make new body objects
      let body = { ...bodies[bodyKey] }
      // move body
      if (dragging !== bodyKey && !paused) {
        body.position = body.position.add(body.velocity.scale(dMs))
      }
      // clear forces
      body.forces = {}
      // put body back into bodies
      bodies[bodyKey] = body
    }

    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]
      if (!body.active) continue

      // calculate forces  O(n^2) :(
      for (let otherBodyKey in bodies) {
        let otherBody = bodies[otherBodyKey]
        if (!otherBody.active) continue

        if (body !== otherBody && !body.forces[otherBodyKey]) {
          let distanceSquared = body.position.distanceToSquared(otherBody.position)
          let angle = otherBody.position.subtract(body.position).angle()

          if (falloff !== ATTRACTION_NONE) {
            let force
            switch (falloff) {
              case ATTRACTION_INVERSE_SQUARED:
                // f = G((m1*m2)/r^2)
                force = G * (body.mass * otherBody.mass) / distanceSquared
                break
              case ATTRACTION_INVERSE_LINEAR:
                force = G * (body.mass * otherBody.mass) / (Math.sqrt(distanceSquared)*4e7)
                break
              case ATTRACTION_CONSTANT:
                force = G * (body.mass * otherBody.mass) / 8e14
                break
              case ATTRACTION_LINEAR:
                force = G * (body.mass * otherBody.mass) * (Math.sqrt(distanceSquared)/16e21)
                break
              case ATTRACTION_SQUARED:
                force = G * (body.mass * otherBody.mass) * (distanceSquared/32e28)
                break
            }
            body.forces[otherBodyKey] = Vector.fromPolar(angle,           force)
            otherBody.forces[bodyKey] = Vector.fromPolar(angle + Math.PI, force)
          }

          // bounce
          if (bounceBodies && !paused) {
            // bounce off planets
            let overlap = (body.radius * radiiScale + otherBody.radius * radiiScale) - Math.sqrt(distanceSquared)
            if (overlap > 0 && Math.abs(otherBody.velocity.subtract(body.velocity).angle() - angle) > Math.PI / 2) {
              let x1 = body.position
              let x2 = otherBody.position
              let v1 = body.velocity
              let v2 = otherBody.velocity
              let m1 = body.mass
              let m2 = otherBody.mass
              let x1sx2 = x1.subtract(x2)
              let x2sx1 = x2.subtract(x1)
              // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects
              let bodyVelocity      = v1.subtract(x1sx2.scale((2*m2 / (m1+m2)) * (v1.subtract(v2).dot(x1sx2) / x1sx2.lengthSquared())))
              let otherBodyVelocity = v2.subtract(x2sx1.scale((2*m1 / (m1+m2)) * (v2.subtract(v1).dot(x2sx1) / x2sx1.lengthSquared())))

              if (dragging === bodyKey)
                otherBody.velocity = otherBodyVelocity.sub(bodyVelocity)
              else if (dragging === otherBodyKey)
                body.velocity = bodyVelocity.sub(otherBodyVelocity)
              else {
                body.velocity = bodyVelocity
                otherBody.velocity = otherBodyVelocity
              }

              body.skipAcceleration = true
              otherBody.skipAcceleration = true
            }
          }

          if (bodyKey === 'sun') {
            otherBody.shadowAngle = angle + Math.PI
          }
          if (otherBodyKey === 'sun') {
            body.shadowAngle = angle
          }
        }
      }

      // sum forces
      body.force = Vector.zero()
      for (let forceKey in body.forces) {
        body.force = body.force.add(body.forces[forceKey])
      }

      if (dragging !== bodyKey) {
        if (bounceScreen) {
          // bounce off window
          let viewport = { ...getState().screen.viewport }
          let oldVelocity = body.velocity
          if (body.position.x + body.radius * radiiScale > viewport.max.x) {
            body.velocity = new Vector(-Math.abs(body.velocity.x), body.velocity.y)
            //body.position = new Vector(viewport.max.x - body.radius, body.position.y)
          }
          if (body.position.x - body.radius * radiiScale < viewport.min.x) {
            body.velocity = new Vector(Math.abs(body.velocity.x), body.velocity.y)
            //body.position = new Vector(viewport.min.x + body.radius, body.position.y)
          }
          if (body.position.y + body.radius * radiiScale > viewport.max.y) {
            body.velocity = new Vector(body.velocity.x, -Math.abs(body.velocity.y))
            //body.position = new Vector(body.position.x, viewport.max.y - body.radius)
          }
          if (body.position.y - body.radius * radiiScale < viewport.min.y) {
            body.velocity = new Vector(body.velocity.x, Math.abs(body.velocity.y))
            //body.position = new Vector(body.position.x, viewport.min.y + body.radius)
          }
          if (!body.velocity.equals(oldVelocity)) body.skipAcceleration = true
        }

        if (!body.skipAcceleration && !paused) {
          // F = ma  or  a = F/m  or  a = F(1/m)
          let acceleration = body.force.scale(1 / body.mass)
          // v = v0 + at
          body.velocity = body.velocity.add(acceleration.scale(dMs))
        } else {
          body.skipAcceleration = undefined
        }
      }
    }

    dispatch({
      type: UPDATE_BODIES,
      bodies,
    })
  }
}
