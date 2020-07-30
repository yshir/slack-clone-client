import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../Layout'

const Home = props => {
  const { channels, workspace, user } = props

  return (
    <>
      <Layout>
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
      </Layout>
    </>
  )
}

Home.propTypes = {
  channels: PropTypes.array.isRequired,
  workspace: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Home
