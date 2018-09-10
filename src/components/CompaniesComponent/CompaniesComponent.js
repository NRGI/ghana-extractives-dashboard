import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider, { createSliderWithTooltip } from 'rc-slider';
import styles from './CompaniesComponent.scss'
import ReactSVG from 'react-svg'
import LoadingBar from 'loading-svg/loading-bars.svg'
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap_white.css';

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

  handleChange = () => {
    const { companyName, range } = this.state;
    this.props.handleCompanyFilter(companyName, range);
  }

  handleClear = () => {
    const { handleClearCompanyFilters } = this.props;
    handleClearCompanyFilters()
  }

  static defaultProps = {
    range: [2004, 2014],
    companyName: ''
  }
  static propTypes = {
    isLoading: PropTypes.bool,
    uniqueCompanies: PropTypes.arrayOf(PropTypes.string),
    uniqueYears: PropTypes.arrayOf(PropTypes.number),
    handleCompanyFilter: PropTypes.func,
    handleClearCompanyFilters: PropTypes.func,
    companyPayments: PropTypes.arrayOf(PropTypes.object)
  }

  render() {
    const { isLoading, uniqueCompanies, handleClearCompanyFilters, companyPayments } = this.props;
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
                  <select onChange={(event) => this.setState({ companyName: event.target.value }, () => this.handleChange())} defaultValue="">
                    <option value="">No Filters</option>
                    {uniqueCompanies.map((company, index) => <option key={index} value={company}>{company}</option>)}
                  </select>
                </div>
                <button className="button" onClick={() => this.handleClear()}>Clear</button>
                <br />
                {JSON.stringify(companyPayments)}
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CompaniesComponent
