import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import AppProvider from './providers/AppProvider'
import Routes from './Routes'

const history = createBrowserHistory()

const App = () => (
  <>
    <Router history={history}>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  </>
)

export default App
