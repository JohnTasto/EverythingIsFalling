import {
  UPDATE_BODIES
} from '../actions/types'

import bodyTemplates from '../body-templates.json'


function getInitialState() {
  let shadowImage = new Image()
  shadowImage.src = '/img/shadow.png'
  for (let b in bodyTemplates) {
    let body = b
    bodyTemplates[body].shadowImage = shadowImage
    bodyTemplates[body].bodyImage = new Image()
    bodyTemplates[body].bodyImage.src = `/img/${body}.png`
    if (bodyTemplates[body].rings) {
      bodyTemplates[body].ringImage = new Image()
      bodyTemplates[body].ringImage.src = `/img/${body}-rings.png`
    }
  }
  return {
    templates: bodyTemplates,
    sim: []
  }
}

export default function(bodies = getInitialState(), action) {
  let newBodies
  switch (action.type) {
    case UPDATE_BODIES:
      newBodies = { ...bodies }
      return newBodies
    default:
      return bodies
  }
}
