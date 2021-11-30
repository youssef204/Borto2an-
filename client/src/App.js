import SearchFlights from "./components/AdminComponents/SearchFlights";
import Flight from "./components/AdminComponents/Flight";
import React from "react";
import SearchResults from "./components/AdminComponents/SearchResults";
import AllFlights from "./components/AdminComponents/AllFlights";
import CreateFlight from "./components/AdminComponents/CreateFlight";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FlightDetails from './components/AdminComponents/FlightDetails';
import UpdateFlight from "./components/AdminComponents/UpdateFlight";
import UserSearchFlights from "./components/UserComponents/UserSearchFlights"
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CreateModel from "./components/AdminComponents/CreateModel";
import AllModels from './components/AdminComponents/AllModels';
import FlightComponent from "./components/UserComponents/FlightComponent";


function App() {
  return (
    <>
    <Router>
      <NavBar user={{name:'Hesham',isAdmin:true}}></NavBar>
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

          <Route exact path="/flight_component" component={FlightComponent} />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>

    </>
  );
}

export default App;
