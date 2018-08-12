import React from 'react'
import PropTypes from 'prop-types'
import styles from './RevenuesComponent.scss'

const RevenuesComponent = ({ }) => (
  <div className="RevenuesComponent">
    <section className="section">
      <h3 className="title is-3">Comparing government revenue with extractive sector revenue</h3>
      <code>D3 will go here</code>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Source</h4>
          <p>IMF World Economic Outlook, April 2015; GHEITI website: http://gheiti.gov.gh</p>
        </div>
        <div className="column">
          <h4 className="title is-4">Data</h4>
          <a href="#" className="button">Total extractives revenues</a>
          <a href="#" className="button">Total government revenues</a>
        </div>
      </div>
    </section>
  </div>
);

RevenuesComponent.propTypes = {}

RevenuesComponent.defaultProps = {}

export default RevenuesComponent
