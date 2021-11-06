import SearchFlights from './components/SearchFlights';
import Flight from './components/Flight';
import React from 'react';
import SearchResults from './components/SearchResults';
import AllFlights from "./components/AllFlights";
import CreateFlight from './components/CreateFlight';
import { BrowserRouter as Router, Route ,Switch } from 'react-router-dom';
import PageNotFound from "./components/PageNotFound";
import FlightDetails from './components/FlightDetails';

function App() {
  return (

    <Router>
        <div>
        <Switch>
          <Route exact path='/' component={SearchFlights} />
          <Route exact path='/flight' component={Flight} />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
          <Route exact path='/search_flights' component={SearchFlights} />
          <Route exact path='/search_results' component={SearchResults} />
          <Route exact path='/flight_details' component={FlightDetails} />
          <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router> 
  );

}

export default App;