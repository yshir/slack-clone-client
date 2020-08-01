import React, { useState, useCallback, useContext } from 'react'

import { setToken } from '../lib/auth'
import { login } from '../lib/api/login-api'
import AppContext from '../contexts/AppContext'
import Login from '../components/Login'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const { initialize } = useContext(AppContext)
  const history = useHistory()

  const [workspaceName, setWorkspaceName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = useCallback(async () => {
    setError('')

    const { error, token, default_channel } = await login({
      workspaceName,
      username,
      password,
    })

    if (error) {
      setError('Login failed')
      return
    }

    setToken(token)
    await initialize()

    history.push(`/channels/${default_channel.id}`)
  })

  return (
    <>
      <Login
        workspaceName={workspaceName}
        setWorkspaceName={setWorkspaceName}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        submit={submit}
      />
    </>
  )
}

export default LoginPage
