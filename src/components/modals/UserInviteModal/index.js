import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Message, Header } from 'semantic-ui-react'

import { createInvitationToken } from '../../../lib/api/invitation-api'

const UserInviteModal = props => {
  const { trigger } = props

  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const invitationUrl = `${window.location.origin}/register?token=${token}`

  const handleSubmit = useCallback(async () => {
    setError('')
    const { error, token } = await createInvitationToken()
    if (error) {
      setError(error.message)
      return
    }
    setToken(token)
  })

  return (
    <Modal trigger={trigger} size="tiny">
      <Modal.Header>Invite a new user</Modal.Header>
      <Modal.Content>
        {!!error && (
          <Message negative>
            <p>{error}</p>
          </Message>
        )}
        <Header size="tiny">Default Channels</Header>
        <p>
          New <b>members</b> will automatically join <b>#general</b> and <b>#random</b> channels.
        </p>
        {!!token && (
          <>
            <Header size="tiny">Invitation URL</Header>
            <p style={{ wordWrap: 'break-word' }}>
              <a href={invitationUrl} target="_blank" rel="noreferrer">
                {invitationUrl}
              </a>
            </p>
          </>
        )}
        <Form>
          <div style={{ textAlign: 'right', paddingTop: '6px' }}>
            <Form.Button onClick={handleSubmit}>Create Invitations</Form.Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

UserInviteModal.propTypes = {
  trigger: PropTypes.node.isRequired,
}

export default UserInviteModal
