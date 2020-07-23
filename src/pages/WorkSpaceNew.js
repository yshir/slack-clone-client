import React, { useEffect, useState } from 'react'
import workspaceApi from '../lib/api/workspace-api'

const WorkspaceNew = () => {
  const [workspaceNames, setWorkspaceNames] = useState([])

  useEffect(() => {
    const f = async () => {
      const workspaceNames = await workspaceApi.getWorkspaceNames()
      setWorkspaceNames(workspaceNames)
    }
    f()
  }, [])

  return (
    <>
      <p>get started</p>
      <div>
        <pre>{JSON.stringify(workspaceNames, null, 2)}</pre>
      </div>
    </>
  )
}

export default WorkspaceNew
