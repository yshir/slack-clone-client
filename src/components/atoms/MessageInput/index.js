import React, { useCallback, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

const MessageInput = props => {
  const { submit } = props

  const [text, setText] = useState('')

  const handleKeyDown = useCallback(e => {
    // Only Enter, not press Shift key
    if (e.key === 'Enter' && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      submit(text)
      setText('')
    }
  })

  return (
    <Form reply>
      <TextareaAutosize
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="jot something down"
        style={{ lineHeight: 1.5, resize: 'none' }}
      />
    </Form>
  )
}

MessageInput.propTypes = {
  submit: PropTypes.func.isRequired,
}

export default MessageInput
