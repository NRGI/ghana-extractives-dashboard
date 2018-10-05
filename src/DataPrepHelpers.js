import { nest } from 'd3-collection';
import _ from 'lodash';

const delimiter = ' | ';

export const prepVarVsYearChartData = (filterVar,value,chartData) => {
  // console.log(chartData);
  
  const nestedByYear = nest()
    .key((d) => +d.year).entries(chartData);
  // console.log(nestedByYear);
  const valuesByYear = nestedByYear.map(d => {
    const values = {};
    d.values.forEach(element => {
      // console.log(element[filterVar]);  
      values[element[filterVar]] = values[element[filterVar]] ?
        values[element[filterVar]] += element[value] : element[value];
    });
    return {
      year: +d.key,
      ...values
    };
  });
  return valuesByYear;
}

export const prepSankeyChartData = (data) => {
  const [fromData,toData] = data;
  console.log(fromData);
  console.log(toData);

  let links = fromData.map(d => ({
    sourceName: d.company_name,
    targetName: d.clean_revenue_stream.split(delimiter)[1],
    value: d.value_reported 
  }));


  links = links.concat(
    toData.map(d => ({
      sourceName: d.clean_revenue_stream.split(delimiter)[1],
      targetName: d.government_agency_name,
      value: d.value_reported 
    }))
    .filter(d => d.value > 0)
  )

  let uniqueNodes = links.map(d => d.sourceName)
    .concat(links.map(d => d.targetName))

  uniqueNodes =  _(uniqueNodes).uniq().value().sort();

  console.log(uniqueNodes);

  const nodes = uniqueNodes.map((d,i) => {
    links.forEach(l => {
      if(l.sourceName === d) l.source = i
      if(l.targetName === d) l.target = i
    })
    return {
      node: i,
      name: d
    }
  })
  console.log(nodes);
  console.log(links);

  return {nodes: nodes, links: links}
}