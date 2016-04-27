import Victor from 'victor'

import {
  UPDATE_POSITION
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
    mercury: Object.assign({}, templates['mercury'], {
      position: new Victor(200, 100),
      velocity: new Victor(1, 0)
    }),
    venus: Object.assign({}, templates['venus'], {
      position: new Victor(300, 200),
      velocity: new Victor(0, 2)
    }),
    earth: Object.assign({}, templates['earth'], {
      position: new Victor(100, 300),
      velocity: new Victor(1, -1)
    }),
    saturn: Object.assign({}, templates['saturn'], {
      position: new Victor(400, 300),
      velocity: new Victor(-1, 1)
    })
  }

  return {
    templates,
    sim
  }
}

export default function(bodies = getInitialState(), action) {
  let newBodies
  switch (action.type) {
    case UPDATE_POSITION:
      //  newBodies = { ...bodies }
      //  newBodies.sim[action.body].position = action.position
      //  return newBodies
      return { ...bodies, sim: { ...bodies.sim, [action.body]: { ...bodies.sim[action.body], position: action.position }}}
    default:
      return bodies
  }
}
