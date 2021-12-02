import SearchFlights from "./components/AdminComponents/SearchFlights";
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
import Login from "./components/GuestComponents/Login";
import Register from "./components/GuestComponents/Register";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FlightSeatsSelection from "./components/FlightSeatsSelection";
function App() {
  const [user, setUser] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [access, setAccess] = useState(0);

  const onLogin = (user, refresh, access) => {setUser(user); setRefresh(refresh); setAccess(access);}

  return (
    <>
      <Router>
        <NavBar user={user}></NavBar>
        <br />
        <br />
        <br />
        <div>
          <Switch>
            {/* guest  */}
            <Route exact path='/login' render={(props) => <Login {...props} user={user} onLogin={onLogin}/>}/>
            <Route exact path='/register' component={Register} />

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
            <Route exact path="/search_user_flights" component={UserSearchFlights}/>
            <Route exact path="/flight_component" component={FlightComponent} />
            <Route exact path="/flight_menu" component={FlightsMenu} />
            <Route exact path="/flight_selection" component={FlightSelection} />
            <Route exact path="/seat_selection" component={FlightSeatsSelection} />

            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
