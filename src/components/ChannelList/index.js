import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { List, Divider, Header } from 'semantic-ui-react'

const ChannelList = props => {
  const { channels } = props

  return (
    <>
      <Header size="tiny">{channels.length} channels</Header>
      <Divider />
      <List divided relaxed>
        {channels.map(channel => (
          <List.Item key={channel.id}>
            <List.Content style={{ lineHeight: 1.5, margin: '0.5rem 0' }}>
              <Link to={`/channels/${channel.id}`}>
                <List.Header>{channel.name}</List.Header>
                <List.Description style={{ color: 'grey', fontSize: '0.85rem' }}>{channel.users.length} members</List.Description>
              </Link>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Divider />
    </>
  )
}

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      is_joined: PropTypes.bool.isRequired,
      users: PropTypes.arrayOf(
        PropTypes.exact({
          username: PropTypes.string.isRequired,
          displayname: PropTypes.string.isRequired,
          avatar_url: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
}

export default ChannelList
