import React, { useCallback, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Image, Menu } from 'semantic-ui-react'

import { removeToken } from '../../lib/auth'
import AppContext from '../../contexts/AppContext'
import ChannelNewModal from '../modals/ChannelNewModal'
import WorkspaceEditModal from '../modals/WorkspaceEditModal'

const Sidebar = () => {
  const { channels, workspace } = useContext(AppContext)
  const location = useLocation()
  const history = useHistory()

  const joindChannels = channels.filter(c => c.is_joined)

  const logout = useCallback(() => {
    removeToken()
    window.location.href = '/'
  })

  return (
    <>
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          top: 0,
          bottom: 0,
          left: 0,
          width: '250px',
          backgroundColor: '#1B1C1D',
          overflowX: 'hidden',
          flex: 1,
        }}
      >
        <Menu inverted vertical>
          <Menu.Item>
            <Image src="https://via.placeholder.com/150" size="mini" circular spaced />
            <WorkspaceEditModal trigger={<strong style={{ cursor: 'pointer' }}>{workspace.name}</strong>} />
          </Menu.Item>
          <Menu.Item>
            <strong>Channels</strong>
            <Menu.Menu>
              {joindChannels.map(channel => (
                <Menu.Item
                  key={channel.id}
                  active={location.pathname === `/channels/${channel.id}`}
                  onClick={() => history.push(`/channels/${channel.id}`)}
                >
                  # {channel.name}
                </Menu.Item>
              ))}
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Menu>
              <Menu.Item onClick={() => history.push('/channels')}>Browse channels</Menu.Item>
              <ChannelNewModal trigger={<Menu.Item>Create a channel</Menu.Item>} />
            </Menu.Menu>
          </Menu.Item>
          <Menu.Item>
            <Menu.Menu>
              <Menu.Item onClick={logout}>Log out</Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </div>
    </>
  )
}

export default Sidebar
