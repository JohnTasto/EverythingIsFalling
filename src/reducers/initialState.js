import Vector from '../geometry/vector'

import {
  ATTRACTION_INVERSE_SQUARED,
} from '../constants'

import templates from '../body-templates.json'


function getTemplates() {

  let shadowImage = new Image()
  shadowImage.src = require('../img/shadow.png')

  for (let body in templates) {
    templates[body].shadowImage = shadowImage
    templates[body].bodyImage = new Image()
    templates[body].bodyImage.src = require(`../img/${body}.png`)
    if (templates[body].rings) {
      templates[body].ringImage = new Image()
      templates[body].ringImage.src = require(`../img/${body}-rings.png`)
    }
  }

  return templates
}


export default {
  screen: {
    screen: {
      size: new Vector (window.innerWidth, window.innerHeight),
    },
    viewport: {
      min: new Vector(-window.innerWidth * 100000, -window.innerHeight * 100000),
      max: new Vector( window.innerWidth * 100000,  window.innerHeight * 100000),
      size: new Vector(window.innerWidth * 200000,  window.innerHeight * 200000),
      zoom: 1 / 200000,
    },
    selected: undefined,
    hovering: undefined,
    dragging: undefined,
  },
  templates: getTemplates(),
  bodies: {},
  options: {
    speed: 1,
    pause: false,
    pauseHover: false,
    falloff: ATTRACTION_INVERSE_SQUARED,
    radiiScale: 1,
    bounceBodies: true,
    bounceScreen: true,
    showVectors: false,
  },
}
