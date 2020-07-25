import React from 'react'
import { Button, Container, Header, Segment } from 'semantic-ui-react'

const NotFound = () => (
  <>
    <Segment inverted style={{ minHeight: '100vh', padding: 20 }}>
      <Container text>
        <Header
          as="h1"
          content="404"
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Header
          as="h2"
          content="Page Not Found"
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
        <Button as="a" primary size="large" href="/" style={{ marginTop: 60 }}>
          GO BACK HOME
        </Button>
      </Container>
    </Segment>
  </>
)

export default NotFound
