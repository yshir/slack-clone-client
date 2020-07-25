import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

const WorkspaceNew = () => (
  <>
    <Segment inverted>
      <Grid color="black" textAlign="center" style={{ height: '100vh', padding: '1rem' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header inverted as="h1" textAlign="left" style={{ fontSize: '3rem', marginBottom: 60 }}>
            Login
          </Header>
          <Form size="large" style={{ marginBottom: 60 }}>
            <Form.Input fluid icon="building" iconPosition="left" placeholder="Workspace name" />
            <Form.Input fluid icon="user" iconPosition="left" placeholder="Username" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
          </Form>
          <Button primary fluid size="huge" style={{ borderRadius: 100 }}>
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

export default WorkspaceNew
