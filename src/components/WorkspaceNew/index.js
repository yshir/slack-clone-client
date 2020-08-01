import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const WorkspaceNew = props => {
  const { form, setForm, submitForm, sending, error } = props
  const { workspaceName, username, password } = form

  const handleKeyPress = useCallback(e => {
    if (e.key == 'Enter') {
      submitForm()
    }
  })

  return (
    <>
      <Segment inverted>
        <Grid color="black" textAlign="center" style={{ height: '100vh', padding: '1rem' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header inverted as="h1" textAlign="left" style={{ fontSize: '3rem', marginBottom: 60 }}>
              Create a new workspace
            </Header>
            {!!error.header && <Message error header={error.header} list={error.list} style={{ textAlign: 'left' }} />}
            <Form size="large" style={{ marginBottom: 60 }}>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Workspace name"
                value={workspaceName}
                onChange={e => setForm({ workspaceName: e.target.value })}
                onKeyPress={handleKeyPress}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={e => setForm({ username: e.target.value })}
                onKeyPress={handleKeyPress}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={e => setForm({ password: e.target.value })}
                onKeyPress={handleKeyPress}
              />
            </Form>
            <Button primary fluid size="huge" onClick={submitForm} loading={sending} disabled={sending} style={{ borderRadius: 100 }}>
              Create
            </Button>
            <p style={{ marginTop: 20 }}>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

WorkspaceNew.propTypes = {
  form: PropTypes.exact({
    workspaceName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  setForm: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  sending: PropTypes.bool.isRequired,
  error: PropTypes.exact({
    header: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
}

export default WorkspaceNew
