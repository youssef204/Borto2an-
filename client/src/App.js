import CreateFlight from './components/createFlight';
import SearchFlights from './components/SearchFlights';
import Flight from "./components/Flight";
<<<<<<< HEAD
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { Component } from 'react';
import AllFlights from "./components/AllFlights";
import Test from "./components/Test";
import Testcomp  from "./components/Testcomp";
=======
import { BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import AllFlights from "./components/allFlights";
import SearchResults from './components/SearchResults';
>>>>>>> origin/dev

function App() {
  return (

    <Router>
<<<<<<< HEAD
      <div>
        <Route exact path='/' component={Flight} />
        <Route exact path='/All_Flights' component={AllFlights} />
        <Route exact path='/test' component={Test} />
        <Route exact path='/test2' component={Testcomp}/>
      </div>
    </Router>
=======
        <div>
          <Route exact path='/' component={Flight } />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
          <Route exact path='/search_flights' component={SearchFlights} />
          <Route exact path='/search_results' component={SearchResults} />

        </div>
      </Router> 
>>>>>>> origin/dev
  );

}

export default App;