import React from 'react'
// import PropTypes from 'prop-types'
import './HeroComponent.scss'
import logo from '../../gheiti_logo.png'

const HeroComponent = () => (
  <section className="HeroComponent hero">
    <div className="hero-body">
      <div className="container">
        {/* <img id="hero-image" src="//www.gheiti.gov.gh/site/templates/pjo_enoica/images/logo.png"/> */}
        <a href="//www.gheiti.gov.gh/site/"><img alt="GHEITI Logo" id="hero-image" src={logo}/></a>
        <h1 className="title is-1 has-text-centered">Data Analysis of Ghana’s Extractive Sector</h1>
        {/* <button onClick={() => console.log('go down')}>Scroll Down to Begin</button> */}
        <p align='left'>GHEITI’s open data objective seeks to provide unrestricted access and reuse 
          of data on the extractive sector to the public so as to stimulate debates on 
          the prudential extraction and management of Ghana’s natural resources.</p>
        <br/>
        <p align='left'>This platform makes data from GHEITI’s annual reports accessible with 
          explorable dashboards and interactive visualizations.</p>
      </div>
    </div>
  </section>
);

HeroComponent.propTypes = {}

HeroComponent.defaultProps = {}

export default HeroComponent
