import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button, Container, Grid, Header, Icon, Menu, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'

const getWidth = () => {
  const isSSR = typeof window === 'undefined'
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as="h1"
      content="Slack Clone"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as="h2"
      content="Let's create a new workspace"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Link to="/workspaces/new">
      <Button primary size="huge">
        Create a new workspace
      </Button>
    </Link>

    <Segment inverted>
      <p>
        Do you already have an account? Please login <a href="#">here</a>.
      </p>
    </Segment>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

const DesktopContainer = ({ children }) => {
  const [fixed, setFixed] = useState(false)

  const hideFixedMenu = useCallback(() => setFixed(false))
  const showFixedMenu = useCallback(() => setFixed(true))

  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility once={false} onBottomPassed={showFixedMenu} onBottomPassedReverse={hideFixedMenu}>
        <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
          <Menu fixed={fixed ? 'top' : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
            <Container>
              <Menu.Item as="a" active>
                Home
              </Menu.Item>
              <Menu.Item position="right">
                <Button as="a" inverted={!fixed}>
                  Log in
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          <HomepageHeading />
        </Segment>
      </Visibility>

      {children}
    </Responsive>
  )
}

DesktopContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

const MobileContainer = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState(false)

  const handleSidebarHide = useCallback(() => setSidebarOpened(false))
  const handleToggle = useCallback(() => setSidebarOpened(true))

  return (
    <Responsive as={Sidebar.Pushable} getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar as={Menu} animation="push" inverted onHide={handleSidebarHide} vertical visible={sidebarOpened}>
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Log in</Menu.Item>
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Segment inverted textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
          <Container>
            <Menu inverted pointing secondary size="large">
              <Menu.Item onClick={handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item position="right">
                <Button as="a" inverted>
                  Log in
                </Button>
              </Menu.Item>
            </Menu>
          </Container>
          <HomepageHeading mobile />
        </Segment>

        {children}
      </Sidebar.Pusher>
    </Responsive>
  )
}

MobileContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

const HomepageLayout = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign="middle">
        <Grid.Row>
          {/* <Grid.Column width={8}> */}
          <Grid.Column>
            <Header as="h3" style={{ fontSize: '2em' }}>
              What&apos;s this?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              This is a{' '}
              <a href="https://slack.com/intl/ja-jp/" target="_blank" rel="noreferrer">
                Slack
              </a>{' '}
              clone made with Node.js, Socket.IO and React. <br />
              It was created by{' '}
              <a href="https://github.com/yshir/" target="_blank" rel="noreferrer">
                yshir
              </a>{' '}
              for just studying.
            </p>
            <Header as="h3" style={{ fontSize: '2em' }}>
              All code is here
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              - Server:{' '}
              <a href="https://github.com/yshir/slack-clone-server" target="_blank" rel="noreferrer">
                https://github.com/yshir/slack-clone-server
              </a>
              <br />- Client:{' '}
              <a href="https://github.com/yshir/slack-clone-client" target="_blank" rel="noreferrer">
                https://github.com/yshir/slack-clone-client
              </a>
            </p>
          </Grid.Column>
          {/* <Grid.Column floated="right" width={6}></Grid.Column> */}
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)

export default HomepageLayout
