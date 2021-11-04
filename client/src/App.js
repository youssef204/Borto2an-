import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateFlight from './components/createFlight';

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render() {
    return (
      <CreateFlight/>
    );
  }
}

export default App;