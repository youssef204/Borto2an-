import React from 'react'

function Header({Title}) {
    return (
        <header
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          fontSize: 20,
        }}
      >
        {Title}
      </header>
    )
}

export default Header
