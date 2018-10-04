import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './StackedAreaChart.scss'
import { scaleLinear, scaleBand, scaleOrdinal, scaleQuantize } from 'd3-scale'
import { stack, area, curveMonotoneX } from 'd3-shape'
import { max } from 'd3-array'
import { select, mouse } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { default as tip } from 'd3-tip'
import _ from 'lodash';

class StackedAreaChart extends Component {

  constructor(props){
    super(props)
    this.createAreaChart = this.createAreaChart.bind(this)
  }
  componentDidMount() {
    this.createAreaChart()
  }
  
  componentDidUpdate() {
    this.createAreaChart()
  }

  createAreaChart() {

  const { data, nestedColorScale, uniquePaymentStreams, uniqueYears } = this.props;

  const 
    margin = {top: 20, right: 20, bottom: 70, left: 100},
    height = this.props.size[1],
    node = select(this.node);

  
  const z = nestedColorScale;

  let chartWidth = 50*(uniqueYears.length)
  let width = 50*(uniqueYears.length+2);
  let chartHeight = height - margin.bottom - margin.top;

  const x = scaleBand()
    .rangeRound([0, chartWidth])
    .paddingInner(0.05)
    .align(0.1);


  const scaleBandInvert = (scale) => {
    var domain = scale.domain();
    var paddingOuter = scale(domain[0]);
    var eachBand = scale.step();
    return function (value) {
      var index = Math.floor(((value - paddingOuter) / eachBand));
      return domain[Math.max(0,Math.min(index, domain.length-1))];
    }
  }

  

  // const xInvert = scaleBandInvert(x);
//   x.invert = (function(){
//     var domain = x.domain()
//     var range = x.range()
//     var scale = scaleQuantize().domain(range).range(domain)

//     return function(x){
//         return scale(x)
//     }
// })()

  const y = scaleLinear()
    .rangeRound([chartHeight, 0]);

  console.log(data);
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

  // var keys = data.keys;
  
  // // data.sort(function(a, b) { return b.total - a.total; });
  // x.domain(data.map(function(d) { return d.year; }));
  x.domain(uniqueYears);
  y.domain([0, max(data, function(d) { return d.total; })]).nice();
  // z.domain(keys);

  const areaLayer = area()
    .x((d, i) =>{ return x(d.data.year); })
    .y0((d) => { return y(d[0]); })
    .y1((d) => { return y(d[1]); })
    .curve(curveMonotoneX);


  node.selectAll("g").remove();
  
  const g = node.append('g');


  let tooltip = tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html((d) => {
      const context = node.selectAll("g")['_groups'];
      const year = scaleBandInvert(x)(mouse(context[0][0])[0]+25);

      const value = data[_.findIndex(data, ['year', year])][d.key];
      // const [typel1,typel2] = d.type.split(' | ')
      return "<div style='background-color: rgba(255,255,255,0.7); padding:5px'><strong>" + d.key + "</strong> </span>"
      + "<br/><strong>Year:</strong> " + year
      + "<br/><strong>Revenue (GHA):</strong> " + format(",.0f")(value)
      + '</div>';
    })

  node.call(tooltip);
  

  g.attr("transform", "translate(" + (margin.left)+ "," + margin.top + ")");

  g.append("g")
    .selectAll("g")
    .data(stack()
      .keys(() => {return keys})
      // .value((d,key) => {console.log(d[key]);return d[key];})
      (data)
    )
    .enter().append("g")
      // .attr("fill", function(d) { return z(d.key); })
      .append("path")
      .attr("class", "area")
      .attr("transform", "translate(" + (25)+ "," + 0 + ")")
      .style("fill", function(d) { return z(d.key); })
      .attr("d", areaLayer)
      // .on('mouseover', function(d) { tooltip.show(d,node.selectAll("g")['_groups']) } )
      .on('mousemove', tooltip.show)
      .on('mouseout', tooltip.hide);

    // .selectAll("rect")
    // .data(d => {
    //   const returnData = d.map((element) => {
    //     element.type = d.key;
    //     return element;
    //   })
    //   return returnData; 
    // })
    // .enter().append("rect")
    //   .attr("x", function(d) { return x(d.data.year); })
    //   .attr("y", function(d,key) { return y(d[1]); })
    //   .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    //   .attr("width", x.bandwidth())
    //   // .append("title").text((d) => {return "revenue type: " + d.type;})
    //   .on('mouseover', tooltip.show)
    //   .on('mouseout', tooltip.hide);


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
    return <svg className="StackedAreaChart" ref={node => this.node = node}
        width={700} height={this.props.size[1]}>
    </svg>
  }
}

StackedAreaChart.propTypes = {}

StackedAreaChart.defaultProps = {}

export default StackedAreaChart
