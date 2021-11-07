import React from 'react'
import axios from 'axios';
import Flight from './Flight';
import { Component } from 'react';

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
          airline={flight.airline}
          flightDate={flight.flightDate}
          onShowDetails={this.onChange}
        />
      ));
    }
    return (
      <body>
        <button onClick={() => this.props.history.push('/')}>
                Home
              </button>
              <br/><br/>
        <div>
            {flightlist}
        </div>
      </body>
    );
  }
}

export default SearchResults;
