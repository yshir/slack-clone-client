import React from 'react'
import PropTypes from 'prop-types'

import Sidebar from '../Sidebar'
import Header from '../Header'
import Main from '../Main'

const Layout = ({ children, title }) => {
  return (
    <>
      <Sidebar />
      <Main>
        <Header title={title} />
        <main style={{ paddingTop: 'calc(61px + 1rem)', margin: '0 1rem' }}>{children}</main>
      </Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  title: PropTypes.string,
}

export default Layout
