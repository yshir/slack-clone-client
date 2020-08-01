import api from './api'

export const login = async params => {
  try {
    const { token, default_channel } = await api.post('login', {
      data: {
        workspace_name: params.workspaceName,
        username: params.username,
        password: params.password,
      },
    })
    return { token, default_channel }
  } catch (err) {
    return { error: err }
  }
}
