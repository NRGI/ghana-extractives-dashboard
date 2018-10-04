import { nest } from 'd3-collection';

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