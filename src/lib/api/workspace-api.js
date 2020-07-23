import api from './api'

const getWorkspaceNames = async () => {
  const { workspaces } = await api.get('workspaces')
  return workspaces.map(c => c.name)
}

export default {
  getWorkspaceNames,
}
