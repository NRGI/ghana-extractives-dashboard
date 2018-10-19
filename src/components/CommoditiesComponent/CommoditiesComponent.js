import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './CommoditiesComponent.scss'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import StackedAreaChart from '../StackedAreaChart/StackedAreaChart';
import { nest } from 'd3-collection';
import { prepVarVsYearChartData, getCurrencyValue } from '../../DataPrepHelpers';
import Select from 'react-select';
import ScrollableAnchor from 'react-scrollable-anchor';

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
      cName: this.props.cName
    }
  }

  static defaultProps = {
    range: [2004, 2014],
    cName: []
  }
  static propTypes = {
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    nestedColorScale: PropTypes.func,
    cName: PropTypes.arrayOf(PropTypes.string)
  }

  handleClearFilters() {
    const { cName, range } = this.props;

    this.setState({
      cName: cName,
      range: range
    })
  }
  handleFilter(cName, range) {

    const cNameArray = Array.isArray(cName) ? cName : [cName];

    console.log(cNameArray);
    const
      min = range[0] || 2004,
      max = range[1] || 2014;
    return this.props.companyPayments
      .filter(c => c.year >= min) // cut off minimum
      .filter(c => c.year <= max) // cutt off maximum
      .filter(c => cNameArray.length ? cNameArray.includes(c.commodity) : c) // if cName is selected, filter it else return the array as is
  }

  handleChange = () => {
    const { cName, range } = this.state;
    this.handleFilter(cName, range);
  }

  handleClear = () => {
    this.handleClearFilters();
  }

  handleLog = (msg) => console.log(msg);

  

  render() {
    const { uniqueCommodities, uniqueYears, currencyValue,
      uniquePaymentStreams, reusableNestedColorScale } = this.props;
    const isLoading = !!(this.props.companyPayments.length) ? false : true;

    console.log("rendering isLoading: " + !!isLoading);
    return (
      <ScrollableAnchor id="total-revenues-by-commodity">
        <div className="CommoditiesComponent">
          <div className="column">
            <h2 className="title is-3">Total Revenues by Commodity</h2>
            <div className="field has-addons">
              {!!isLoading
                ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
                :
                <div className="column control">
                  <label className="label">Use slider to select years to display. <br/>
                  Current selection: {this.state.range[0]} to {this.state.range[1]}</label>
                  <br />
                  <Range allowCross={false}
                    ref='year_slider'
                    defaultValue={[this.props.range[0], this.props.range[1]]}
                    min={this.props.range[0]}
                    max={this.props.range[1]}
                    tipFormatter={formatter()}
                    onAfterChange={(range) => this.setState({ range })}
                    tipProps={{ placement: 'top', prefixCls: 'rc-tooltip' }}
                    dots={true}
                    pushable={true}
                  />
                  <br />
                  <br />
                  <label className="label">Use dropdown list to select commodities to display</label>
                  <p>(If you select more than one commodity the revenue streams will be displayed in individual charts below the main chart)</p>
                  <div className="select">

                    <Select
                      ref='c_select'
                      onChange={(options) => {
                        this.handleLog(options);
                        const val = options.map(o => o.value);
                        this.setState({ cName: [...options.map(o => o.value)] });
                      }}
                      options={uniqueCommodities.map((commodity) => ({ value: commodity, label: commodity }))}
                      closeMenuOnSelect={false}
                      isMulti={true}
                      autosize={false}
                      placeholder={'All values shown when box is cleared...'}
                    // defaultValue={uniqueCommodities.map((commodity) => ({value: commodity, label: commodity}))}
                    />

                  </div>
                  {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                  <br />
                  <div className='chart'>
                    <StackedAreaChart
                      // data={this.prepChartData()} 
                      data={prepVarVsYearChartData(
                        'commodity',
                        currencyValue,
                        this.handleFilter(this.state.cName, this.state.range)
                      )}
                      uniqueCommodities={uniqueCommodities}
                      uniquePaymentStreams={uniquePaymentStreams}
                      uniqueYears={uniqueYears}
                      nestedColorScale={reusableNestedColorScale(uniqueCommodities)}
                      currencyValue={currencyValue}
                      size={[500, 500]} />
                  </div>
                  {/* {JSON.stringify(companyPayments)} */}
                  <div className="small-multiples-list">
                      {this.state.cName.length > 1 
                      ?
                        this.state.cName.map((item, index) => (
                        <div className="small-multiples-item">
                          <p>{item}</p>
                          <StackedAreaChart
                            // data={this.prepChartData()} 
                            data={prepVarVsYearChartData(
                              'commodity',
                              currencyValue,
                              this.handleFilter(item, this.state.range)
                            )}
                            uniqueCommodities={uniqueCommodities}
                            uniquePaymentStreams={uniquePaymentStreams}
                            uniqueYears={uniqueYears}
                            nestedColorScale={reusableNestedColorScale(uniqueCommodities)}
                            currencyValue={currencyValue}
                            size={[500, 200]} />
                        </div>
                        ))
                      : ''
                      }
                    </div>
                </div>

              }
            </div>
          </div>
        </div>
      </ScrollableAnchor>
    )
  }
}


export default CommoditiesComponent
