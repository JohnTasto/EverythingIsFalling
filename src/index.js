import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store/configureStore'  // eslint-disable-line import/default
import App from './components/app'

import './scss/index.scss'

require('./img/icons/apple-touch-icon-57x57.png')
require('./img/icons/apple-touch-icon-114x114.png')
require('./img/icons/apple-touch-icon-72x72.png')
require('./img/icons/apple-touch-icon-144x144.png')
require('./img/icons/apple-touch-icon-120x120.png')
require('./img/icons/apple-touch-icon-152x152.png')
require('./img/icons/favicon-32x32.png')
require('./img/icons/favicon-16x16.png')
require('./img/icons/mstile-144x144.png')


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
