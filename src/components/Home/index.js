import _ from 'lodash'
import React, { useContext, useCallback, useState, useEffect } from 'react'
import { Button, Segment, Comment, Form, Header } from 'semantic-ui-react'
import TextareaAutosize from 'react-textarea-autosize'

import Layout from '../Layout'
import AppContext from '../../contexts/AppContext'
import { useLocation } from 'react-router-dom'
import { createMessage, getMessages } from '../../lib/api/message-api'

const Home = () => {
  const { channels } = useContext(AppContext)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState([])

  const location = useLocation()
  const currentChannelId = _.last(location.pathname.split('/'))
  const currentChannel = channels.find(c => c.id === currentChannelId)

  const sendMessage = useCallback(async text => {
    if (!text) {
      return
    }
    const message = await createMessage({ channel_id: currentChannelId, text })
    setText('')
    setMessages([message, ...messages])
  })

  useEffect(() => {
    const f = async () => {
      const messages = await getMessages(currentChannelId, { refresh: true })
      setMessages(messages)
    }
    f()
  }, [])

  return (
    <>
      <Layout>
        <Segment style={{ minHeight: '100vh' }}>
          <Comment.Group>
            <Header as="h3" dividing>
              # {currentChannel.name}
            </Header>

            {messages.map((m, i) => (
              <Comment key={`m_${i}`}>
                <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
                <Comment.Content>
                  <Comment.Author as="a">{m.user.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{m.created_at}</div>
                  </Comment.Metadata>
                  <Comment.Text>{m.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

            <Comment>
              <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
              <Comment.Content>
                <Comment.Author as="a">Matt</Comment.Author>
                <Comment.Metadata>
                  <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
              <Comment.Content>
                <Comment.Author as="a">Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>This has been very useful for my research. Thanks as well!</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar src={`https://i.pravatar.cc/150?img=1`} />
              <Comment.Content>
                <Comment.Author as="a">Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>5 days ago</div>
                </Comment.Metadata>
                <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              </Comment.Content>
            </Comment>

            <Form reply>
              <TextareaAutosize value={text} onChange={e => setText(e.target.value)} style={{ lineHeight: 1.5 }} />
              <Button content="Add Reply" labelPosition="left" icon="edit" primary onClick={() => sendMessage(text)} />
            </Form>
          </Comment.Group>
        </Segment>
      </Layout>
    </>
  )
}

export default Home
