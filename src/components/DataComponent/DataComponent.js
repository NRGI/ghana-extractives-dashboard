import React from 'react'
import PropTypes from 'prop-types'
import styles from './DataComponent.scss'

const DataComponent = ({ }) => (
  <div className="DataComponent">
    <section className="section">
      <h3 className="title is-3">Data</h3>
      <p className="subtitle is-3">You can download all the data used on this Dashboard here.</p>
      <div className="">
        <table className="table is-fluid is-fullwidth">
          <thead>
            <tr>
              <td>File</td>
              <td>Description</td>
              <td>Download</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Disaggregated resource revenues</td>
              <td>Contains detailed breakdown of resource revenues by revenue stream, company, and commodity.
              <br />Source: EITI reports</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Resource volume production</td>
              <td>Contains summary volume produced by each project, disaggregated by location, year, commodity and company.
                <br />Source: EITI reports</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Government debt</td>
              <td>General gross government debt, in GHS.
<br />Source: International Monetary Fund, World Economic Outlook Database, April 2015. Variable: GGXWDG</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Petroleum account</td>
              <td>Accumulation in Ghana Petroleum Funds<br />
                Source: <a href="http://www.mofep.gov.gh/sites/default/files/reports/petroleum/2014_Reconciliation_Report_on_the_Petroleum_Holding_Fund.pdf" target="_blank">2014 Reconciliation Report on the Petroleum Holding Fund,</a> p20</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Total extractives revenues</td>
              <td>Summary amounts of extractives revenues in Ghana.
              <br />Source:<a href="" target="_blank">EITI website</a></td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Government expenditure</td>
              <td>General Government total expenditure.<br />
                Source: IMF WEO April 2015. Subject code: GGX</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>Government revenues</td>
              <td>General government revenue.<br />Source: IMF WEO April 2015. Subject code: GGR</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>GHEITI publications</td>
              <td> 	Original GHEITI publications contain source data and methodology. They also indicate fiscal regime changes which relate to the sharp increases in revenues from 2010.</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
            <tr>
              <td>User guide</td>
              <td>A brief user guide which explains the functionality of this site, and how you can access the raw source data.</td>
              <td><a href="" className="button">:Download:</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
);

DataComponent.propTypes = {}

DataComponent.defaultProps = {}

export default DataComponent
