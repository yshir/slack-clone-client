import _ from 'lodash'
import api from './api'

export const getMe = async () => {
  const me = await api.get('auth/me')
  return _.pick(me, ['username', 'displayname', 'avatar_url'])
}
