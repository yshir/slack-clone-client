import React, { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import socketIOClient from 'socket.io-client'

import config from '../config'
import AppContext from '../contexts/AppContext'
import Home from '../components/Home'
import Layout from '../components/Layout'
import { createMessage, getMessages } from '../lib/api/message-api'

const HomePage = props => {
  const { channels } = useContext(AppContext)
  const [messages, setMessages] = useState([])

  const channelId = props.match.params.id
  const channel = channels.find(c => c.id === channelId)

  const sendMessage = useCallback(async text => {
    if (!text.trim()) {
      return
    }
    await createMessage({ channel_id: channelId, text })
  })

  useEffect(() => {
    const f = async () => {
      const messages = await getMessages(channelId, { refresh: true })
      setMessages(messages.reverse())
    }
    f()
  }, [channelId])

  useEffect(() => {
    const socket = socketIOClient(config.socket.endpoint)
    socket.on(config.socket.events.update_message, data => {
      setMessages(prevMessages => [...prevMessages, data.message])
    })
    return () => socket.disconnect()
  }, [])

  return (
    <Layout title={`#${channel.name}`}>
      <Home channel={channel} messages={messages} sendMessage={sendMessage} />
    </Layout>
  )
}

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default HomePage
