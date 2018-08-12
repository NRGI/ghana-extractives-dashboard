import React from 'react'
import PropTypes from 'prop-types'
import styles from './FooterComponent.scss'

const FooterComponent = ({ }) => (
  <div className="FooterComponent footer columns">
    <div className="column">
      <p>The Ghana Extractive Industries Transparency Initiative (GHEITI)<br />
        Ministry of Finance, GHEITI Secretariat, P. O. Box MB 40, Accra, GR, Ghana<br />
        <a href="tel:+233-24-4689819">+233-24-4689819</a><br />
        fashiadey@mofep.gov.gh</p>
    </div>
    <div className="column">
      <p>&copy; Natural Resource Governance Institute 2015</p>
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">Openly licensed under the Creative Commons Attribution-ShareAlike License</a>
    </div>
  </div>
);

FooterComponent.propTypes = {}

FooterComponent.defaultProps = {}

export default FooterComponent
