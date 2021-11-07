import React from 'react'
import axios from 'axios';
import Flight from './Flight';
import { Component } from 'react';

class AllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:8000/api/flights/showAllflights')
            .then(res => {
                console.log(res.msg);
                this.setState(
                    {
                        flights: res.data
                    }
                )
          //      console.log(this.state.flights);
            })
            .catch(err => {
                console.log(err);
            })
            
    };

    onChange = flightNumber => {
      this.props.history.push({
        pathname:"/flight_details",state:{flightNumber}
      });
    };
  

  render() {
    let flightlist;
    const flights = this.state.flights;
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
          onShowDetails = {this.onChange}
        />
      ));
    }

    return (
      <body>
        <button onClick={() => this.props.history.push('/')}>
                Home
              </button>
              <br/>
        <div>
          <header
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            All Flights Page
          </header>
          <br></br>
          <br></br>
          <br></br>

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
              <th>Airline</th>
              <th>Flight Date</th>
            </tr>
            {flightlist}
          </table>
        </div>
      </body>
    );
  }
}

export default AllFlights;
