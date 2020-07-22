import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Routes from './Routes'

const history = createBrowserHistory()

const App = () => (
  <>
    <Router history={history}>
      <Routes />
    </Router>
  </>
)

export default App
