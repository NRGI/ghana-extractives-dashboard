import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './BodyComponent.scss'
import 'react-toggle/style.css'
import CommoditiesComponent from '../CommoditiesComponent'
import CompaniesComponent from '../CompaniesComponent'
import CompaniesByCommodityComponent from '../CompaniesByCommodityComponent/CompaniesByCommodityComponent'
import CompanyRevenuesComparisonComponent from '../CompanyRevenuesComparisonComponent/CompanyRevenuesComparisonComponent';
import RevenueFlowsComponent from '../RevenueFlowsComponent/RevenueFlowsComponent';
// import ScrollableAnchor from 'react-scrollable-anchor';
import { reusableNestedColorScale } from '../../Scales';
import Toggle from 'react-toggle';

// const BodyComponent = ({ data, handleClearCompanyFilters, handleCompanyFilter, reusableNestedColorScale }) => {


class BodyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyValue: 'GHS',
      // cName: this.props.cName
    }
  }
// const BodyComponent = ({ data, reusableNestedColorScale }) => {
  
  handleCurrencyChange = (event) => {
    this.setState({currencyValue: (event.target.checked ? 'GHS' : 'USD')});
  }

  render() {
    const { uniqueCompanies, uniqueYears, uniqueCommodities, uniquePaymentStreams, 
      companyPayments, govtAgencies } = this.props.data;
    // const { reusableNestedColorScale } = this.props.reusableNestedColorScale;

    // const currencyValue = 'GHS';

    return (
      <div className="BodyComponent">
        <div className="container">
          {/* 
            <div classNames="columns">
              <div className="column is-8">
                <h2 className="title is-3">About this site</h2>
                <p>In many countries extractives data are becoming increasingly available from multiple sources: the World Bank, IMF, UNCTAD, ICTD datasets, EITI reports, national statistics and government reporting.<br />
                  The Ghana extractives dashboard visualises for CSOs, journalists and policy makers the impact of extractives on the economy by providing visualizations and a macro level overview.<br />
                  In the future, as more data becomes available, it could also provide granular detailed breakdowns of project activities.</p>
              </div> 
            <div>
            */}

          <div className="column">
            <label className='label'>Choose currency for charts</label>
            <p>You can set the charts to display values in Ghanaian Cedi (GHS) or US dollars (USD). </p>
            <br/>
            <label>
              <span className="toggle-wrapper">USD</span>
              <Toggle
                defaultChecked={true}
                icons={false}
                onChange={this.handleCurrencyChange} />
              <span className="toggle-wrapper">GHS</span>
            </label>
            <br/>
            <br/>
            <p>In 2007 Ghana revalued its currency from second generation cedi (GHC) to <a href='https://en.wikipedia.org/wiki/Ghanaian_cedi#Third_cedi_(GHS),_2007%E2%80%93_present'>
              third generation cedi (GHS)</a> at the rate of 10,000 GHC = 1 GHS. 
              The first EITI report that used third generatin cedi (GHS) was the 2005 report, 
              published in 2008. All the values in the charts are in third generation cedi (GHS).</p>
          </div>


          
          <hr />
          <CommoditiesComponent 
            uniqueCommodities={uniqueCommodities}
            uniqueYears={uniqueYears}
            uniquePaymentStreams={uniquePaymentStreams}
            companyPayments={companyPayments}
            reusableNestedColorScale={reusableNestedColorScale}
            cName={uniqueCommodities}
            currencyValue={this.state.currencyValue}
          />
          <hr />
          <CompaniesByCommodityComponent 
            uniqueCommodities={uniqueCommodities}
            uniqueYears={uniqueYears}
            uniqueCompanies={uniqueCompanies}
            uniquePaymentStreams={uniquePaymentStreams}
            companyPayments={companyPayments}
            reusableNestedColorScale={reusableNestedColorScale}
            currencyValue={this.state.currencyValue}
          />
          <hr />
          <CompaniesComponent
            uniqueCompanies={uniqueCompanies}
            uniqueYears={uniqueYears}
            uniquePaymentStreams={uniquePaymentStreams}
            companyPayments={companyPayments}
            reusableNestedColorScale={reusableNestedColorScale}
            currencyValue={this.state.currencyValue}
          />
          <hr />
          <RevenueFlowsComponent
            uniqueCommodities={uniqueCommodities}
            uniqueCompanies={uniqueCompanies}
            uniqueYears={uniqueYears}
            uniquePaymentStreams={uniquePaymentStreams}
            companyPayments={companyPayments}
            govtAgencies={govtAgencies}
            reusableNestedColorScale={reusableNestedColorScale}
            cName={uniqueCommodities}
            currencyValue={this.state.currencyValue}
          />
          <hr />
          <CompanyRevenuesComparisonComponent
            uniqueCommodities={uniqueCommodities}
            uniqueCompanies={uniqueCompanies}
            uniqueYears={uniqueYears}
            uniquePaymentStreams={uniquePaymentStreams}
            companyPayments={companyPayments}
            reusableNestedColorScale={reusableNestedColorScale}
            cName={uniqueCompanies}
            currencyValue={this.state.currencyValue}
          />
          <hr />
          {/* <ProductionComponent /> */}
          {/* <RevenuesComponent /> */}
          {/* <DataComponent /> */}
          {/* <div className="columns">
            <pre>{JSON.stringify(data)}</pre>
          </div> */}
        </div>
      </div>
    )
  }
};

BodyComponent.propTypes = {}

BodyComponent.defaultProps = {}

export default BodyComponent
