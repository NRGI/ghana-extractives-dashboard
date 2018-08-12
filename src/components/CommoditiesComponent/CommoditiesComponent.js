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
      <input type="range" min="0" max="100" />
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
    <section className="section">
      <h3 className="title is-4">Company: Newmont Ghana Gold Ltd</h3>
      <div className="columns">
        <div className="column">
          <label className="">Select a company:</label>
          <select>
            <option>Options</option>
            <option>Go</option>
            <option>Here</option>
            <option>Not sure if API</option>
          </select>
        </div>
      </div>
      <div className="columns">
        <div className="column is-3">
          <h4 className="title is-4">About</h4>
          <p>
            New Zealand and Mexico. Of the 2013 consolidated gold production, approximately 36% came from North America, 19% from South America, 31% from Australia, 1% from Indonesia, and 13% from Africa essentially Ghana.
            <br />
            Ahafo (100% owned) is located in the Brong-Ahafo Region of Ghana, approximately 180 miles (290 kilometers) northwest of Accra. It operates four open pits at Ahafo with reserves contained in 11 pits and an underground mine presently in development. Commercial production in the fourth pit at Amoma, began in October 2010. The process plant consists of a conventional mill and carbon-in-leach circuit. Ahafo produced 570,000 ounces of gold in 2013, and at December 31, 2013, we reported 10.1 million ounces of gold reserves.
          </p>
        </div>
        <div className="column is-9">
          <h4 className="title is-4">Trend in revenue stream by project</h4>
          <code>D3 will go here</code>
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
        </div>
      </div>
    </section>
  </div>
);

CommoditiesComponent.propTypes = {}

CommoditiesComponent.defaultProps = {}

export default CommoditiesComponent
