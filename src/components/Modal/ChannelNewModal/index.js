import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal } from 'semantic-ui-react'

import AppContext from '../../../contexts/AppContext'
import { createChannel } from '../../../lib/api/channel-api'
import { useHistory } from 'react-router-dom'

const ChannelNewModal = props => {
  const { trigger } = props

  const history = useHistory()
  const { initialize } = useContext(AppContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const canSubmit = !!name

  const handleSubmit = useCallback(async () => {
    const { error, channel } = await createChannel({ name, description })
    if (error) {
      console.log('an error has occured')
      console.error(error)
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
        <Form>
          <Form.Input fluid label="Name" placeholder="e.g. marketing" value={name} onChange={e => setName(e.target.value)} />
          <Form.Input
            fluid
            label="Description (optional)"
            placeholder=""
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
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
