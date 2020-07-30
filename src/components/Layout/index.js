import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../Sidebar'
import Main from '../Main'

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Layout
