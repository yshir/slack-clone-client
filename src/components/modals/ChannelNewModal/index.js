import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Message } from 'semantic-ui-react'

import AppContext from '../../../contexts/AppContext'
import { createChannel } from '../../../lib/api/channel-api'
import { useHistory } from 'react-router-dom'

const ChannelNewModal = props => {
  const { trigger } = props

  const history = useHistory()
  const { initialize } = useContext(AppContext)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const canSubmit = !!name

  const handleSubmit = useCallback(async () => {
    setError('')
    const { error, channel } = await createChannel({ name })
    if (error) {
      setError(error.message)
      return
    }
    await initialize()
    history.push(`/channels/${channel.id}`)
  })

  return (
    <Modal trigger={trigger} size="tiny">
      <Modal.Header>Create a channel</Modal.Header>
      <Modal.Content>
        <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
        {!!error && (
          <Message negative>
            <p>{error}</p>
          </Message>
        )}
        <Form>
          <Form.Input fluid label="Name" placeholder="e.g. marketing" value={name} onChange={e => setName(e.target.value)} />
          <div style={{ textAlign: 'right', paddingTop: '6px' }}>
            <Form.Button disabled={!canSubmit} onClick={handleSubmit}>
              Create
            </Form.Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

ChannelNewModal.propTypes = {
  trigger: PropTypes.node.isRequired,
}

export default ChannelNewModal
