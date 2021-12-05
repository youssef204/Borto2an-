import SearchFlights from "./components/SearchFlights";
import Flight from "./components/AdminComponents/Flight";
import React, { useState } from "react";
import SearchResults from "./components/AdminComponents/SearchResults";
import AllFlights from "./components/AdminComponents/AllFlights";
import CreateFlight from "./components/AdminComponents/CreateFlight";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import FlightDetails from "./components/AdminComponents/FlightDetails";
import UpdateFlight from "./components/AdminComponents/UpdateFlight";
import UserSearchFlights from "./components/UserComponents/UserSearchFlights";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import CreateModel from "./components/AdminComponents/CreateModel";
import AllModels from "./components/AdminComponents/AllModels";
import FlightComponent from "./components/UserComponents/FlightComponents/FlightComponent";
import FlightsMenu from "./components/UserComponents/FlightsMenu";
import FlightSelection from "./components/UserComponents/FlightSelection";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FlightSeatsSelection from "./components/FlightSeatsSelection";
import User from "./components/UserComponents/User"
import Reservations from "./components/UserComponents/Reservations"
import ReservationDetails from "./components/UserComponents/ReservationDetails";
import TripSummary from "./components/UserComponents/TripSummary";
import ReservationSummary from "./components/UserComponents/ReservationSummary";
import SignIn from "./components/GuestComponents/SignIn";
import SignUp from "./components/GuestComponents/SignUp";
import UpdateUser from "./components/UserComponents/UpdateUser";


function App() {
  return (
    <>
      <Router>
        <NavBar></NavBar>
        <div>
          <Switch>
            {/* guest  */}
            <Route exact path='/Sign_up' component={SignUp}/>
            <Route exact path='/Sign_in' component={SignIn}/>

            {/* all */}
            <Route exact path="/" component={SearchFlights} />

            {/* admin */}
            <Route exact path="/flight" component={Flight} />
            <Route exact path="/all_flights" component={AllFlights} />
            <Route exact path="/create_flight" component={CreateFlight} />
            <Route exact path="/search_flights" component={SearchFlights} />
            <Route exact path="/search_results" component={SearchResults} />
            <Route exact path="/flight_details" component={FlightDetails} />
            <Route exact path="/update_flight" component={UpdateFlight} />
            <Route exact path="/create_model" component={CreateModel} />
            <Route exact path="/all_models" component={AllModels} />

            {/* user */}
            <Route exact path="/flight_selection" component={FlightSelection} />
            <Route exact path="/select_seats" component={FlightSeatsSelection} />
            <Route exact path="/user" component={User} />
            <Route exact path="/reservations" component={Reservations} />
            <Route exact path="/reservation_details" component={ReservationDetails} />
            <Route exact path="/reservation_summary" component={ReservationSummary} />
            <Route exact path="/update_user" component={UpdateUser} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
