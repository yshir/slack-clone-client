import api from './api'

export const getChannels = async options => {
  const { channels } = await api.get('auth/channels', options)
  return channels
}
