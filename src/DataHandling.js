import * as d3 from 'd3';
import _ from 'lodash';
// import Tabletop from 'tabletop';
import sheetsy from 'sheetsy';

export const loadAllData = () => {

  const { urlToKey, getWorkbook, getSheet } = sheetsy;

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
  
  /* Get commodities data from Google sheet using sheetsy
  */
  promises.push(
    getWorkbook(urlToKey(publicSpreadsheetUrl))
    .then((workBook) => getSheet(
        urlToKey(publicSpreadsheetUrl),
        workBook.sheets[0].id
      )
    )
  )

  const reshapeCompanyPayments = (data,updatedNameLookUpSource) => {
    const reshapedData = data.map(d => {
      return {
        company_name: _.find(updatedNameLookUpSource.rows, o => o[2] === d.company_name)[3],
        currency_rate: handleGHSConversion(+d.currency_rate,+d.year),
        value_reported: handleGHSConversion(+d.value_reported,+d.year),
        value_reported_as_USD: +d.value_reported_as_USD,
        year: +d.year,
        name_of_revenue_stream: d.name_of_revenue_stream,
        gfs_code: d.gfs_code,
        gfs_description: d.gfs_description,
        org_id: getOrgId(d.reporting_url),
      } 
    });
    return reshapedData;
  }

  const lookupName = (updatedNameLookUpSource,company_name) => {
    // lookup updated company name from updatedNameLookUpSource.rows updated name is column 3
    //  old name is column 2
    updatedNameLookUpSource, o => o[2] === company_name)[3];
  }

  const reshapeGovtAgencies = (data) => {
    const reshapedData = data.map(d => {
      return {
        government_agency_name: d.government_agency_name,
        currency_rate: handleGHSConversion(+d.currency_rate,+d.year),
        value_reported: handleGHSConversion(+d.value_reported,+d.year),
        value_reported_as_USD: +d.value_reported_as_USD,
        year: +d.year,
        name_of_revenue_stream: d.name_of_revenue_stream,
        gfs_code: d.gfs_code,
        gfs_description: d.gfs_description,
        org_id: getOrgId(d.reporting_url),
      } 
    });
    return reshapedData;
  }

  const reshapeCommodities = (data) => {
    let reshapedData = [];
    
    data.rows.forEach(d => {
      reshapedData = reshapedData.concat( 
        d.year.split(',').map(year => {
          return {
            year: +year,
            commodity: d.commodity,
            original_name: d.originalname,
            updated_name: d.updatedname
          } 
        })
      )
    })
    return reshapedData;
  }

  const getUniqueYears = data => _(data).map(d => d.year)
                                        .uniq()
                                        .value()
                                        .sort();
  
  const getUniqueCompanies = data => _(data).map(d => d.company_name)
                                            .uniq()
                                            .value()
                                            .sort();
  
  const getUniqueCommodities = data => _(data).map(d => d.commodity)
                                              .uniq()
                                              .value()
                                              .sort();

  const getNestedCommoditiesCompanies = (data, comp, comd) => {
    return d3.nest()
      .key(d => d.commodity).sortKeys(d3.ascending)
      // .key(function(d) { return d.updated_name; }).sortKeys(d3.ascending)
      .rollup( d => _(d).map(d => d.updated_name)
                        .uniq()
                        .value()
                        .filter(d => d.length > 0)
                        .sort() 
      ) 
      .object(data);
  }

  // const snakeCaseConverter = d => d.replace(' ','_').toLowerCase();

  /** This converts second generation Ghanian  
   *  cedis to third gen Ghanian cedis. In 2007
   *  Ghana revalued its currency so that 
   *  10,000 GHS = 1 GHS.
   *  First EITI report that used third gen GHS
   *  was 2005 report, published in 2008
   *  https://eiti.org/document/2005-ghana-eiti-report 
  */
  const handleGHSConversion = (ghs,year) => year <= 2004 ? ghs/10000 : ghs;

  /** Gets organisation ID from the last bit of 
   *  the EITI API access URL.
  */
  const getOrgId = url => url.split("/").slice(-1)[0];
  
  return Promise.all(promises).then(function(values) {
    const result = {};  
    result.companyPayments = reshapeCompanyPayments(values[0],values[2]);
    result.govtAgencies = reshapeGovtAgencies(values[1]);
    result.commodities = reshapeCommodities(values[2]);
    result.uniqueYears = getUniqueYears(result.companyPayments);
    result.uniqueCompanies = getUniqueCompanies(result.companyPayments);
    result.uniqueCommodities = getUniqueCommodities(result.commodities);
    result.nestedCommoditiesCompanies = getNestedCommoditiesCompanies(
      result.commodities,
      result.uniqueCompanies,
      result.uniqueCommodities
    );
    // console.log(result);

    return result;
  });

};