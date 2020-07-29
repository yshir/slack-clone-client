import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { getToken } from '../lib/auth'
import { getMe } from '../lib/api/me-api'
import AppContext from '../contexts/AppContext'

const AppProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false)
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState([])
  const [workspace, setWorkspace] = useState({})
  const isLogin = !_.isEmpty(user)

  const initialize = useCallback(async () => {
    setInitialized(false)
    if (getToken()) {
      const me = await getMe({ refresh: true })
      setUser(me)

      const channels = []
      setChannels(channels)

      const workspace = {}
      setWorkspace(workspace)
    }
    setInitialized(true)
  })

  useEffect(() => {
    initialize()
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        channels,
        workspace,
        isLogin,
        initialize,
        initialized,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default AppProvider
