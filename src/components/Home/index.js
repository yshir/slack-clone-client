import React, { useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, Comment, Form, Header, Menu } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import Layout from '../Layout'
import { formatDateTime } from '../../lib/utils'

const Home = props => {
  const { channel, messages, sendMessage, text, setText } = props

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
      <Layout>
        <Menu
          secondary
          style={{
            height: '61px',
            borderBottom: 'solid 1px rgba(34,36,38,.15)',
            boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            marginLeft: '250px',
            backgroundColor: '#FFF',
            zIndex: 1,
          }}
        >
          <Menu.Item>
            <Header as="h3">#{channel.name}</Header>
          </Menu.Item>
        </Menu>
        <Comment.Group style={{ margin: '1rem', paddingTop: 'calc(1rem + 61px)' }}>
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
      </Layout>
    </>
  )
}

Home.propTypes = {
  channel: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    is_joined: PropTypes.bool.isRequired,
  }),
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
