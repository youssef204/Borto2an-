import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateFlight from './components/createFlight';

class App extends React.Component {
  render() {
    return (
	<Router>

		<Route exact path='/create_flight' component={CreateFlight} />
      		
	</Router>
    );
  }
}

export default App;