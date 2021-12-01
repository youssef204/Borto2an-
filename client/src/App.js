import SearchFlights from "./components/SearchFlights";
import Flight from "./components/Flight";
import React from "react";
import SearchResults from "./components/SearchResults";
import AllFlights from "./components/AllFlights";
import CreateFlight from "./components/CreateFlight";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FlightDetails from './components/FlightDetails';
import UpdateFlight from "./components/UpdateFlight";
import UserSearchFlights from "./components/UserSearchFlights"
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CreateModel from "./components/CreateModel";
import AllModels from './components/AllModels';
import FlightSeatsSelection from './components/FlightSeatsSelection';



function App() {
  return (
    <>
    <Router>
      <NavBar user={{name:'hesham',isAdmin:true}}></NavBar>
       <br/><br/><br/>
      <div>
        <Switch>
          <Route exact path='/' component={SearchFlights} />
          <Route exact path='/flight' component={Flight} />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
          <Route exact path='/search_flights' component={SearchFlights} />
          <Route exact path='/search_user_flights' component={UserSearchFlights} />
          <Route exact path='/search_results' component={SearchResults} />
          <Route exact path='/flight_details' component={FlightDetails} />
          <Route exact path="/update_flight" component={UpdateFlight} />
          <Route exact path="/create_model" component={CreateModel} />
          <Route exact path='/all_models' component={AllModels} />
          <Route exact path='/select_seats' component={FlightSeatsSelection} />


          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
