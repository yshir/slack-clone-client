import React, { useContext } from 'react'

import AppContext from '../contexts/AppContext'
import Home from '../components/Home'

const HomePage = () => {
  const { channels, workspace, user } = useContext(AppContext)
  return <Home channels={channels} workspace={workspace} user={user} />
}

export default HomePage
