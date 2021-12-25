import React, { Component } from "react";
import SeatSelection from "./SeatSelection";
import Button from "./Button.js";
import "./FlightSeatsSelection.css";
import { Box, width } from "@mui/system";
import { Stack } from "@mui/material";

class FlightSeatsSelection extends React.Component {
  state = {
    departureSeats: [],
    arrivalSeats: [],
  };
  constructor(props) {
    super(props);

    const selected = JSON.parse(localStorage.getItem("flightSelectionData"));
    if (selected) {
      this.state.maxSelectableSeats1 =
        +selected.adultNumber + +selected.childNumber;
      this.state.maxSelectableSeats2 = this.state.maxSelectableSeats1;
      if (localStorage.getItem("EditedReservation")) {
        const reservation = JSON.parse(
          localStorage.getItem("EditedReservation")
        );
        if (
          reservation.departureFlight.flightId._id === selected.flight1._id &&
          reservation.departureFlight.cabin === selected.chosenCabin1
        ) {
          this.state.departureSeats = reservation.departureFlight.seats;
          this.state.departureReservation = reservation.departureFlight;
          this.state.maxSelectableSeats1 = Math.max(
            this.state.maxSelectableSeats1,
            reservation.departureFlight.seats.length
          );
        }
        if (
          reservation.returnFlight.flightId._id === selected.flight2._id &&
          reservation.returnFlight.cabin === selected.chosenCabin2
        ) {
          this.state.arrivalSeats = reservation.returnFlight.seats;
          this.state.arrivalReservation = reservation.returnFlight;
          this.state.maxSelectableSeats2 = Math.max(
            this.state.maxSelectableSeats2,
            reservation.returnFlight.seats.length
          );
        }
      }
    }
  }

  updateSeats = (key, seats) => {
    this.setState({ [key]: seats });
  };

  componentDidMount() {
    localStorage.removeItem("reservationSummary");
    localStorage.removeItem("selectedSeats");
    window.dispatchEvent(new Event("storage"));
    console.log(this.state);
    console.log(JSON.parse(localStorage.getItem("EditedReservation")));
    console.log(JSON.parse(localStorage.getItem("flightSelectionData")));
  }

  isAllChosen() {
    const totalSeats =
      +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
      +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber;
    return (
      totalSeats === this.state.departureSeats.length &&
      totalSeats === this.state.arrivalSeats.length
    );
  }

  getDepartureReservation() {
    if (localStorage.getItem("EditedReservation")) {
      const reservation = JSON.parse(localStorage.getItem("EditedReservation"));
      if (reservation.departureFlight.flightId._id === selected.flight1._id)
        return reservation.departureFlight;
    }
  }

  getArrivalReservation() {
    if (localStorage.getItem("EditedReservation")) {
      const reservation = JSON.parse(localStorage.getItem("EditedReservation"));
      if (reservation.returnFlight.flightId._id === selected.flight2._id)
        return reservation.returnFlight;
    }
  }
  render() {
    if (!localStorage.getItem("flightSelectionData")) {
      this.props.history.push("/flight_selection");
      return <></>;
    }

    const { departureSeats, arrivalSeats } = this.state;
    const allChosen = this.isAllChosen();
    const departure = {
      flight: JSON.parse(localStorage.getItem("flightSelectionData")).flight1,
      numberOfSeats:
        +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
        +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber,
      maxSelectableSeats: this.state.maxSelectableSeats1,
      chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData"))
        .chosenCabin1,
      selectedSeats: this.state.departureSeats || [],
    };
    const arrival = {
      flight: JSON.parse(localStorage.getItem("flightSelectionData")).flight2,
      numberOfSeats:
        +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
        +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber,
      maxSelectableSeats: this.state.maxSelectableSeats2,
      chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData"))
        .chosenCabin2,
      selectedSeats: this.state.arrivalSeats || [],
    };
    return (
      <>
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link> */}
        <div>
          <div id="seatSelectionTitle" className="seat-wrap">
            <div className="seatTitleText">Choose your seats</div>
            <img class="seat-bg" src="seats.jpg" width="700px" height="50px" />
          </div>
          {/* ------------------------------------------------- */}
          <div
            className="d-flex flex-row"
            style={{
              width: "100%",
              justifyContent: "space-around",
              paddingBottom: "100px",
            }}
          >
            <Box
              component="span"
              border={2}
              borderRadius={7.5}
              borderLeft={1}
              borderRight={1}
              borderColor="#cdcdcd"
              sx={{ p: 3 }}
              boxShadow={30}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                height : "70%",
                width : "40%" , 
                marginTop : "10px",
              }}
            >
              <Stack direction="row">
              <div className="seatElementText">
                <label
                  style={{
                    font: "35px Montserrat",
                    paddingTop: "50px",
                    color: "#ff416c",
                  }}
                >
                  Departure Flight
                </label>
              </div>
              <div className="seatElement">
                <SeatSelection
                  {...departure}
                  onUpdateSeats={(seats) => {
                    this.updateSeats("departureSeats", seats);
                  }}
                  reservation={this.state.departureReservation}
                />
              </div>
              </Stack>
            </Box>
            <Box
              component="span"
              border={2}
              borderRadius={7.5}
              borderLeft={1}
              borderRight={1}
              borderColor="#cdcdcd"
              sx={{ p: 3 }}
              boxShadow={30}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                height : "70%",
                width : "40%" , 
                marginTop : "10px",
              }}
            >
            <Stack direction="row">
              <div className="seatElementText">
                <label
                  style={{
                    font: "35px Montserrat",
                    paddingTop: "50px",
                    color: "#ff416c",
                  }}
                >
                  Arrival Flight
                </label>
              </div>
              <div className="seatElement">
                <SeatSelection
                  {...arrival}
                  onUpdateSeats={(seats) => {
                    this.updateSeats("arrivalSeats", seats);
                  }}
                  reservation={this.state.arrivalReservation}
                />
              </div>
              </Stack>
          </Box>
          </div>
          {/* ------------------------------------------ */}
          <div id="seatButton" className="seat-wrap">
            {/* <img class="seat-bg" src="seats.jpg" width="700px" height="50px" /> */}
            <div style={{ marginLeft: "70%", marginTop: "20px" }}>
              <Button
                variant="contained"
                index={this.isAllChosen() == 1 ? 1 : 0}
                onClick={() => {
                  if (this.isAllChosen() != 1) {
                    console.log("here");
                    return;
                  }
                  localStorage.setItem(
                    "selectedSeats",
                    JSON.stringify(this.state)
                  );
                  localStorage.setItem(
                    "path",
                    "http://localhost:3000/trip_summary"
                  );
                  window.dispatchEvent(new Event("storage"));
                  this.props.history.push("/trip_summary");
                }}
                width="250px"
                height="60px"
                label="Confirm"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
 //<div className="shadow p-3 m-3 bg-white rounded flex-Container-Row"> </div>

export default FlightSeatsSelection;
