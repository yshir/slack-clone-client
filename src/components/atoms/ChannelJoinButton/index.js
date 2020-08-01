import React, { useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import { joinChannel } from '../../../lib/api/channel-api'
import AppContext from '../../../contexts/AppContext'

const ChannelJoinButton = props => {
  const { channelId } = props
  const { initialize } = useContext(AppContext)

  const handleClick = useCallback(async () => {
    await joinChannel(channelId)
    await initialize()
  })

  return (
    <Button primary onClick={handleClick}>
      Join Channel
    </Button>
  )
}

ChannelJoinButton.propTypes = {
  channelId: PropTypes.string.isRequired,
}

export default ChannelJoinButton
