import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Comment } from 'semantic-ui-react'

import { formatDateTime } from '../../lib/utils'
import MessageInput from '../atoms/MessageInput'
import ChannelJoinButton from '../atoms/ChannelJoinButton'

const Home = props => {
  const { channel, messages, sendMessage } = props

  // Scroll to bottom
  useEffect(() => {
    const element = document.documentElement
    const bottom = element.scrollHeight - element.clientHeight
    window.scroll(0, bottom)
  }, [messages])

  return (
    <>
      <Comment.Group style={{ maxWidth: '1200px', paddingBottom: '46px' }}>
        {messages.map((m, i) => (
          <Comment key={`m_${i}`}>
            <Comment.Avatar src={`https://i.pravatar.cc/150?img=${m.user.username.charCodeAt() % 20}`} />
            <Comment.Content>
              <Comment.Author as="a">{m.user.username}</Comment.Author>
              <Comment.Metadata>
                <div>{formatDateTime(m.created_at)}</div>
              </Comment.Metadata>
              <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>{m.text}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}
      </Comment.Group>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          left: '260px',
          padding: '0 1rem 1rem',
          marginLeft: '-0.7rem',
          backgroundColor: 'white',
        }}
      >
        {channel.is_joined ? <MessageInput submit={message => sendMessage(message)} /> : <ChannelJoinButton channelId={channel.id} />}
      </div>
    </>
  )
}

Home.propTypes = {
  channel: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    is_joined: PropTypes.bool.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.exact({
        username: PropTypes.string.isRequired,
        displayname: PropTypes.string.isRequired,
        avatar_url: PropTypes.string,
      }),
    ),
  }),
  messages: PropTypes.arrayOf(
    PropTypes.exact({
      channel_id: PropTypes.string.isRequired,
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
}

export default Home
