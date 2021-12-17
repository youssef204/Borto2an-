import React from "react";
import Flight from "./Flight";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { Component } from "react";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      minimumTime: false,
    };
    this.setState({ flights: this.props.history.location.state });
  }

  onChange = (flightNumber) => {
    this.props.history.push({
      pathname: "/flight_details",
      state: { flightNumber },
    });
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ minimumTime: true });
    }, 1000);
  }
  render() {
    //   console.log(this.props.history.location.state)
    let flightlist = [];
    const flights = this.props.history.location.state;
    console.log(flights);

    if (!flights) {
      flightlist = <button>Hello here </button>;
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
    const loadBody = (
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <Skeleton className="skeleton" />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
    let tableBody = this.state.minimumTime ? flightlist : loadBody;

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
              {tableBody}
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default SearchResults;
