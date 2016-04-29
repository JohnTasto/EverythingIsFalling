import Vector from '../geometry/vector'

import {
  UPDATE_BODIES
} from '../actions/types'

import templates from '../body-templates.json'


function getInitialState() {

  let shadowImage = new Image()
  shadowImage.src = '/img/shadow.png'

  for (let body in templates) {
    templates[body].shadowImage = shadowImage
    templates[body].bodyImage = new Image()
    templates[body].bodyImage.src = `/img/${body}.png`
    if (templates[body].rings) {
      templates[body].ringImage = new Image()
      templates[body].ringImage.src = `/img/${body}-rings.png`
    }
  }

  let sim = {
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

  return {
    templates,
    sim
  }
}

export default function(bodies = getInitialState(), action) {
  let newBodies
  switch (action.type) {
    case UPDATE_BODIES:
      //  newBodies = { ...bodies }
      //  newBodies.sim[action.body].position = action.position
      //  return newBodies
      //return { ...bodies, sim: { ...bodies.sim, [action.body]: { ...bodies.sim[action.body], position: action.position }}}
      return { templates: bodies.templates, sim: action.bodies }
    default:
      return bodies
  }
}
