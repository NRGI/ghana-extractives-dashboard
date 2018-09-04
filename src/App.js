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
  

  componentDidMount() {
    console.log('componentDidMount')
    this.getData()
  }

  
  getData(){
    loadAllData()
      .then(data=>
        this.setState({data:data}))
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
