import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import workspaceApi from '../lib/api/workspace-api'
import WorkspaceNew from '../components/WorkspaceNew'
import { createValidator } from '../lib/validations/workspace-new-validation'

const WorkspaceNewPage = () => {
  const history = useHistory()

  const [workspaceNames, setWorkspaceNames] = useState([])
  const [sending, setSending] = useState(false)

  const initialForm = {
    workspaceName: '',
    username: '',
    password: '',
  }
  const [form, _setForm] = useState(initialForm)
  const setForm = useCallback(params => {
    const permittedParams = _.pick(params, _.keys(initialForm))
    const newParams = { ...form, ...permittedParams }
    _setForm(newParams)
  })

  const initialError = {
    header: '',
    list: [],
  }
  const [error, setError] = useState(initialError)
  const clearError = useCallback(() => setError(initialError))

  const submitForm = useCallback(async () => {
    setSending(true)
    clearError()

    const validate = createValidator({ workspaceNames })
    validate(form)
    if (validate.errors) {
      setError({
        header: 'Validation Error',
        list: validate.errors.map(item => `${item.dataPath.replace('.', '')} ${item.message}`),
      })
      setSending(false)
      return
    }

    const { error, token } = await workspaceApi.createNewWorkspace(form)

    if (error) {
      setError({
        header: 'API Error',
        list: error.details ? error.details.map(item => `${item.dataPath.replace('.', '')} ${item.message}`) : ['An error has occured'],
      })
      setSending(false)
      return
    }

    setSending(false)
    history.push('/workspaces/new?token=' + token)
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
      <WorkspaceNew form={form} setForm={setForm} submitForm={submitForm} sending={sending} error={error} />
    </>
  )
}

export default WorkspaceNewPage
