import React from 'react'
import PropTypes from 'prop-types'

const Home = props => {
  const { channels, workspace, user } = props
  return (
    <>
      <div>
        workspace:
        <pre>{JSON.stringify(workspace, null, 2)}</pre>
      </div>
      <div>
        channels:
        <pre>{JSON.stringify(channels, null, 2)}</pre>
      </div>
      <div>
        user:
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  )
}

Home.propTypes = {
  channels: PropTypes.array.isRequired,
  workspace: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Home
