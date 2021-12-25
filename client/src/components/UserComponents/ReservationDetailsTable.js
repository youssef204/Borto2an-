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
      <div style={{ width: "80%", margin: "auto", marginTop: "10px", paddingBottom:"100px" }}>
        <div className="reservationTitleDiv">
          <div class="reservationTitleText">Reservation Details</div>
          <div class="reservationSubTitleText">Price : {price} L.E</div>
          <img class="reservation-bg" src="reservation.jpg" />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="medium" aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left" style={{ fontWeight: "bold" }}>
                  
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Departure Flight
                </TableCell>
                <TableCell align="left" style={{ fontWeight: "bold" }}>
                  Return Flight &nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Flight Number</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.flightNumber}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.flightNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold" , paddingLeft: "100px" }}>From Airport</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.departure.airport}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.departure.airport}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>From Terminal</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.departure.terminal}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.departure.terminal}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>From Time</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.departure.time.substring(0,10)+" at "+ departureFlight.flightId.departure.time.substring(11,16)}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.departure.time.substring(0,10)+" at "+ returnFlight.flightId.departure.time.substring(11,16)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>To Airport</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.arrival.airport}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.arrival.airport}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>To Terminal</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.arrival.terminal}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.arrival.terminal}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>To Time</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.arrival.time.substring(0,10)+" at "+ departureFlight.flightId.arrival.time.substring(11,16)}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.arrival.time.substring(0,10)+" at "+ returnFlight.flightId.arrival.time.substring(11,16)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Airline</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.airline}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.airline}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Has Transit</TableCell>
                <TableCell align="left">
                  {departureFlight.flightId.hasTransit?"YES":"NO"}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.flightId.hasTransit?"YES":"NO"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Reserved Seats</TableCell>
                <TableCell align="left">
                  {departureFlight.seats.slice(0, departureFlight.seats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      departureFlight.seats[
                        departureFlight.seats.length - 1
                      ]
                    }
                </TableCell>
                <TableCell align="left">
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
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Cabin</TableCell>
                <TableCell align="left">
                  {departureFlight.cabin}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.cabin}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Adults</TableCell>
                <TableCell align="left">
                  {departureFlight.noAdults}
                </TableCell>
                <TableCell align="left">
                  {returnFlight.noAdults}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" style={{ fontWeight: "bold", paddingLeft: "100px" }}>Children</TableCell>
                <TableCell align="left">
                  {departureFlight.noChildren}
                </TableCell>
                <TableCell align="left">
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
