import React from 'react'
// import PropTypes from 'prop-types'
import './FooterComponent.scss'

const FooterComponent = () => (
  <div className="FooterComponent footer columns">
    <div className="column">
      <p>The Ghana Extractive Industries Transparency Initiative (GHEITI)<br />
        Ministry of Finance, GHEITI Secretariat, P. O. Box MB 40, Accra, GR, Ghana<br />
         
        <a href="tel:+233-244-203-479">+233-244-203-479</a><br />
        Babdul-Razak@mofep.gov.gh</p>
    </div>
    <div className="column">
      <p>&copy; Natural Resource Governance Institute 2018</p>
      <p>Openly licensed under the <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons Attribution-ShareAlike License</a></p>
      <br/>
      <p><label className='label'>Disclaimer </label>The accuracy and/or completeness of data provided is not guaranteed. Users should always check against original sources before making decisions based upon the data presented</p>
    </div>
  </div>
);

FooterComponent.propTypes = {}

FooterComponent.defaultProps = {}

export default FooterComponent
