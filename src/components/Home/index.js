import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Button, Segment, Comment, Form, Header } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import Layout from '../Layout'
import { formatDateTime } from '../../lib/utils'

const Home = props => {
  const { channel, messages, sendMessage, text, setText } = props

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
        <Segment style={{ minHeight: '100vh' }}>
          <Comment.Group>
            <Header as="h3" dividing>
              # {channel.name}
            </Header>

            {messages.map((m, i) => (
              <Comment key={`m_${i}`}>
                <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
                <Comment.Content>
                  <Comment.Author as="a">{m.user.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDateTime(m.created_at)}</div>
                  </Comment.Metadata>
                  <Comment.Text>{m.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

            <Form reply>
              <TextareaAutosize
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ lineHeight: 1.5 }}
              />
              <Button content="Add Reply" labelPosition="left" icon="edit" primary onClick={() => sendMessage(text)} />
            </Form>
          </Comment.Group>
        </Segment>
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
