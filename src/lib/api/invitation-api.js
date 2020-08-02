import api from './api'

export const createInvitationToken = async () => {
  try {
    const { token } = await api.post('auth/users')
    return { token }
  } catch (err) {
    return { error: err }
  }
}

export const acceptInvitation = async params => {
  try {
    const { token, default_channel } = await api.post('users', {
      data: {
        username: params.username,
        password: params.password,
        token: params.token,
      },
    })
    return { token, default_channel }
  } catch (err) {
    return { error: err }
  }
}
