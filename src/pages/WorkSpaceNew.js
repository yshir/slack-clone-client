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
  const [sending, setSending] = useState(false)
  const [error, setError] = useState({
    message: '',
    details: [],
    active: false,
  })

  const setForm = useCallback(params => {
    const permittedParams = _.pick(params, _.keys(form))
    _setForm({ ...form, ...permittedParams })
  })

  const submitForm = useCallback(async () => {
    setSending(true)
    const { error, user_id, workspace_id } = await workspaceApi.createNewWorkspace(form)
    setSending(false)

    if (error) {
      setError({
        message: error.message || 'An error has occured',
        details: _.isEmpty(error.details) ? [] : error.details.map(item => `${item.dataPath} ${item.message}`),
        active: true,
      })
    } else {
      history.push('/success?workspace_id=' + workspace_id + '&user_id=' + user_id)
    }
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
      <WorkspaceNew workspaceNames={workspaceNames} form={form} setForm={setForm} submitForm={submitForm} sending={sending} error={error} />
    </>
  )
}

export default WorkspaceNewPage
