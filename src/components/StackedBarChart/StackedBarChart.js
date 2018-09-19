import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './StackedBarChart.scss'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'


class StackedBarChart extends Component {


  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  
  componentDidMount() {
    this.createBarChart()
  }
  
  componentDidUpdate() {
    this.createBarChart()
  }
  
  createBarChart() {
    const node = this.node
    const dataMax = max(this.props.data)
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])
  
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect")
  
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .exit()
      .remove()
  
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .style("fill", "#fe9922")
      .attr("x", (d,i) => i * 25)
      .attr("y", d => this.props.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", 25)
  }
  
  render() {
    return <svg className="StackedBarChart" ref={node => this.node = node}
        width={500} height={500}>
    </svg>
  }

  // constructor(props) {
  //   super(props)
  // }
  
  // render() {
  //   return (
  //     <div ></div>
  //   );
  // }
}

StackedBarChart.propTypes = {}

StackedBarChart.defaultProps = {}

export default StackedBarChart
