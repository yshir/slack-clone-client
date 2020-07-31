import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Comment, Form } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import { formatDateTime } from '../../lib/utils'

const Home = props => {
  const { messages, sendMessage, text, setText } = props

  // Scroll to bottom
  useEffect(() => {
    const element = document.documentElement
    const bottom = element.scrollHeight - element.clientHeight
    window.scroll(0, bottom)
  }, [messages])

  const handleKeyDown = useCallback(e => {
    // Only Enter, not press Shift key
    if (e.key === 'Enter' && e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  return (
    <>
      <Comment.Group>
        {messages.map((m, i) => (
          <Comment key={`m_${i}`}>
            <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{formatDateTime(m.created_at)}</div>
              </Comment.Metadata>
              <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{m.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}

        <Form reply>
          <TextareaAutosize
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            style={{ lineHeight: 1.5, resize: 'none' }}
          />
          <Button content="Add Reply" labelPosition="left" icon="edit" primary onClick={() => sendMessage(text)} />
        </Form>
      </Comment.Group>
    </>
  )
}

Home.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      text: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      user: PropTypes.exact({
        username: PropTypes.string.isRequired,
        displayname: PropTypes.string.isRequired,
        avatar_url: PropTypes.string,
      }),
    }),
  ),
  sendMessage: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  setText: PropTypes.func.isRequired,
}

export default Home
