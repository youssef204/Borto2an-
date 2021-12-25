import Flight from "./Flight";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import { Component } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../UserComponents/ReservationsCSS.css";

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
    // const loadBody = (
    //   <Box
    //     sx={{
    //       width: "80%",
    //       margin: "auto",
    //       marginTop: 5,
    //       marginBottom: 5,
    //     }}
    //   >
    //     <Skeleton className="skeleton" />
    //     <Skeleton animation="wave" />
    //     <Skeleton animation={false} />
    //   </Box>
    // );
    // let tableBody = this.state.minimumTime ? flightlist : loadBody;

    // return (
    //   <section>
    //     <div class="tbl-header">
    //       <table>
    //         <th>Flight Number</th>
    //         <th>Departure Airport</th>
    //         <th>Arrival Airport</th>
    //         <th>Departure Time</th>
    //         <th>Arrival Time</th>
    //         <th>Show all details</th>
    //       </table>
    //       <div class="tbl-content">
    //         <table cellpadding="0" cellspacing="0" border="0">
    //           {tableBody}
    //         </table>
    //       </div>
    //     </div>
    //   </section>
      
    // );

    if (!this.state.loading && this.state.minimumTime) {
      if (flightlist.length != 0) {
        return (
          <div style={{ width: "80%", margin: "auto", marginTop: "10px" }}>
            <div className="reservationTitleDiv">
              <div class="reservationTitleText">Search Flight Result</div>
              <img class="reservation-bg" src="reservation.jpg" />
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Flight Number
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Departure Airport &nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Arrival Airport&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Departure Time&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Arrival Time&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Show Details&nbsp;
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{flightlist}</TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      }
      else {
        return (<div style={{ margin: "auto", width: "80%", marginTop: "10px" }}>
        <div className="reservationTitleDiv">
          <div class="reservationTitleText">Search Flight Result</div>
          <img class="reservation-bg" src="reservation.jpg" />
        </div>
        <div
          style={{
            backgroundColor: "#ffffff",
            verticalAlign: "center",
            paddingTop: "30px",
          }}
        >
                      <label
              style={{
                margin: "2% 37%",
                font: "25px Verdana",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              No flights are found
            </label>
          </div> 
          </div>);
      }
    } else {
      return (
        <div style={{ margin: "auto", width: "80%", marginTop: "10px" }}>
          <div className="reservationTitleDiv">
            <div class="reservationTitleText">Search Flight Result</div>
            <img class="reservation-bg" src="reservation.jpg" />
          </div>
          <div
            style={{
              backgroundColor: "#ffffff",
              verticalAlign: "center",
              paddingTop: "30px",
            }}
          >
            <Box
              sx={{
                width: "80%",
                margin: "auto",
                minHeight: "100px",
              }}
            >
              <Skeleton className="skeleton" />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>
        </div>
      );
            }
  }
}

export default SearchResults;
