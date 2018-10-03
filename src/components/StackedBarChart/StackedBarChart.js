import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './StackedBarChart.scss'
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale'
import { stack } from 'd3-shape'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { default as tip } from 'd3-tip'
import _ from 'lodash';


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

  const { data, nestedColorScale, uniquePaymentStreams, uniqueYears } = this.props;

  const 
    margin = {top: 20, right: 20, bottom: 70, left: 100},
    height = 500,
    node = select(this.node);

  
  const z = nestedColorScale;
  // scaleOrdinal()
  //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
 
  // const data = this.props.data;

  let chartWidth = 50*(uniqueYears.length)
  let width = 50*(uniqueYears.length+2);
  let chartHeight = height - margin.bottom - margin.top;

  const x = scaleBand()
    .rangeRound([0, chartWidth])
    .paddingInner(0.05)
    .align(0.1);

  const y = scaleLinear()
    .rangeRound([chartHeight, 0]);

  // console.log(data);
  let keys = [];

  data.forEach(element => { 
    keys = keys.concat(
      _.keys(element)
      .filter(d => d !== 'year')
    );
  });

  keys = _(keys).uniq()
      .value()
      .sort();

  data.forEach(row => { 
    keys.forEach(key => {
      row[key] = +row[key] ? +row[key] : 0.;
    })
    row['total'] = 0.;

    _.keys(row).forEach(element => {
      if (element !== 'total' && element !== 'year')
        row['total'] += row[element];
    })
  })

  // console.log(keys);


  // var keys = data.keys;
  
  // // data.sort(function(a, b) { return b.total - a.total; });
  // x.domain(data.map(function(d) { return d.year; }));
  x.domain(uniqueYears);
  y.domain([0, max(data, function(d) { return d.total; })]).nice();
  // z.domain(keys);

  node.selectAll("g").remove();
  
  const g = node.append('g');


  let tooltip = tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      const [typel1,typel2] = d.type.split(' | ')
      return "<div style='background-color: rgba(255,255,255,0.7); padding:5px'><strong>Revenue type:</strong> " + typel1 + "</span>"
      + "<br/><strong>Revenue type detail:</strong> " + typel2
      + "<br/><strong>Revenue (GHA):</strong> " + format(",.0f")((d[1] - d[0]))
      + '</div>';
    })

  node.call(tooltip);
  

  g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .selectAll("g")
    .data(stack()
      .keys(() => {return keys})
      // .value((d,key) => {console.log(d[key]);return d[key];})
      (data)
    )
    .enter().append("g")
      .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(d => {
      const returnData = d.map((element) => {
        element.type = d.key;
        return element;
      })
      return returnData; 
    })
    .enter().append("rect")
      .attr("x", function(d) { return x(d.data.year); })
      .attr("y", function(d,key) { return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
      // .append("title").text((d) => {return "revenue type: " + d.type;})
      .on('mouseover', tooltip.show)
      .on('mouseout', tooltip.hide);


  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + chartHeight + ")")
      .call(axisBottom(x));

  g.append("g")
      .attr("class", "axis")
      .call(axisLeft(y).ticks(null, "s").tickFormat(format(",.0f")))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Revenue (GHS)");
  }
  
  render() {
    return <svg className="StackedBarChart" ref={node => this.node = node}
        width={700} height={500}>
    </svg>
  }
}

StackedBarChart.propTypes = {}

StackedBarChart.defaultProps = {}

export default StackedBarChart
