// @flow
import React from 'react'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import styles from './CompaniesComponent.scss'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';

const Range = createSliderWithTooltip(Slider.Range);

type CompaniesProps = {
  isLoading: boolean,
  uniqueCompanies: [string],
  uniqueYears: [number],
  handleCompanyYearChange: Function,
  handleCompanySelectChange: Function,
  handleClearCompanyFilters: Function,
  companyPayments: [object]
}

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

const CompaniesComponent = ({
  companyPayments,
  uniqueCompanies = [],
  uniqueYears = [2004, 2014],
  handleClearCompanyFilters,
  handleCompanyFilter,
  isLoading }: CompaniesProps) => {
  const minYear = Math.min(...uniqueYears);
  const maxYear = Math.max(...uniqueYears);
  let range = [minYear, maxYear];
  let selectedCompany = '';
  return (
    <div className="CompaniesComponent">
      <div className="column">
        <p>Companies Chart</p>
        <div className="field has-addons">
          {!!isLoading
            ? <ReactSVG src={LoadingBar} className="svg-container "svgClassName="loading-bars" />
            : <div className="column control">
              <Range allowCross={false}
                defaultValue={[minYear, maxYear]}
                min={minYear}
                max={maxYear}
                tipFormatter={formatter()}
                onAfterChange={(rangeAfterChange) => {
                  range = rangeAfterChange;
                  handleCompanyFilter(selectedCompany, range)
                }}
                tipProps={{ placement: 'top', prefixCls: 'rc-tooltip', mouseLeaveDelay: 2 }}
                pushable={true}
              />
              <div className="select">
                <select onChange={(event) => { selectedCompany = event.target.value; handleCompanyFilter(selectedCompany, range) }} defaultValue="">
                  <option value="">No Filters</option>
                  {uniqueCompanies.map((company, index) => <option key={index} value={company}>{company}</option>)}
                </select>
              </div>
              <button className="button" onClick={() => { handleClearCompanyFilters() }}>Clear</button>
              <br/>
              {JSON.stringify(companyPayments)}
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default CompaniesComponent
