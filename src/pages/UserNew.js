import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import qs from 'query-string'

import { setToken } from '../lib/auth'
import AppContext from '../contexts/AppContext'
import UserNew from '../components/UserNew'
import NotFound from '../pages/NotFound'
import { acceptInvitation } from '../lib/api/invitation-api'
import { useHistory } from 'react-router-dom'

const UserNewPage = props => {
  const { location } = props
  const query = qs.parse(location.search)
  const invitationToken = query.token
  if (!invitationToken) {
    return <NotFound />
  }

  const history = useHistory()
  const { initialize } = useContext(AppContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = useCallback(async () => {
    setError('')

    const { error, token, default_channel } = await acceptInvitation({
      token: invitationToken,
      username,
      password,
    })

    if (error) {
      // TODO: more details
      setError('Register failed')
      return
    }

    setToken(token)
    await initialize()

    history.push(`/channels/${default_channel.id}`)
  })

  return (
    <>
      <UserNew username={username} setUsername={setUsername} password={password} setPassword={setPassword} error={error} submit={submit} />
    </>
  )
}

UserNewPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default UserNewPage
