import axios from "axios";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import Flight from "./Flight";
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
    // let tableBody =
    //   this.state.minimumTime && !this.state.loading ? flightlist : loadBody;

   // return (
      // <section>
      //   <div class="tbl-header">
      //     <table>
      //       <th>Flight Number</th>
      //       <th>Departure Airport</th>
      //       <th>Arrival Airport</th>
      //       <th>Departure Time</th>
      //       <th>Arrival Time</th>
      //       <th>Show all details</th>
      //     </table>
      //     <div class="tbl-content">
      //       <table cellPadding="0" cellSpacing="0" border="0">
      //         {tableBody}
      //       </table>
      //     </div>
      //   </div>
      // </section>
      if (!this.state.loading && this.state.minimumTime) {
        if (this.state.flights.length != 0) {
          return (
            <div style={{ width: "80%", margin: "auto", marginTop: "10px" }}>
              <div className="reservationTitleDiv">
                <div class="reservationTitleText">All Flights</div>
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
        {
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
              <div class="reservationTitleText">All Flights</div>
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

export default AllFlights;
