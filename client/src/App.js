import Flight from "./components/Flight";
import { BrowserRouter as Router, Route ,Switch } from 'react-router-dom';
import React, { Component } from 'react';
import AllFlights from "./components/allFlights";
import PageNotFound from "./components/PageNotFound";

function App() {
  return(

    <Router>
        <div>
          <Switch>
          <Route exact path='/' component={Flight } />
          <Route exact path='/All_Flights' component={AllFlights} />
          <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router> 
  );

  }

export default App;
