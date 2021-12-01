import SearchFlights from "./components/SearchFlights";
import Flight from "./components/Flight";
import React from "react";
import SearchResults from "./components/SearchResults";
import AllFlights from "./components/AllFlights";
import CreateFlight from "./components/CreateFlight";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FlightDetails from './components/FlightDetails';
import UpdateFlight from "./components/UpdateFlight";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
    
        <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
          <Route exact path='/' component={SearchFlights} />
          <Route exact path='/flight' component={Flight} />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
          <Route exact path='/search_flights' component={SearchFlights} />
          <Route exact path='/search_results' component={SearchResults} />
          <Route exact path='/flight_details' component={FlightDetails} />
          <Route exact path="/update_flight" component={UpdateFlight} />

          <Route component={PageNotFound} />
        </Switch>
    </Router>
  );
}

export default App;
