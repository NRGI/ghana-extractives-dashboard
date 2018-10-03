import React , { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import styles from './CommoditiesComponent.scss'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import StackedAreaChart from '../StackedAreaChart/StackedAreaChart';
import { nest } from 'd3-collection';
import { prepVarVsYearChartData } from '../../DataPrepHelpers';
import Select from 'react-select';

const Range = createSliderWithTooltip(Slider.Range);

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

class CommoditiesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: this.props.range,
      commodityName: this.props.commodityName
    }
  }

  handleClearFilters() {
    const { commodityName, range } = this.defaultProps;

    this.setState({
      commodityName: commodityName,
      range: range
    })
  }
  handleFilter(commodityName, range) {

    const commodityNameArray = Array.isArray(commodityName) ? commodityName : [commodityName];

    console.log(commodityNameArray);
    const
      min = range[0] || 2004,
      max = range[1] || 2014;
    return this.props.companyPayments
      .filter(c => c.year >= min) // cut off minimum
      .filter(c => c.year <= max) // cutt off maximum
      .filter(c => commodityNameArray.length ? commodityNameArray.includes(c.commodity) : c) // if commodityName is selected, filter it else return the array as is
  }

  handleChange = () => {
    const { commodityName, range } = this.state;
    this.handleFilter(commodityName, range);
  }

  handleClear = () => {
    this.handleClearFilters()
    this.refs.commodity_select.value = this.props.commodityName;
  }

  handleLog = (msg) => console.log(msg);

  static defaultProps = {
    range: [2004, 2014],
    // companyName: 'Ghana Manganese Company Limited'
    commodityName: []
  }
  static propTypes = {
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    handleCompanyFilter: PropTypes.func,
    handleClearCompanyFilters: PropTypes.func,
    nestedColorScale: PropTypes.func,
    commodityName: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { uniqueCommodities, uniqueYears, 
      uniquePaymentStreams, reusableNestedColorScale } = this.props;
    // console.log(this.state);
    // console.log(this.props);
    const isLoading = !!(this.props.companyPayments.length) ? false : true;

    console.log("rendering isLoading: " + !!isLoading);
    return (
      <div className="CommoditiesComponent">
        <div className="column">
          <p>Commodities Chart</p>
          <div className="field has-addons">
            {!!isLoading
              ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
              : 
                <div className="column control">
                <p>Use slider to select years to display</p>
                <Range allowCross={false}
                  defaultValue={[this.props.range[0], this.props.range[1]]}
                  min={this.props.range[0]}
                  max={this.props.range[1]}
                  tipFormatter={formatter()}
                  onAfterChange={(range) => this.setState({ range })}
                  tipProps={{ placement: 'top', prefixCls: 'rc-tooltip', mouseLeaveDelay: 2 }}
                  pushable={true}
                />
                <br/>
                <p>Use dropdown box to to select commodities to display</p>
                <div className="select">
                  {/* <select ref="commodity_select" 
                    onChange={
                      (event) => this.setState({ commodityName: event.target.value === "" ? [] : event.target.value })
                      // (event) => {
                      //   let select = event.target.options;
                      //   let values = [].filter.call(select.options, o => o.selected).map(o => o.value);
                      //   this.setState({ commodityName: values });
                      // }
                    } 
                    onLoad={
                      (event) => this.setState({ commodityName: event.target.value === "" ? [] : event.target.value })
                      // (event) => {
                      //   let select = event.target.options;
                      //   let values = [].filter.call(select.options, o => o.selected).map(o => o.value);
                      //   this.setState({ commodityName: values });
                      // }
                    }
                    defaultValue={this.props.commodityName}>
                    <option value="">No Filters</option>
                    {uniqueCommodities.map((commodity, index) => <option key={index} value={commodity}>{commodity}</option>)}
                  </select> */}

                  <Select
                    // value={this.state.commodityName}
                    onChange={(options) => {
                      this.handleLog(options);
                      const val = options.map(o => o.value);
                      // if ( !this.state.commodityName.includes(val) )
                        this.setState({ commodityName: [...options.map(o => o.value)] });
                    }}
                    options={uniqueCommodities.map((commodity) => ({value: commodity, label: commodity}))}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    autosize={false}
                    placeholder={'All values shown when box is cleared...'}
                    // defaultValue={uniqueCommodities.map((commodity) => ({value: commodity, label: commodity}))}
                  />

                </div>
                {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                <br />
                <StackedAreaChart 
                  // data={this.prepChartData()} 
                  data={prepVarVsYearChartData(
                    'commodity',
                    'value_reported',
                    this.handleFilter(this.state.commodityName,this.state.range)
                  )} 
                  uniqueCommodities={uniqueCommodities}
                  uniquePaymentStreams={uniquePaymentStreams}
                  uniqueYears={uniqueYears}
                  nestedColorScale={reusableNestedColorScale(uniqueCommodities)} 
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


export default CommoditiesComponent
