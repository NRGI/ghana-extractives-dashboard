import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import styles from './CompaniesComponent.scss'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
import { nest } from 'd3-collection';
import { prepVarVsYearChartData } from '../../DataPrepHelpers';

const Range = createSliderWithTooltip(Slider.Range);

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

class CompaniesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: this.props.range,
      companyName: this.props.companyName
    }
  }

  prepChartData = () => {
    const { companyName, range } = this.state;

    const chartData = this.handleCompanyFilter(companyName,range);

    const nestedByYear = nest()
      .key((d) => +d.year).entries(chartData);
    console.log(nestedByYear);
    const valuesByYear = nestedByYear.map(d => {
      const values = {};
      d.values.forEach(element => {
        values[element.clean_revenue_stream] = values[element.clean_revenue_stream] ?
          values[element.clean_revenue_stream] += element.value_reported : element.value_reported;
      });
      return {
        year: +d.key,
        ...values
      };
    });
    return valuesByYear;
  }

  handleClearFilters() {
    const { companyName, range } = this.defaultProps;

    this.setState({
      companyName: companyName,
      range: range
    })
  }
  handleFilter(companyName, range) {
    const
      min = range[0] || 2004,
      max = range[1] || 2014;
    return this.props.companyPayments
      .filter(company => company.year >= min) // cut off minimum
      .filter(company => company.year <= max) // cutt off maximum
      .filter(company => companyName.length ? company.company_name === companyName : company) // if companyName is selected, filter it else return the array as is
  }

  handleChange = () => {
    const { companyName, range } = this.state;
    this.handleFilter(companyName, range);
  }

  handleClear = () => {
    this.handleClearFilters()
    this.refs.company_select.value = this.props.companyName;
  }

  static defaultProps = {
    range: [2004, 2014],
    // companyName: 'Ghana Manganese Company Limited'
    companyName: ''
  }
  static propTypes = {
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    handleCompanyFilter: PropTypes.func,
    handleClearCompanyFilters: PropTypes.func,
    nestedColorScale: PropTypes.func,
    companyPayments: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { uniqueCompanies, uniqueYears, 
      uniquePaymentStreams, reusableNestedColorScale } = this.props;
    // console.log(this.state);
    // console.log(this.props);
    const isLoading = !!(this.props.companyPayments.length) ? false : true;

    console.log("rendering isLoading: " + !!isLoading);
    return (
      <div className="CompaniesComponent">
        <div className="column">
          <p>Companies Chart</p>
          <div className="field has-addons">
            {!!isLoading
              ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
              : 
                <div className="column control">

                <Range allowCross={false}
                  defaultValue={[this.props.range[0], this.props.range[1]]}
                  min={this.props.range[0]}
                  max={this.props.range[1]}
                  tipFormatter={formatter()}
                  onAfterChange={(range) => this.setState({ range })}
                  tipProps={{ placement: 'top', prefixCls: 'rc-tooltip', mouseLeaveDelay: 2 }}
                  pushable={true}
                />

                <div className="select">
                  <select ref="commodity_select" 
                    onChange={(event) => this.setState({ companyName: event.target.value })} 
                    onLoad={(event) => this.setState({ companyName: event.target.value })}
                    defaultValue={this.props.companyName}>
                    <option value="">No Filters</option>
                    {uniqueCompanies.map((company, index) => <option key={index} value={company}>{company}</option>)}
                  </select>

                </div>
                {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                <br />
                <StackedBarChart 
                  data={prepVarVsYearChartData(
                    'clean_revenue_stream',
                    'value_reported',
                    this.handleFilter(this.state.companyName,this.state.range)
                  )} 
                  uniqueCompanies={uniqueCompanies}
                  uniquePaymentStreams={uniquePaymentStreams}
                  uniqueYears={uniqueYears}
                  nestedColorScale={reusableNestedColorScale(uniquePaymentStreams)} 
                  size={[500,500]} />
                {/* {JSON.stringify(companyPayments)} */}
              </div>
              
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CompaniesComponent
