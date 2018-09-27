import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import axios from 'axios';
import NavigationComponent from './components/NavigationComponent';
import HeroComponent from './components/HeroComponent';
import BodyComponent from './components/BodyComponent';
import FooterComponent from './components/FooterComponent';
import { loadAllData } from './DataHandling';
import { reusableNestedColorScale } from './Scales';

class App extends Component {

  state = {
    data: [],
    mutatedData: {
      companyPayments: []
    }
  }

  componentDidMount() { this.getData() }

  getData() {
    loadAllData()
      .then(data =>
        // set initial data
        this.setState({ data },
          () => {
            // set mutated data to initial data on load so filters can access data changes
            this.setState({ mutatedData: this.state.data },
              () => console.log(`(mutatedData === data) : ${this.state.mutatedData === this.state.data}`))
          }
        ))
  }

  handleClearCompanyFilters() {
    this.setState({
      mutatedData: {
        ...this.state.mutatedData,
        companyPayments: this.state.data.companyPayments
      }
    })
  }
  handleCompanyFilter(companyName, range) {
    const
      min = range[0] || 2004,
      max = range[1] || 2014;
    const { companyPayments } = this.state.data;
    const filteredCompanyPayments = companyPayments
      .filter(company => company.year >= min) // cut off minimum
      .filter(company => company.year <= max) // cutt off maximum
      .filter(company => companyName.length ? company.company_name === companyName : company) // if companyName is selected, filter it else return the array as is
      
    this.setState({
      mutatedData: {
        ...this.state.mutatedData,
        companyPayments: [...filteredCompanyPayments]
      }
    })
  }
  render() {
    return (
      <div className="App">
        <NavigationComponent />
        <HeroComponent />
        <BodyComponent
          data={this.state.mutatedData}
          handleClearCompanyFilters={this.handleClearCompanyFilters.bind(this)}
          handleCompanyFilter={this.handleCompanyFilter.bind(this)}
          reusableNestedColorScale={reusableNestedColorScale}
        />
        <FooterComponent />
      </div>
    );
  }
}

export default App;
