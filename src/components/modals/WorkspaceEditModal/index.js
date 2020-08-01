import React, { useState, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Message } from 'semantic-ui-react'

import AppContext from '../../../contexts/AppContext'
import { updateWorkspace } from '../../../lib/api/workspace-api'

const WorkspaceEditModal = props => {
  const { trigger } = props

  const { initialize, workspace } = useContext(AppContext)
  const [name, setName] = useState(workspace.name)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [error, setError] = useState('')

  const canSubmit = !!name

  const handleSubmit = useCallback(async () => {
    setError('')
    const { error } = await updateWorkspace({ name, thumbnailUrl })
    if (error) {
      setError(error.message)
      return
    }
    await initialize()
  })

  return (
    <Modal trigger={trigger} size="tiny">
      <Modal.Header>Edit workspace</Modal.Header>
      <Modal.Content>
        {!!error && (
          <Message negative>
            <p>{error}</p>
          </Message>
        )}
        <Form>
          <Form.Input fluid label="Name" value={name} onChange={e => setName(e.target.value)} />
          <Form.Input
            fluid
            label="Thumbanil url"
            placeholder="https://example.com/nice-image.jpg"
            value={thumbnailUrl}
            onChange={e => setThumbnailUrl(e.target.value)}
          />
          <div style={{ textAlign: 'right', paddingTop: '6px' }}>
            <Form.Button disabled={!canSubmit} onClick={handleSubmit}>
              Save
            </Form.Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

WorkspaceEditModal.propTypes = {
  trigger: PropTypes.node.isRequired,
}

export default WorkspaceEditModal
