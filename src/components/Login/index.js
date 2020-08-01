import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'

const Login = props => {
  const { workspaceName, setWorkspaceName, username, setUsername, password, setPassword, error, submit } = props

  const handleKeyPress = useCallback(e => {
    if (e.key == 'Enter') {
      submit()
    }
  })

  return (
    <>
      <Segment inverted>
        <Grid color="black" textAlign="center" style={{ height: '100vh', padding: '1rem' }} verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header inverted as="h1" textAlign="left" style={{ fontSize: '3rem', marginBottom: 60 }}>
              Login
            </Header>
            {!!error && (
              <Message negative style={{ textAlign: 'left' }}>
                <p>{error}</p>
              </Message>
            )}
            <Form size="large" style={{ marginBottom: 60 }}>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Workspace name"
                value={workspaceName}
                onChange={e => setWorkspaceName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form>
            <Button primary fluid size="huge" style={{ borderRadius: 100 }} onClick={submit}>
              Login
            </Button>
            <p style={{ marginTop: 20 }}>
              Don&apos;t have an account? <Link to="/workspaces/new">Sign up</Link>
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

Login.propTypes = {
  workspaceName: PropTypes.string.isRequired,
  setWorkspaceName: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
}

export default Login
