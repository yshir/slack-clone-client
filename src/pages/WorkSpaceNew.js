import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import workspaceApi from '../lib/api/workspace-api'
import WorkspaceNew from '../components/WorkspaceNew'

const WorkspaceNewPage = () => {
  const history = useHistory()

  const [workspaceNames, setWorkspaceNames] = useState([])
  const [form, _setForm] = useState({
    workspaceName: '',
    username: '',
    password: '',
  })

  const setForm = useCallback(params => {
    const permittedParams = _.pick(params, _.keys(form))
    _setForm({ ...form, ...permittedParams })
  })

  const submitForm = useCallback(async () => {
    await workspaceApi.createNewWorkspace(form)
    history.push('/success')
  })

  useEffect(() => {
    const f = async () => {
      const workspaceNames = await workspaceApi.getWorkspaceNames()
      setWorkspaceNames(workspaceNames)
    }
    f()
  }, [])

  return (
    <>
      <WorkspaceNew workspaceNames={workspaceNames} form={form} setForm={setForm} submitForm={submitForm} />
    </>
  )
}

export default WorkspaceNewPage
