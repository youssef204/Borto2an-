import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Component } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import Reservation from "./Reservation";
import "./ReservationsCSS.css";
class ReservationDetailsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {departureFlight, returnFlight, price} = this.props.Reservation;
    return (
      <div style={{ width: "80%", margin: "auto", marginTop: "10px" }}>
        <div className="reservationTitleDiv">
          <div class="reservationTitleText">Reservation Details</div>
          <div class="reservationSubTitleText">Price : {price} L.E</div>
          <img class="reservation-bg" src="reservation.jpg" />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                  
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Departure Flight
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Return Flight &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Flight Number</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.flightNumber}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.flightNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>From Airport</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.departure.airport}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.departure.airport}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>From Terminal</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.departure.terminal}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.departure.terminal}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>From Time</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.departure.time.substring(0,10)+" at "+ departureFlight.flightId.departure.time.substring(11,16)}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.departure.time.substring(0,10)+" at "+ returnFlight.flightId.departure.time.substring(11,16)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>To Airport</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.arrival.airport}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.arrival.airport}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>To Terminal</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.arrival.terminal}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.arrival.terminal}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>To Time</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.arrival.time.substring(0,10)+" at "+ departureFlight.flightId.arrival.time.substring(11,16)}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.arrival.time.substring(0,10)+" at "+ returnFlight.flightId.arrival.time.substring(11,16)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Airline</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.airline}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.airline}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Has Transit</TableCell>
                <TableCell align="center">
                  {departureFlight.flightId.hasTransit?"YES":"NO"}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.flightId.hasTransit?"YES":"NO"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Reserved Seats</TableCell>
                <TableCell align="center">
                  {departureFlight.seats.slice(0, departureFlight.seats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      departureFlight.seats[
                        departureFlight.seats.length - 1
                      ]
                    }
                </TableCell>
                <TableCell align="center">
                  {returnFlight.seats.slice(0, returnFlight.seats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      returnFlight.seats[
                        returnFlight.seats.length - 1
                      ]
                    }
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Cabin</TableCell>
                <TableCell align="center">
                  {departureFlight.cabin}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.cabin}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Adults</TableCell>
                <TableCell align="center">
                  {departureFlight.noAdults}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.noAdults}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>Children</TableCell>
                <TableCell align="center">
                  {departureFlight.noChildren}
                </TableCell>
                <TableCell align="center">
                  {returnFlight.noChildren}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default ReservationDetailsTable;
