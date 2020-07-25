import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import WorkspaceNew from './pages/WorkSpaceNew'
import NotFound from './pages/NotFound'

const Routes = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/workspaces/new" component={WorkspaceNew} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes
