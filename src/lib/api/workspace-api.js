import api from './api'

export const getWorkspaceNames = async options => {
  const { workspaces } = await api.get('workspaces', options)
  return workspaces.map(c => c.name)
}

export const getCurrentWorkspace = async options => {
  const { workspace } = await api.get('auth/workspace', options)
  return workspace
}

export const createNewWorkspace = async params => {
  try {
    const { token, default_channel } = await api.post('workspaces', {
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

export const updateWorkspace = async params => {
  try {
    const { workspace } = await api.put('auth/workspace', {
      data: {
        name: params.name,
        thumbnail_url: params.thumbnail_url,
      },
    })
    return { workspace }
  } catch (err) {
    return { error: err }
  }
}
