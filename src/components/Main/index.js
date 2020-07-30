import React from 'react'
import PropTypes from 'prop-types'

const Main = ({ children }) => {
  return (
    <>
      <div
        style={{
          marginLeft: '250px',
          minWidth: '550px',
        }}
      >
        {children}
      </div>
    </>
  )
}

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default Main
