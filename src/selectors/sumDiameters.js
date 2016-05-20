import { createSelector } from 'reselect'

const bodiesSelector = state => state.bodies
const radiiScaleSelector = state => state.options.radiiScale

export default createSelector(
  bodiesSelector,
  radiiScaleSelector,
  (bodies, radiiScale) => {
    let sum = 0
    for (let bodyKey in bodies) {
      sum += bodies[bodyKey].radius * radiiScale * 2
    }
    return sum
  }
)
