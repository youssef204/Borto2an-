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
class Reservations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/reservations/", {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.setState({ reservations: res.data });
        this.setState({
          loading: false,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let reservationList;
    if (this.state.reservations.length == 0) {
      reservationList = <p>you have no reservations</p>;
    } else {
      reservationList = this.state.reservations.map((reservation) => (
        <Reservation Reservation={reservation} />
      ));
    }
    if (!this.state.loading) {
      if (this.state.reservations.length != 0) {
        return (
          <div style={{ width: "80%", margin: "auto", marginTop: "10px" }}>
            <div className="reservationTitleDiv">
              <div class="reservationTitleText">All Reservations</div>
              <img class="reservation-bg" src="reservation.jpg" />
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Price
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      From &nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      At&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      To&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      At&nbsp;
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                      Show Details&nbsp;
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{reservationList}</TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      } else {
        return reservationList;
      }
    } else {
      return (
        <div style={{ margin: "auto", width: "80%", marginTop: "10px" }}>
          <div className="reservationTitleDiv">
            <div class="reservationTitleText">All Reservations</div>
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

export default Reservations;
