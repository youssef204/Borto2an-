import Flight from "./components/Flight";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import AllFlights from "./components/allFlights";

function App() {
  return(

    <Router>
        <div>
          <Route exact path='/' component={Flight } />
          <Route exact path='/All_Flights' component={AllFlights} />
        </div>
      </Router> 
  );

  }

export default App;
