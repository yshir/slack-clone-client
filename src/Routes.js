import React, { useContext, useEffect } from 'react'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'

import AppContext from './contexts/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import WorkspaceNew from './pages/WorkSpaceNew'
import NotFound from './pages/NotFound'

const Routes = () => {
  const { pathname } = useLocation()
  const { isLogin, initialized } = useContext(AppContext)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!initialized) {
    return <></>
  }

  if (!isLogin) {
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/workspaces/new" component={WorkspaceNew} />
        <Redirect from="*" to="/login" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Redirect from="/login" to="/" />

      <Route exact path="/workspaces/new" component={WorkspaceNew} />
      <Route path="/channels/*" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default Routes
