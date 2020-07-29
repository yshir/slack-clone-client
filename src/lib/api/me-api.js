import _ from 'lodash'
import api from './api'

export const getMe = async options => {
  const me = await api.get('auth/me', options)
  return _.pick(me, ['username', 'displayname', 'avatar_url'])
}
