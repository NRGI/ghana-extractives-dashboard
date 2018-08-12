import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeroComponent.scss'

const HeroComponent = ({ }) => (
  <section class="HeroComponent hero">
    <div class="hero-body">
      <div class="container">
        <h1 className="title is-1">Data Analysis of Ghana’s Extractive Sector</h1>
        <button onClick={() => console.log('go down')}>Scroll Down to Begin</button>
      </div>
    </div>
  </section>
);

HeroComponent.propTypes = {}

HeroComponent.defaultProps = {}

export default HeroComponent
