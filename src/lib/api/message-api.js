import api from './api'

export const getMessages = async (channelId, options) => {
  const { messages } = await api.get(`auth/messages?channel_id=${channelId}`, options)
  return messages
}

export const createMessage = async params => {
  const { message } = await api.post('auth/messages', {
    data: {
      channel_id: params.channel_id,
      text: params.text,
    },
  })
  return message
}
