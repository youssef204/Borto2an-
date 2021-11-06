import Flight from "./components/Flight";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import AllFlights from "./components/AllFlights";
import Test from "./components/Test";
import Testcomp  from "./components/Testcomp";

function App() {
  return (

    <Router>
      <div>
        <Route exact path='/' component={Flight} />
        <Route exact path='/All_Flights' component={AllFlights} />
        <Route exact path='/test' component={Test} />
        <Route exact path='/test2' component={Testcomp}/>
      </div>
    </Router>
  );

}

export default App;
