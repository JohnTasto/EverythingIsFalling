import { combineReducers } from 'redux'

import bodies from './bodies-r'
import templates from './templates-r'
import screen from './screen-r'
import options from './options-r'


const rootReducer = combineReducers({
  screen,
  templates,
  bodies,
  options,
})

export default rootReducer
