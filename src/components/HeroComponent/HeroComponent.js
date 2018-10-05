import React from 'react'
import PropTypes from 'prop-types'
import styles from './HeroComponent.scss'

const HeroComponent = ({ }) => (
  <section className="HeroComponent hero">
    <div className="hero-body">
      <div className="container">
        <h1 className="title is-1">Data Analysis of Ghana’s Extractive Sector</h1>
        {/* <button onClick={() => console.log('go down')}>Scroll Down to Begin</button> */}
        <p align='left'>GHEITI’s open data objective seeks to provide unrestricted access and re-use 
          of data on the extractive sector to the public so as to stimulate debates on 
          the prudential extraction and management of Ghana’s natural resources.</p>
        <br/>
        <p align='left'>This platform makes GHEITI’s annual reports datasets accessible with 
          explorable dashboards and interactive visualizations.</p>
      </div>
    </div>
  </section>
);

HeroComponent.propTypes = {}

HeroComponent.defaultProps = {}

export default HeroComponent
