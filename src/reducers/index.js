import { combineReducers } from 'redux'

import bodies from './bodies-r'
import screen from './screen-r'


const rootReducer = combineReducers({
  screen,
  bodies
})

export default rootReducer
