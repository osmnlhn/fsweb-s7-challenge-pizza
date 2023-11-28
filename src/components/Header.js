import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
const Header = () => {
  return (
    <div>
      <nav className="nav-Container">
        <h1>
          <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
            <img src={require('../assets/logo.svg')} alt='logo' />
          </Link>
        </h1>
      </nav>
    </div>
  )
}

export default Header