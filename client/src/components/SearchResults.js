import React from 'react'
import axios from 'axios';
import Flight from './Flight';
import { Component } from 'react';
import Header from './Header';

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
    let flightlist ; 
    const flights = this.props.history.location.state;
  //  console.log(flights); 

    if (!flights) {
      flightlist = "there is no flights !";
    } else {
      flightlist = flights.map((flight) => (
        <Flight
          flightNumber={flight.flightNumber}
          from={flight.from}
          to={flight.to}
          seatsAvailable={flight.seatsAvailable}
          flightDate={flight.flightDate}
          cabin = {flight.cabin}
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
              <th>From</th>
              <th>To</th>
              <th>Seats Available</th>
              <th>Flight Date</th>
              <th>Cabin</th>
            </tr>

            {flightlist}
            </table>
        </div>
      </body>
    );
  }
}

export default SearchResults;
