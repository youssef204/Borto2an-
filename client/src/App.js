import CreateFlight from './components/createFlight';
import Flight from "./components/Flight";
import { BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import AllFlights from "./components/allFlights";

function App() {
  return(

    <Router>
        <div>
          <Route exact path='/' component={Flight } />
          <Route exact path='/all_flights' component={AllFlights} />
          <Route exact path='/create_flight' component={CreateFlight} />
        </div>
      </Router> 
  );

  }

export default App;