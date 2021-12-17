import React, { Component } from "react";
import SeatSelection from "./SeatSelection";
import Button from "./Button.js";
import "./FlightSeatsSelection.css";

class FlightSeatsSelection extends React.Component {
  state = {
    departureSeats: [],
    arrivalSeats: [],
  };
  updateSeats = (key, seats) => {
    this.setState({ [key]: seats });
  };

  isAllChosen() {
    const totalSeats =
      +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
      +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber;
    console.log(
      totalSeats === this.state.departureSeats.length &&
        totalSeats === this.state.arrivalSeats.length,
      "Seats",
      totalSeats,
      this.state.arrivalSeats.length
    );
    return (
      totalSeats === this.state.departureSeats.length &&
      totalSeats === this.state.arrivalSeats.length
    );
  }

  render() {
    const { departureSeats, arrivalSeats } = this.state;
    const allChosen = this.isAllChosen();
    const departure = {
      flight: JSON.parse(localStorage.getItem("flightSelectionData")).flight1,
      numberOfSeats:
        +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
        +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber,
      chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData"))
        .chosenCabin1,
    };
    const arrival = {
      flight: JSON.parse(localStorage.getItem("flightSelectionData")).flight2,
      numberOfSeats:
        +JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber +
        +JSON.parse(localStorage.getItem("flightSelectionData")).childNumber,
      chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData"))
        .chosenCabin2,
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
          <div className="d-flex flex-row" id="seatsBackground">
            <div className="seatElementText">
              <h1>
                Departure <br />
                Flight
              </h1>
            </div>
            <div className="seatElement">
              <SeatSelection
                {...departure}
                onUpdateSeats={(seats) => {
                  this.updateSeats("departureSeats", seats);
                }}
              />
            </div>
            <div className="seatElementText">
              <h1>
                Arrival
                <br /> Flight
              </h1>
            </div>
            <div className="seatElement">
              <SeatSelection
                {...arrival}
                onUpdateSeats={(seats) => {
                  this.updateSeats("arrivalSeats", seats);
                }}
              />
            </div>
          </div>
          <div id="seatButton" className="seat-wrap">
            {/* <img class="seat-bg" src="seats.jpg" width="700px" height="50px" /> */}
            <div style={{ marginLeft: "70%", marginTop: "30px" }}>
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
                  window.location.href = "http://localhost:3000/trip_summary";
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

export default FlightSeatsSelection;
