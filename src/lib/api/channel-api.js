import api from './api'

export const getChannels = async options => {
  const { channels } = await api.get('auth/channels', options)
  return channels
}

export const createChannel = async params => {
  try {
    const { channel } = await api.post('auth/channels', {
      data: {
        name: params.name,
      },
    })
    return { channel }
  } catch (err) {
    return { error: err }
  }
}
