import templates from '../body-templates.json'


function getTemplates() {

  let shadowImage = new Image()
  shadowImage.src = 'img/shadow.png'

  for (let body in templates) {
    templates[body].shadowImage = shadowImage
    templates[body].bodyImage = new Image()
    templates[body].bodyImage.src = `img/${body}.png`
    if (templates[body].rings) {
      templates[body].ringImage = new Image()
      templates[body].ringImage.src = `img/${body}-rings.png`
    }
  }

  return templates
}

export default function(templates = getTemplates(), action) {
  return templates
}
