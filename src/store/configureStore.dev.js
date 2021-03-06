// This file merely configures the store for hot reloading.
// This boilerplate file is likely to be the same for each project that uses Redux.
// With Redux, the actual stores are in /reducers.

import {createStore, compose, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import rootReducer from '../reducers'

const store = createStore(rootReducer, compose(
  applyMiddleware(reduxThunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
  )
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextReducer = require('../reducers').default // eslint-disable-line global-require
    store.replaceReducer(nextReducer)
  })
}

export default store
