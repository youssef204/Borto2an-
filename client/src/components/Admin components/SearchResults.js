import React from 'react';
import Flight from './Flight';
import { Component } from 'react';
import Header from '../Header';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        }
        this.setState({flights:this.props.history.location.state}); 


    }
   
    onChange = flightNumber => {
      this.props.history.push({
        pathname:"/flight_details",state:{flightNumber}
      });
    };
   
  render() {
 //   console.log(this.props.history.location.state)
    let flightlist = [] ; 
    const flights = this.props.history.location.state;
    console.log(flights); 

    if (!flights) {
      flightlist = <button>Hello here </button>;
    } else {
      flightlist = flights.map((flight) => (
        <Flight
          flightNumber={flight.flightNumber}
          fromAirport={flight.fromAirport}
          toAirport={flight.toAirport}
          departureTime={flight.departureTime}
          arrivalTime={flight.arrivalTime}
          onShowDetails={this.onChange}
        />
      ));
    }
    return (
      <body>
        <Header Title ="Search List"/>
        <br></br>
        <button onClick={() => this.props.history.push('/')}>
                Home
              </button>
              <br/><br/>
        <div>
        <table
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <tr>
              <th>Flight Number</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
            </tr>
            {flightlist}
            </table>
        </div>
      </body>
    );
  }
}

export default SearchResults;
