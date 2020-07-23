import React, { useEffect, useState } from 'react'
import workspaceApi from '../lib/api/workspace-api'

const GetStarted = () => {
  const [channelNames, setChannelNames] = useState([])

  useEffect(() => {
    const f = async () => {
      const channelNames = await workspaceApi.getWorkspaceNames()
      setChannelNames(channelNames)
    }
    f()
  }, [])

  return (
    <>
      <p>get started</p>
      <div>
        <pre>{JSON.stringify(channelNames, null, 2)}</pre>
      </div>
    </>
  )
}

export default GetStarted
