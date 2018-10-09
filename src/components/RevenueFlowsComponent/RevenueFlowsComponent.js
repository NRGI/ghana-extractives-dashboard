import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './RevenueFlowsComponent.scss'
import Slider, { createSliderWithTooltip } from 'rc-slider'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';
import StackedAreaChart from '../StackedAreaChart/StackedAreaChart';
import { nest } from 'd3-collection';
import { prepSankeyChartData } from '../../DataPrepHelpers';
import Select from 'react-select';
import SankeyChart from '../SankeyChart/SankeyChart';
import ScrollableAnchor from 'react-scrollable-anchor';
const YearSlider = createSliderWithTooltip(Slider);

const formatter = (format) => {
  switch (format) {
    default:
      return value => value
  }
}

class RevenueFlowsComponent extends Component {
  constructor(props) {
    super(props);
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
    range = Array.isArray(range) ? range : [range];

    console.log(cNameArray);
    const
      yearPick = range[0] || 2004;
    return [
      this.props.companyPayments
        .filter(c => c.year === yearPick)
        .filter(c => cNameArray.length ? cNameArray.includes(c.company_name) : c),
      this.props.govtAgencies
        .filter(c => c.year === yearPick)
    ]
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
    cName: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    const { uniqueCommodities, uniqueYears, uniqueCompanies,
      uniquePaymentStreams, reusableNestedColorScale } = this.props;
    const isLoading = !!(this.props.companyPayments.length
      && this.props.govtAgencies.length) ? false : true;

    console.log("rendering isLoading: " + !!isLoading);

    return (
      <ScrollableAnchor id="company-and-government-revenue-flows">
        <div className="CommoditiesComponent">
          <div className="column">
            <h2 className="title is-3">Company and Government Revenue Flows</h2>
            <div className="field has-addons">
              {!!isLoading
                ? <ReactSVG src={LoadingBar} className="svg-container " svgClassName="loading-bars" />
                :
                <div className="column control">
                  <label className="label">Use slider to select year to display.  <br/>
                  Current selection: {!!this.state.range[0] ? this.state.range[0] :this.state.range}</label>
                  <br />
                  <p>(When you select a year, the chart will show the revenue flows from all the companies 
                  into various government departments in that year)</p>
                  <YearSlider
                    defaultValue={this.props.range[0]}
                    min={this.props.range[0]}
                    max={this.props.range[1]}
                    tipFormatter={formatter()}
                    onAfterChange={(range) => this.setState({ range })}
                    tipProps={{ placement: 'top', prefixCls: 'rc-tooltip' }}
                    dots={true}
                  />
                  <br />
                  <label className="label">Use dropdown list to to select companies to display</label>
                  <p>(When you select companies from the list, the flows on the right side of the chart 
                  will filter to show only the revenue flows from those companies, while the flows on the left
                  will still show all the flows of payments going into various government departments in the 
                  selected year. If the selected companies made no payments in that year, nothing will be shown)</p>
                  <div className="select">

                    <Select
                      onChange={(options) => {
                        this.handleLog(options);
                        const val = options.map(o => o.value);
                        this.setState({ cName: [...options.map(o => o.value)] });
                      }}
                      options={uniqueCompanies.map((company) => ({ value: company, label: company }))}
                      closeMenuOnSelect={false}
                      isMulti={true}
                      autosize={false}
                      placeholder={'All values shown when box is cleared...'}
                    // defaultValue={uniqueCommodities.map((commodity) => ({value: commodity, label: commodity}))}
                    />

                  </div>
                  {/* <button className="button" onClick={() => this.handleClear()}>Clear</button> */}
                  <br /><br /><br />
                  <div className='chart'>
                    {/* <StackedAreaChart 
                  // data={this.prepChartData()} 
                  data={prepVarVsYearChartData(
                    'commodity',
                    'value_reported',
                    this.handleFilter(this.state.cName,this.state.range)
                  )} 
                  uniqueCommodities={uniqueCommodities}
                  uniquePaymentStreams={uniquePaymentStreams}
                  uniqueYears={uniqueYears}
                  nestedColorScale={reusableNestedColorScale(uniqueCommodities)} 
                  size={[500,500]} /> */}
                    {/* </div> */}
                    {console.log(this.props.companyPayments, this.props.govtAgencies)}
                    <SankeyChart
                      data={prepSankeyChartData(
                        this.handleFilter(this.state.cName, this.state.range)
                      )}
                      size={[900, 500]} />
                  </div>

                  {/* {JSON.stringify(companyPayments)} */}
                </div>

              }
            </div>
          </div>
        </div>
      </ScrollableAnchor>
    )
  }
}

export default RevenueFlowsComponent
