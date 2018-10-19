import { nest } from 'd3-collection';
import _ from 'lodash';

const delimiter = ' | ';

export const prepVarVsYearChartDataByKey = (filterVar,value,chartData,filter) => {

  value = getCurrencyValue(value);
  const xyData = prepVarVsYearChartData(filterVar,value,chartData)
  // console.log(xyData);
  let keys = [];
  let returnData = {}; 

  if (!!xyData.length) {
    keys = xyData.map(entry => Object.entries(entry)
        .filter(d => !(['year','total'].includes(d[0])))
        .map(d => d[0])
      );
    
    keys = _(keys).flatten().uniq().value().sort();

    xyData.forEach(d => {
      // console.log(d);
      keys.forEach(k => {
        // console.log(k);
        if (returnData[k])
          returnData[k].push({'year':d.year, [k]: d[k]});
        else
          returnData[k] = [{'year':d.year, [k]: d[k]}];
      })
    })
  }

  // console.log(keys);
  // console.log(returnData);

  // return _(returnData).forEach((k,v) => ({'key': k, 'value': v}));
  return Object.entries(returnData).map(([key, value]) => ({key,value}));
}

export const prepVarVsYearChartData = (filterVar,value,chartData) => {
  // console.log(chartData);

  value = getCurrencyValue(value);
  
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

export const prepSankeyChartData = (data,value) => {
  const [fromData,toData] = data;
  // console.log(fromData);
  // console.log(toData);

  value = getCurrencyValue(value);

  let links = fromData.map(d => ({
    sourceName: d.company_name,
    targetName: d.clean_revenue_stream.split(delimiter)[1],
    value: d[value] 
  }));


  links = fromData.length ? links.concat(
    toData.map(d => ({
      sourceName: d.clean_revenue_stream.split(delimiter)[1],
      targetName: d.government_agency_name,
      value: d[value] 
    }))
    .filter(d => d.value > 0)
  ) : links

  let uniqueNodes = links.map(d => d.sourceName)
    .concat(links.map(d => d.targetName))

  uniqueNodes =  _(uniqueNodes).uniq().value().sort();

  // console.log(uniqueNodes);

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
  // console.log(nodes);
  // console.log(links);

  return {nodes: nodes, links: links}
}

export const getCurrencyValue = (currency) => {
  return currency === 'GHS' ? 'value_reported' : 'value_reported_as_USD';
}