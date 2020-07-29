import api from './api'

const getWorkspaceNames = async () => {
  const { workspaces } = await api.get('workspaces')
  return workspaces.map(c => c.name)
}

const createNewWorkspace = async params => {
  try {
    const { token } = await api.post('workspaces', {
      data: {
        workspace_name: params.workspaceName,
        username: params.username,
        password: params.password,
      },
    })
    return { token }
  } catch (err) {
    return { error: err }
  }
}

export default {
  getWorkspaceNames,
  createNewWorkspace,
}
