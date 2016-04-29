import Vector from '../geometry/vector'

import {
  UPDATE_BODIES
} from './types'

const G = 6.67308e-11


export function update(dMs) {
  let bounce = true

  return (dispatch, getState) => {
    let bodies = { ...getState().bodies.sim }

    // clear forces
    for (let bodyKey in bodies) {
      bodies[bodyKey].forces = {}
    }

    for (let bodyKey in bodies) {
      let body = bodies[bodyKey]

      // calculate forces  O(n^2) :(
      for (let otherBodyKey in bodies) {
        let otherBody = bodies[otherBodyKey]
        if (body !== otherBody && !body.forces[otherBodyKey]) {
          let distanceSquared = body.position.distanceToSquared(otherBody.position)
          // f = G((m1*m2)/r^2)
          let force = G * (body.mass * otherBody.mass) / distanceSquared
          let angle = otherBody.position.subtract(body.position).angle()
          body.forces[otherBodyKey] = Vector.fromPolar(angle,           force)
          otherBody.forces[bodyKey] = Vector.fromPolar(angle + Math.PI, force)

          // bounce
          if (bounce) {
            // bounce off planets
            let overlap = (body.radius + otherBody.radius) - Math.sqrt(distanceSquared)
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
              body.velocity      = v1.subtract(x1sx2.scale((2*m2 / (m1+m2)) * (v1.subtract(v2).dot(x1sx2) / x1sx2.lengthSquared())))
              otherBody.velocity = v2.subtract(x2sx1.scale((2*m1 / (m1+m2)) * (v2.subtract(v1).dot(x2sx1) / x2sx1.lengthSquared())))

              // de-overlap bodies
              // large velocity loss
              // body.position =      x1.add(Vector.fromPolar(angle + Math.PI, overlap * (body.radius/(body.radius + otherBody.radius))))
              // otherBody.position = x2.add(Vector.fromPolar(angle, overlap * (otherBody.radius/(body.radius + otherBody.radius))))

              // skip adding gravitational forces, replacing this update
              // no velocity loss
              body.bounced = true
              otherBody.bounced = true

              // add velocity seperately, as though this were an extra update
              // small velocity loss
              // body.position = body.position.add(body.velocity)
              // otherBody.position = otherBody.position.add(otherBody.velocity)
            }
          }
        }
      }

      if (bounce) {
        // bounce off window
        let screen = { ...getState().screen }
        if (body.position.x + body.radius > screen.maxX) {
          body.velocity = new Vector(-Math.abs(body.velocity.x), body.velocity.y)
          //body.position = new Vector(screen.maxX - body.radius, body.position.y)
        }
        if (body.position.x - body.radius < screen.minX) {
          body.velocity = new Vector(Math.abs(body.velocity.x), body.velocity.y)
          //body.position = new Vector(screen.minX + body.radius, body.position.y)
        }
        if (body.position.y + body.radius > screen.maxY) {
          body.velocity = new Vector(body.velocity.x, -Math.abs(body.velocity.y))
          //body.position = new Vector(body.position.x, screen.maxY - body.radius)
        }
        if (body.position.y - body.radius < screen.minY) {
          body.velocity = new Vector(body.velocity.x, Math.abs(body.velocity.y))
          //body.position = new Vector(body.position.x, screen.minY + body.radius)
        }
      }

      // sum forces
      body.force = new Vector(0, 0)
      for (let forceKey in body.forces) {
        body.force = body.force.add(body.forces[forceKey])
      }

      if (!body.bounced) {

        // F = ma  or  a = F/m  or  a = F(1/m)
        let acceleration = body.force.scale(1 / body.mass)

        // v = v0 + at
        body.velocity = body.velocity.add(acceleration.scale(dMs))

      } else {
        body.bounced = false
      }

      body.position = body.position.add(body.velocity)
    }

    dispatch({
      type: UPDATE_BODIES,
      bodies
    })
  }
}
