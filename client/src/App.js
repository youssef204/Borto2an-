import CreateFlight from './components/createFlight';
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
          <Route exact path='/create_flight' component={CreateFlight} />
        </div>
      </Router> 
  );

  }

export default App;