import React from 'react'
import PropTypes from 'prop-types'
import { Header, Menu } from 'semantic-ui-react'

const _Header = props => {
  const { title } = props

  return (
    <>
      <Menu
        secondary
        style={{
          height: '61px',
          borderBottom: 'solid 1px rgba(34,36,38,.15)',
          boxShadow: '0 1px 2px 0 rgba(34,36,38,.15)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          marginLeft: '250px',
          backgroundColor: '#FFF',
          zIndex: 1,
        }}
      >
        <Menu.Item>
          <Header as="h3">{title}</Header>
        </Menu.Item>
      </Menu>
    </>
  )
}

_Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default _Header
