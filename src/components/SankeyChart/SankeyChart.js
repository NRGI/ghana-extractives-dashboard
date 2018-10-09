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
    
   
    const nodeWidth = 15;
    const nodePadding = 15;
    const shiftDown = 20;
    
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

    let tooltip = tip()
        .attr('class', 'd3-tip')
        .offset([0, 20])
        .direction(d => 'e')
        .html((d) => {
          console.log(d);
          if (d.name) {
            let outputs = d.sourceLinks ? d.sourceLinks.reduce((total, e) => total + e.value,0) : 0;
            let inputs = d.targetLinks ? d.targetLinks.reduce((total, e) => total + e.value,0) : 0;
            outputs = outputs ? "<br/><strong>Outputs (GHA):</strong> " + format(",.0f")(outputs) : "";
            inputs = inputs ? "<br/><strong>Inputs (GHA):</strong> " + format(",.0f")(inputs) : "";
            return "<div style='font-size:12px; background-color: rgba(255,255,255,0.7); padding:5px'><strong>" + d.name + "</strong> </span>"
            + inputs
            + outputs
            + '</div>';
          }
          else
            return "<div style='font-size:12px; background-color: rgba(255,255,255,0.7); padding:5px'><strong>" + d.sourceName + "</strong> to </span>"
            + "<br/><strong>" + d.targetName + "</strong> "
            + "<br/><strong>Revenue (GHA):</strong> " + format(",.0f")(d.value)
            + '</div>';
        })

    node.call(tooltip);

    const color = '#348673';


    const mappedData = {
      nodes: data.nodes.map(d => Object.assign({}, d)),
      links: data.links.map(d => Object.assign({}, d))
    }

    const {nodes, links} = sankey()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .nodeAlign(sankeyRight)
      .extent([[1, 1], [width - 1, height - 5]])(mappedData);
    

    // console.log(nodes);
    // console.log(links);

    node.selectAll("g").remove();

    node.append("g")
        // .attr("stroke", "#000")
      .attr("transform", "translate(0," + shiftDown + ")")
      .selectAll("rect")
      .data(nodes)
      .enter().append("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", color)
      .on('mouseover', tooltip.show)
      .on('mouseout', tooltip.hide);
      // .append("title")
        // .text(d => d.name);

    const link = node.append('g')
      .attr("transform", "translate(0," + shiftDown + ")")
        .attr("fill", "none")
        // .attr("stroke-opacity", 0.5)
      .selectAll(".link")
      .data(links)
      .enter().append("g");
        // .style("mix-blend-mode", "multiply");

    link.append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", color)
        .attr("stroke-opacity", 0.5)
        .attr("stroke-width", d => Math.max(1, d.width));

    link
      .on('mouseover', tooltip.show)
      .on('mouseout', tooltip.hide);
      // .append("title")
        // .text(d => `${d.source.name} → ${d.target.name}`);

    node.append("g")
        .style("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
        // .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("x", d => d.x0 < width / 2 ? d.x1 - nodeWidth : d.x0 + nodeWidth)
        // .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("y", d => d.y0 + 15)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
        .text(d => d.name);

    return node.node();

    
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
