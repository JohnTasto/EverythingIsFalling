import { combineReducers } from 'redux'

import bodies from './bodies-r'
import windowSize from './window-r'


const rootReducer = combineReducers({
  window: windowSize,
  bodies
})

export default rootReducer
