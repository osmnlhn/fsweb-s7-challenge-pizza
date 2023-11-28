
import React from 'react'
import { Link } from 'react-router-dom'

import './HomePage.css'

const HomePage = () => {
  return (
      <div className="anasayfa-Container">
          <div className="header-anasayfa">
              <nav>
                  <h1>
                      <Link style={{ textDecoration: 'none', color: 'white' }} to={'/'}>
                          <img src={require('../assets/logo.svg')} alt='logo' />
                      </Link>
                  </h1>
              </nav>
              <h4>fırsatı kaçırma</h4>
              <h2>KOD ACIKTIRIR.</h2>
              <h2>PİZZA, DOYURUR.</h2>
          </div>
          <Link id="order-pizza" to="/" data-cy="order-pizza">
              TIKLA GELSIN
          </Link>
          <br></br>
      </div>
  )
}
export default HomePage;