import * as d3 from 'd3';
import _ from 'lodash';
import { isNullOrUndefined } from 'util';

const ghanaScale = ['#f09b37','#348673','#febe0c','#b81251','#1d4677','#009B3A']

export const reusableNestedColorScale = (domain, delimiter = ' | ') => {
  // const accent = d3.scaleOrdinal(d3.schemeAccent);

  const levels = {};
  // let baseScheme = d3.schemeDark2;
  let baseScheme = ghanaScale;
  domain.forEach(d => {
    const [lOne, lTwo] = d.split(delimiter);
    
    if (levels.hasOwnProperty(lOne)) {
      levels[lOne].push(lTwo);
    } else {
      levels[lOne] = [lTwo];
    }
  });
  const level1Vals = Object.keys(levels);
  // const level2Vals = _(levels.map(d => d[1])).uniq().value().sort();
  

  const huePicker = (hue) => d3.interpolateHcl(d3.color(hue), d3.color(hue).brighter().brighter());

  return d3.scaleOrdinal()
    .domain(domain)
    .range( (() => {

      let dualRange = baseScheme.map((c1,i1) => {
        let pick = i1 % level1Vals.length;
        const level2Vals = levels[level1Vals[pick]];
        const innerRange = level2Vals.map( (c2,i2) => i2*1.0/level2Vals.length );
        return innerRange.map(d => huePicker(baseScheme[pick])(d));
      });

      dualRange = _(dualRange).flatten().value();
      // console.log(dualRange);
      // console.log(levels)

      return dualRange;
    })() );
}