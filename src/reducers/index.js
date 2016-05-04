import { combineReducers } from 'redux'

import bodies from './bodies-r'
import templates from './templates-r'
import screen from './screen-r'


const rootReducer = combineReducers({
  screen,
  templates,
  bodies,
})

export default rootReducer
