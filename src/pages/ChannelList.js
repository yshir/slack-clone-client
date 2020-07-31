import React, { useContext } from 'react'

import AppContext from '../contexts/AppContext'
import ChannelList from '../components/ChannelList'
import Layout from '../components/Layout'

const ChannelListPage = () => {
  const { channels } = useContext(AppContext)

  return (
    <>
      <Layout title="Channel Browser">
        <ChannelList channels={channels} />
      </Layout>
    </>
  )
}

export default ChannelListPage
