import React from 'react'
import PropTypes from 'prop-types'
import styles from './CommoditiesComponent.scss'

const CommoditiesComponent = ({ }) => (
  <div className="CommoditiesComponent">
    <section className="section">
      <h3 title="title is-2">Trend analysis of revenue per commodity</h3>
      <code>D3 will go here</code>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Notes</h4>
          <p>Zero values signify data unavailable or no production. Oil figures were originally available in USD, but to allow for comparability, they have been converted to GHS at the Bank of Ghana annual average rate for each year.</p>
        </div>
        <div className="column">
          <h4 className="title is-4">Source</h4>
          <p>Revenues represent the aggregate of commodities as reported in GHEITI reports: <a href="http://gheiti.gov.gh/">http://gheiti.gov.gh/</a></p>
        </div>
        <div className="column">
          <h4 className="title is-4">Data</h4>
          <a href="#" className="button"> Disaggregated resource revenues</a>
        </div>
      </div>
    </section>
    <section className="section">
      <h3 className="title is-2">Revenue by commodity and fiscal streams</h3>
      <h4 className="subtitle is-2">Select Year</h4>
      <input type="range" min="0" max="100"/>
      <p>The next four graphs are filtered for the year chosen above.</p>
      <h4 className="subtitle is-2">The next four graphs are filtered for the year chosen above.</h4>
      <code>D3 will go here</code>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Notes</h4>
          <p>Zero values signify data unavailable or no production.</p>
        </div>
        <div className="column">
          <h4 className="title is-4">Source</h4>
          <p>Revenues represent the aggregate of commodities as reported in GHEITI reports: <a href="http://gheiti.gov.gh/">http://gheiti.gov.gh/</a></p>
        </div>
        <div className="column">
          <h4 className="title is-4">Data</h4>
          <a href="#" className="button"> Disaggregated resource revenues</a>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Mining: revenue streams by company (2013)</h4>
          <code>D3 will go here</code>
        </div>
        <div className="column">
          <h4 className="title is-4">Oil and gas: revenue streams by project (2013)</h4>
          <code>D3 will go here</code>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Mining: companies (2013)</h4>
          <code>D3 will go here</code>
        </div>
        <div className="column">
          <h4 className="title is-4">Oil and gas: projects (2013)</h4>
          <code>D3 will go here</code>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Notes</h4>
          <p>Companies are listed in order of revenue contribution, for the year selected above using the time slider. Zero values signify data unavailable or no production. Oil figures were originally available in USD, but to allow for comparability, they have been converted to GHS at the Bank of Ghana annual average rate for each year.</p>
        </div>
        <div className="column">
          <h4 className="title is-4">Source</h4>
          <p>GHEITI website: <a href="http://gheiti.gov.gh/">http://gheiti.gov.gh/</a></p>
        </div>
        <div className="column">
          <h4 className="title is-4">Data</h4>
          <a href="#" className="button"> Disaggregated resource revenues</a>
        </div>
      </div>
    </section>
  </div>
);

CommoditiesComponent.propTypes = {}

CommoditiesComponent.defaultProps = {}

export default CommoditiesComponent
