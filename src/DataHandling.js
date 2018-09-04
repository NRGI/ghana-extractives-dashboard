import * as d3 from 'd3';
import _ from 'lodash';
import Tabletop from 'tabletop';

// const cleanIncomes = (d) => ({
//   countyName: d['Name'],
//   USstate: d['State'],
//   medianIncome: Number(d['Median Household Income']),
//   lowerBound: Number(d['90% CI Lower Bound']),
//   upperBound: Number(d['90% CI Upper Bound'])
// });

// const dateParse = d3.timeParse("%m/%d/%Y");

// const cleanSalary = (d) => {
//   if (!d['base salary'] || Number(d['base salary']) > 300000) {
//     return null;
//   }

//   return {employer: d.employer,
//           submit_date: dateParse(d['submit date']),
//           start_date: dateParse(d['start date']),
//           case_status: d['case status'],
//           job_title: d['job title'],
//           clean_job_title: d['job title'],
//           base_salary: Number(d['base salary']),
//           city: d['city'],
//           USstate: d['state'],
//           county: d['county'],
//           countyID: d['countyID']
//   };
// }

// const cleanUSStateName = (d) => ({
//   code: d.code,
//   id: Number(d.id),
//   name: d.name
// });

export const loadAllData = () => {


  const files = [
    "https://www.resourcedata.org/dataset/e4f9dc35-7b68-4b41-90ee-3e2411e2fd8f/resource/9ddd590c-7d62-42b4-8744-868c481d58ae/download/company-payments-ghana.csv", 
    "https://www.resourcedata.org/dataset/e4f9dc35-7b68-4b41-90ee-3e2411e2fd8f/resource/cf360eda-5059-466b-84ac-2c86c33e878a/download/revenues-received-by-government-agencies-ghana.csv"
  ];
  
  // const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSP8mfh4AvMzNk7vzJKMBcJNzroaDBRx6-_Ep5gJDlJ2qxY-5GuKbCMezh_fkqXm408DqGqvk3mH1Zd/pubhtml?gid=1425666376&single=true';
  // const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1pXtvMC2OWBAjJvyGcQmBWBigqoPo3YaS4XnHbw_YhrM/edit#gid=1425666376';
  const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1pXtvMC2OWBAjJvyGcQmBWBigqoPo3YaS4XnHbw_YhrM/pubhtml';
  const promises = [];
  
  files.forEach(function(url) {
    promises.push(d3.csv(url))
  });
  
  promises.push(
    Tabletop.init( { key: publicSpreadsheetUrl,
      callback: (data) => promises.push(data),
      simpleSheet: true 
    })
  )

  
  return Promise.all(promises).then(function(values) {
    const result = {};  
    result.companyPayments = values[0];
    result.govtAgencies = values[1];
    result.commoditiesTabletopObj = values[2];
    console.log(result);
    return result;
  });
  
  // return data;
  
  // d3.queue()
  //   .defer(d3.csv, '')
  //   .defer(d3.csv, '')
  //   .await((error, companyPayments, govtAgencies) => {
  
  //     console.log(companyPayments);
  //     console.log(govtAgencies);

  // // callback({
  // //     usTopoJson: us,
  // //     countyNames: countyNames,
  // //     medianIncomes: medianIncomesMap,
  // //     medianIncomesByCounty: _.groupBy(medianIncomes, 'countyName'),
  // //     medianIncomesByUSState: _.groupBy(medianIncomes, 'USstate'),
  // //     techSalaries: techSalaries,
  // //     USstateNames: USstateNames
  // //   });

  //   });
};