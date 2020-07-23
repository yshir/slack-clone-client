import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import GetStarted from './pages/GetStarted'

const Routes = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/get-started" component={GetStarted} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  )
}

export default Routes
