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

const Range = createSliderWithTooltip(Slider.Range);

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

class CompaniesComponent extends Component {
  constructor(props: CompaniesProps) {
    super(props);
    this.state = {
      range: this.props.range,
      companyName: this.props.companyName
    }
  }

  prepChartData = () => {
    console.log(this.props.companyPayments);
    // this.props.nestedColorScale(this.props.uniquePaymentStreams);

    // const nestedByPayment = nest()
    //   .key((d) => d.name_of_revenue_stream).entries(this.props.companyPayments);
    // console.log(nestedByPayment);
    // const valuesByPayment = nestedByPayment.map(d => {
    //   const values = {};
    //   d.values.forEach(element => {
    //     values[element.year] = values[element.year] ?
    //        values[element.year] += element.value_reported : element.value_reported;
    //   });
    //   console.log( {
    //     payment: d.key,
    //     ...values
    //   });
    //   // return d;
    //   return {
    //     payment: d.key,
    //     ...values
    //   };

    const nestedByYear = nest()
      .key((d) => +d.year).entries(this.props.companyPayments);
    console.log(nestedByYear);
    const valuesByYear = nestedByYear.map(d => {
      const values = {};
      d.values.forEach(element => {
        values[element.clean_revenue_stream] = values[element.clean_revenue_stream] ?
           values[element.clean_revenue_stream] += element.value_reported : element.value_reported;
      });
      // console.log( {
      //   key: +d.key,
      //   values: values
      // });
      // return d;
      return {
        year: +d.key,
        ...values
      };
    });
    // return this.props.companyPayments.map(d => d.value_reported);
    return valuesByYear;
  }

  handleChange = () => {
    const { companyName, range } = this.state;
    this.props.handleCompanyFilter(companyName, range);
  }

  handleClear = () => {
    const { handleClearCompanyFilters } = this.props;
    handleClearCompanyFilters()
    this.refs.company_select.value = this.props.companyName;
  }

  static defaultProps = {
    range: [2004, 2014],
    // companyName: 'Ghana Manganese Company Limited'
    companyName: ''
  }
  static propTypes = {
    isLoading: PropTypes.bool,
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    handleCompanyFilter: PropTypes.func,
    handleClearCompanyFilters: PropTypes.func,
    nestedColorScale: PropTypes.func,
    companyPayments: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { isLoading, uniqueCompanies, uniqueYears, uniquePaymentStreams, reusableNestedColorScale,
      handleClearCompanyFilters, companyPayments } = this.props;
    console.log(this.state);
    return (
      <div className="CompaniesComponent">
        <div className="column">
          <p>Companies Chart</p>
          <div className="field has-addons">
            {!!isLoading
              ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
              : <div className="column control">

                <Range allowCross={false}
                  defaultValue={[this.props.range[0], this.props.range[1]]}
                  min={this.props.range[0]}
                  max={this.props.range[1]}
                  tipFormatter={formatter()}
                  onAfterChange={(range) => this.setState({ range }, () => this.handleChange())}
                  tipProps={{ placement: 'top', prefixCls: 'rc-tooltip', mouseLeaveDelay: 2 }}
                  pushable={true}
                />

                <div className="select">
                  <select ref="company_select" 
                    onChange={(event) => this.setState({ companyName: event.target.value }, () => this.handleChange())} 
                    onLoad={(event) => this.setState({ companyName: event.target.value }, () => this.handleChange())}
                    defaultValue={this.props.companyName}>
                    <option value="">No Filters</option>
                    {uniqueCompanies.map((company, index) => <option key={index} value={company}>{company}</option>)}
                  </select>

                </div>
                {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                <br />
                <StackedBarChart 
                  data={this.prepChartData()} 
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
