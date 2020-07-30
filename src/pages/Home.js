import React, { useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'

import AppContext from '../contexts/AppContext'
import Home from '../components/Home'
import { createMessage, getMessages } from '../lib/api/message-api'

const HomePage = props => {
  const { channels } = useContext(AppContext)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')

  const channelId = props.match.params.id
  const channel = channels.find(c => c.id === channelId)

  const sendMessage = useCallback(async () => {
    if (!text.trim()) {
      return
    }
    setText('')
    const message = await createMessage({ channel_id: channelId, text })
    setMessages([...messages, message])
  })

  useEffect(() => {
    const f = async () => {
      const messages = await getMessages(channelId, { refresh: true })
      setMessages(messages.reverse())
    }
    f()
  }, [channelId])

  return <Home channel={channel} text={text} setText={setText} messages={messages} sendMessage={sendMessage} />
}

HomePage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default HomePage
