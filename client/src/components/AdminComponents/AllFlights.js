import React from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import Flight from "./Flight";
import { Component } from "react";

class AllFlights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      loading: true,
      minimumTime: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/flights/showAllflights", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.setState({
          flights: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      this.setState({ minimumTime: true });
    }, 1000);
    console.log("here");
  }

  onChange = (flightNumber) => {
    console.log(flightNumber);
    this.props.history.push({
      pathname: "/flight_details",
      state: { flightNumber },
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
    let tableBody =
      this.state.minimumTime && !this.state.loading ? flightlist : loadBody;

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
            <table cellPadding="0" cellSpacing="0" border="0">
              {tableBody}
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default AllFlights;
