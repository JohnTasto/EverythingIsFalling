import Vector from '../geometry/vector'

import {
  UPDATE_BODIES
} from './types'

const G = 6.67308e-11


export function update(dMs, bodies) {
  bodies = { ...bodies }

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
        body.forces[otherBodyKey] = Vector.fromPolar(angle, force)
        otherBody.forces[bodyKey] = Vector.fromPolar(angle + Math.PI, force)
      }
    }

    // sum forces
    body.force = new Vector(0, 0)
    for (let forceKey in body.forces) {
      body.force = body.force.add(body.forces[forceKey])
    }

    // F = ma  or  a = F/m  or  a = F(1/m)
    let acceleration = body.force.scale(1 / body.mass)

    // v = v0 + at
    body.velocity = body.velocity.add(acceleration.scale(dMs))

    body.position = body.position.add(body.velocity)
  }

  return {
    type: UPDATE_BODIES,
    bodies
  }
}
