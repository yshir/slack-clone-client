import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import WorkspaceNew from './pages/WorkSpaceNew'

const Routes = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/workspaces/new" component={WorkspaceNew} />
      {/* <Route path="*" component={NotFound} /> */}
    </Switch>
  )
}

export default Routes
