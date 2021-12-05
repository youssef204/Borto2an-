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
            .get('http://localhost:8000/api/flights/showAllflights',{
              headers:{"authorization":"Bearer "+localStorage.getItem("token")}
            })
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
            });
            
    };

    onChange = flightNumber => {
      console.log(flightNumber); 
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
          fromAirport={flight.departure.airport}
          toAirport={flight.arrival.airport}
          departureTime={flight.departure.time}
          arrivalTime={flight.arrival.time}
          onShowDetails={this.onChange}
        />
      ));
    }

    return (
      <section>
        <div class="tbl-header">
          <table>
              <th>Flight Number</th>
              <th>Departure Airport</th>
              <th>Arrival Airport</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Show all details</th>

          </table>
          <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
          {flightlist}
          </table>
          </div>
        </div>
      </section>
    );
  }
}

export default AllFlights;