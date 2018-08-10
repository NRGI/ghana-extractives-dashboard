import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
class App extends Component {
  
  componentDidMount(){
    this.getData();
  }
  state={
    data: []
  }
  getData(){
    axios.get('https://www.resourcedata.org/api/3/action/datastore_search?resource_id=9ddd590c-7d62-42b4-8744-868c481d58ae&limit=50')
      .then(data=>this.setState({data: data}))
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Ghana Extracives Dashboard</h1>
        </header>
        {JSON.stringify(this.state.data)}
      </div>
    );
  }
}

export default App;
