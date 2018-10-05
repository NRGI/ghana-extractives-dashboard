import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './SankeyChart.scss'
import { stack, area, curveMonotoneX } from 'd3-shape'
import { max } from 'd3-array'
import { select, mouse, event } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { format } from 'd3-format'
import { default as tip } from 'd3-tip'
import { sankey, sankeyLinkHorizontal, sankeyRight } from 'd3-sankey'
import { drag } from 'd3-drag'
import _ from 'lodash';
import { scaleOrdinal, scaleBand } from 'd3-scale';
import { rgb } from 'd3-color';
import { schemeCategory10 } from 'd3-scale-chromatic'

class SankeyChart extends Component {
  constructor(props) {
    super(props)
    this.createSankeyChart = this.createSankeyChart.bind(this)
  }
    
  componentDidMount() {
    this.createSankeyChart()
  }
  
  componentDidUpdate() {
    this.createSankeyChart()
  }

  createSankeyChart() {
    // var units = "Widgets";
    const node = select(this.node);

    // // set the dimensions and margins of the graph
    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = this.props.size[0] - margin.left - margin.right,
        height = this.props.size[1] - margin.top - margin.bottom;
    
    // // format variables
    // var formatNumber = format(",.0f"),    // zero decimal places
    //     formatUsed = function(d) { return formatNumber(d) + " " + units; },
    //     color = scaleOrdinal(schemeCategory10);
    
    // // append the svg object to the body of the page
    // var svg = node.append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //     .attr("transform", 
    //           "translate(" + margin.left + "," + margin.top + ")");
    
    // // Set the sankey diagram properties
    // var sankeyChart = sankey()
    //     .nodeWidth(36)
    //     .nodePadding(40)
    //     .size([width, height]);
    
    // var path = sankeyChart.link();
    
    const tempData = {
      nodes:[
      {"node":0,"name":"node0"},
      {"node":1,"name":"node1"},
      {"node":2,"name":"node2"},
      {"node":3,"name":"node3"},
      {"node":4,"name":"node4"}
      ],
      links:[
      {"source":0,"target":2,"value":1},
      {"source":1,"target":2,"value":1},
      {"source":1,"target":3,"value":1},
      {"source":0,"target":4,"value":1},
      {"source":2,"target":3,"value":1},
      {"source":2,"target":4,"value":1},
      {"source":3,"target":4,"value":1.7}
      ]
    }

    // const data = tempData;
    const data = this.props.data;

    const formatter = (d) => {
      const f = format(",.0f");
      return d => `${f(d)} TWh`;
    }


    // const color = (name) => {
    //   console.log(name);
    //   const color = scaleOrdinal(schemeCategory10);
    //   return name => color(name.replace(/ .*/, ""));
    // }

    const color = '#348673';

    // const svg = select(DOM.svg(width, height))
    // const svg = node.append('g');
      // .style("width", "100%")
      // .style("height", "auto");

    const mappedData = {
      nodes: data.nodes.map(d => Object.assign({}, d)),
      links: data.links.map(d => Object.assign({}, d))
    }

    const {nodes, links} = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .nodeAlign(sankeyRight)
      .extent([[1, 1], [width - 1, height - 5]])(mappedData);
    

    console.log(nodes);
    console.log(links);

    node.selectAll("g").remove();

    node.append("g")
        // .attr("stroke", "#000")
      .selectAll("rect")
      .data(nodes)
      .enter().append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", color)
      .append("title")
        .text(d => d.name);

    const link = node.append('g')
        .attr("fill", "none")
        // .attr("stroke-opacity", 0.5)
      .selectAll(".link")
      .data(links)
      .enter().append("g");
        // .style("mix-blend-mode", "multiply");

    // const gradient = link.append("linearGradient")
    //     .attr("id", d => (d.uid = node.selectAll("link")).id)
    //     .attr("gradientUnits", "userSpaceOnUse")
    //     .attr("x1", d => d.source.x1)
    //     .attr("x2", d => d.target.x0);

    // gradient.append("stop")
    //     .attr("offset", "0%")
    //     .attr("stop-color", d => color(d.source.name));

    // gradient.append("stop")
    //     .attr("offset", "100%")
    //     .attr("stop-color", d => color(d.target.name));

    link.append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", color)
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", d => Math.max(1, d.width));

    link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}`);

    node.append("g")
        .style("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name);

    return node.node();

    // // load the data
    // const graph = tempData;
    
    //   sankey
    //       .nodes(graph.nodes)
    //       .links(graph.links)
    //       .layout(32);
    
    // // add in the links
    //   var link = svg.append("g").selectAll(".link")
    //       .data(graph.links)
    //     .enter().append("path")
    //       .attr("class", "link")
    //       .attr("d", path)
    //       .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    //       .sort(function(a, b) { return b.dy - a.dy; });
    
    // // add the link titles
    //   link.append("title")
    //         .text(function(d) {
    //         return d.source.name + " → " + 
    //                 d.target.name + "\n" + formatUsed(d.value); });
    
    // // add in the nodes
    //   var nodes = svg.append("g").selectAll(".node")
    //       .data(graph.nodes)
    //     .enter().append("g")
    //       .attr("class", "node")
    //       .attr("transform", function(d) { 
    //       return "translate(" + d.x + "," + d.y + ")"; })
    //       .call(drag()
    //         .subject(function(d) {
    //           return d;
    //         })
    //         .on("start", function() {
    //           this.parentNode.appendChild(this);
    //         })
    //         .on("drag", dragmove));
    
    // // add the rectangles for the nodes
    //   nodes.append("rect")
    //       .attr("height", function(d) { return d.dy; })
    //       .attr("width", sankey.nodeWidth())
    //       .style("fill", function(d) { 
    //       return d.color = color(d.name.replace(/ .*/, "")); })
    //       .style("stroke", function(d) { 
    //       return rgb(d.color).darker(2); })
    //     .append("title")
    //       .text(function(d) { 
    //       return d.name + "\n" + formatUsed(d.value); });
    
    // // add in the title for the nodes
    //   nodes.append("text")
    //       .attr("x", -6)
    //       .attr("y", function(d) { return d.dy / 2; })
    //       .attr("dy", ".35em")
    //       .attr("text-anchor", "end")
    //       .attr("transform", null)
    //       .text(function(d) { return d.name; })
    //     .filter(function(d) { return d.x < width / 2; })
    //       .attr("x", 6 + sankey.nodeWidth())
    //       .attr("text-anchor", "start");
    
    // // the function for moving the nodes
    //   function dragmove(d) {
    //     select(this)
    //       .attr("transform", 
    //             "translate(" 
    //                + d.x + "," 
    //                + (d.y = Math.max(
    //                   0, Math.min(height - d.dy, event.y))
    //                  ) + ")");
    //     sankey.relayout();
    //     link.attr("d", path);
    //   }
    
  }

  render() {
    return (
      <svg className="SankeyChart" ref={node => this.node = node}
        width={this.props.size[0]} height={this.props.size[1]}>
      </svg>
    );
  }
}

SankeyChart.propTypes = {}

SankeyChart.defaultProps = {}

export default SankeyChart
