import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import styles from './StackedBarChart.scss'
import { CSVLink } from "react-csv";
import { scaleLinear, scaleBand } from 'd3-scale'
import { stack } from 'd3-shape'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { default as tip } from 'd3-tip'
import _ from 'lodash';
import { makeLegend } from '../../DataPrepHelpers'


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

  const { data, nestedColorScale, uniqueYears } = this.props;

  const 
    margin = {top: 20, right: 25, bottom: 30, left: 100},
    height = this.props.size[1],
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
    .offset([0, 20])
    .direction(d => 'e')
    .html((d) => {
      let [typel1,typel2] = d.type.split(' | ')
      typel2 = typel2 ? typel2 : typel1;
      return "<div style='font-size:12px; background-color: rgba(255,255,255,0.7); padding:5px'><strong>" + typel2 + "</strong> </span>"
      // + "<br/><strong>Revenue type detail:</strong> " + typel2
      + "<br/><strong>Revenue ("+this.props.currencyValue+"):</strong> " + format(",.0f")((d[1] - d[0]))
      + '</div>';
    })

  node.call(tooltip);
  

  g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  g.append("g")
    .selectAll("g")
    .data(stack()
      .keys(() => {return keys})(data)
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
      // .attr("x", 2)
      // .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("x", -height/2)
      .attr("y", -100)
      .attr("transform", "rotate(-90)")
      .attr("dy", "1em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Revenue ("+this.props.currencyValue+")");


    makeLegend(keys,node,width,margin,nestedColorScale);

  }
  
  render() {
    return <div>
      <svg className="StackedBarChart" ref={node => this.node = node}
        width={1000} height={this.props.size[1]}>
      </svg>
      <br/>
      <CSVLink 
        data={this.props.data}
        filename={this.props.csvName+".csv"}>Download above chart's data as CSV</CSVLink>
      <br/>
      <br/>
    </div>
  }
}

StackedBarChart.propTypes = {}

StackedBarChart.defaultProps = {}

export default StackedBarChart
