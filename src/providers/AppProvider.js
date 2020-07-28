import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import AppContext from '../contexts/AppContext'

const AppProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [channels, setChannels] = useState([])
  const isLogin = !_.isEmpty(user)

  useEffect(() => {
    setUser({})
    setChannels([])
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        channels,
        isLogin,
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
