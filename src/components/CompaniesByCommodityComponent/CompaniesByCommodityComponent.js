import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './CompaniesByCommodityComponent.scss'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import StackedBarChart from '../StackedBarChart/StackedBarChart';
// import { nest } from 'd3-collection';
import { prepVarVsYearChartData, prepVarVsYearChartDataByKey, getCurrencyValue, fixFileName } from '../../DataPrepHelpers';
import Select from 'react-select';
import ScrollableAnchor from 'react-scrollable-anchor';

const Range = createSliderWithTooltip(Slider.Range);

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

class CompaniesByCommodityComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      range: this.props.range,
      cName: this.props.cName
    }
  }

  handleClearFilters() {
    const { cName, range } = this.defaultProps;

    this.setState({
      cName: cName,
      range: range
    })
  }
  handleFilter(cName, range) {

    const cNameArray = Array.isArray(cName) ? cName : [cName];

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
    this.handleClearFilters()
    this.refs.c_select.value = this.props.cName;
  }

  handleLog = (msg) => console.log(msg);

  static defaultProps = {
    range: [2004, 2014],
    cName: []
  }
  static propTypes = {
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    nestedColorScale: PropTypes.func,
    companyPayments: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { uniqueCompanies, uniqueYears, uniqueCommodities, currencyValue,
      uniquePaymentStreams, reusableNestedColorScale } = this.props;
    const isLoading = !!(this.props.companyPayments.length) ? false : true;

    console.log("rendering isLoading: " + !!isLoading);

    const customStyles = (height = 40) => {
      return {
        container: (base) => ({
          ...base,
          display: 'inline-block',
        }),
        valueContainer: (base) => ({
          ...base,
          minHeight: height,
        })
      }
    }
    return (
      <ScrollableAnchor id="company-revenues-by-commodity">
        <div className="CompaniesByCommodityComponent">
          <div className="column">
            <h2 className="title is-3">Company Revenues by Commodity</h2>
            <div className="field has-addons">
              {!!isLoading
                ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
                :
                <div className="column control">
                  <p>This chart breaks down the revenues from different commodities according to the companies that are involved in extracting that commodity.</p>
                  <br/>
                  <label className="label">Use slider to select years to display. <br/>
                  Current selection: {this.state.range[0]} to {this.state.range[1]}</label>
                  <br />
                  <Range allowCross={false}
                    defaultValue={[this.props.range[0], this.props.range[1]]}
                    min={this.props.range[0]}
                    max={this.props.range[1]}
                    tipFormatter={formatter()}
                    onAfterChange={(range) => this.setState({ range })}
                    tipProps={{ placement: 'top', prefixCls: 'rc-tooltip'}}
                    dots={true}
                    pushable={true}
                  />
                  <br />
                  <label className="label">Use dropdown list to to select commodities to display</label>
                  <p>(If you select more than one commodity, the revenue streams from various commodities 
                  will be combined. When the selected commodities have more than company associated with it,
                   each comapany's revenue stream will be displayed in individual charts below the main chart)</p>

                  <div className="select">
                    <Select
                      // value={this.state.commodityName}
                      onChange={(options) => {
                        this.handleLog(options);
                        // const val = options.map(o => o.value);
                        // if ( !this.state.commodityName.includes(val) )
                        this.setState({ cName: [...options.map(o => o.value)] });
                      }}
                      options={uniqueCommodities.map((c) => ({ value: c, label: c }))}
                      closeMenuOnSelect={false}
                      isMulti={true}
                      autosize={false}
                      styles={customStyles}
                      placeholder={'All values shown when box is cleared...'}
                    // defaultValue={uniqueCommodities.map((commodity) => ({value: commodity, label: commodity}))}
                    />
                  </div>
                  {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                  <br />
                  <div className='chart'>
                    <StackedBarChart
                      data={prepVarVsYearChartData(
                        'company_name',
                        currencyValue,
                        this.handleFilter(this.state.cName, this.state.range)
                      )}
                      uniqueCompanies={uniqueCompanies}
                      uniquePaymentStreams={uniquePaymentStreams}
                      uniqueYears={uniqueYears}
                      nestedColorScale={reusableNestedColorScale(uniqueCompanies)}
                      currencyValue={currencyValue}
                      size={[500, 500]}
                      csvName={fixFileName("Company Revenues by Commodity")} />
                  </div>
                  {/* {JSON.stringify(companyPayments)} */}
                  <div className="small-multiples-list">
                      {(prepVarVsYearChartDataByKey('company_name',getCurrencyValue(getCurrencyValue(currencyValue)),
                          this.handleFilter(this.state.cName, this.state.range)).length > 1 
                        && this.state.cName.length > 0)
                      ?
                        prepVarVsYearChartDataByKey('company_name',currencyValue,
                          this.handleFilter(this.state.cName, this.state.range))
                          .map((item, index) => (
                        <div className="small-multiples-item">
                          <p>{item.key}</p>
                          <StackedBarChart
                            // data={this.prepChartData()} 
                            data={item.value}
                            uniqueCommodities={uniqueCommodities}
                            uniquePaymentStreams={uniquePaymentStreams}
                            uniqueYears={uniqueYears}
                            nestedColorScale={reusableNestedColorScale(uniqueCompanies)}
                            currencyValue={currencyValue}
                            size={[500, 200]}
                            csvName={fixFileName(item.key)} />
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
    );
  }
}

export default CompaniesByCommodityComponent
