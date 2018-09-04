import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import axios from 'axios';
import NavigationComponent from './components/NavigationComponent';
import HeroComponent from './components/HeroComponent';
import BodyComponent from './components/BodyComponent';
import FooterComponent from './components/FooterComponent';
import { loadAllData } from './DataHandling';

class App extends Component {
  
  state={
    data: []
  }
  
  componentWillMount(){
    this.getData();
  }

  componentDidMount() {
    console.log(this.state);
  }

  
  getData(){
    // axios.get('https://www.resourcedata.org/api/3/action/datastore_search?resource_id=9ddd590c-7d62-42b4-8744-868c481d58ae')
    //   .then(data=>this.setState({data: data}))
    //   .catch(error => alert(error))
    //   .then(()=>console.log(this.state.data))

    // loadAllData(data => this.setState({data: data}));
    this.setState({data: loadAllData()});
  }

  render() {
    return (
      <div className="App">
        <NavigationComponent />
        <HeroComponent />
        <BodyComponent data={this.state.data}/>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
