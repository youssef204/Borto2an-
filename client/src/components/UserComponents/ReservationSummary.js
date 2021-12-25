import axios from "axios";
import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Button from "../Button";

class ReservationSummary extends React.Component {
  constructor(props) {
    super(props);
    if (
      !localStorage.getItem("reservationSummary") ||
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    ) {
      //some required item is not found
      this.clearStorage();
      window.location.href = "/";
    }
    const Reservation = JSON.parse(localStorage.getItem("reservationSummary"));
    const selectedFlights = JSON.parse(
      localStorage.getItem("flightSelectionData")
    );
    const selectedDepSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    ).departureSeats;
    const selectedArrSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    ).arrivalSeats;
    const flightsWithReservation = {
      ...selectedFlights,
      Reservation,
      selectedDepSeats,
      selectedArrSeats,
    };
    this.state = {
      flightsWithReservation,
    };
  }

  postReservation = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      const reservationSummary = JSON.parse(
        localStorage.getItem("reservationSummary")
      );

      console.log("reserve summary is ", reservationSummary);

      reservationSummary["userId"] = JSON.parse(
        localStorage.getItem("user")
      )._id;
      const oldReservation = JSON.parse(
        localStorage.getItem("EditedReservation")
      );
      if (oldReservation) {
        //update old reservation
        axios({
          method: "put",
          url: "http://localhost:8000/api/reservations",
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
          data: {
            newReservation: reservationSummary,
            oldReservation: oldReservation,
          },
        })
          .then((res) => {
            console.log("result is ", res);
          })
          .catch((e) => {
            console.log(e.response);
          });
      } else {
        // create a new reservation
        axios({
          method: "post",
          url: "http://localhost:8000/api/reservations",
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
          data: reservationSummary,
        })
          .then((res) => {
            console.log("result is ", res);
            // window.location.href = "/reservation_summary";
          })
          .catch((e) => {
            console.log(e.response);
          });
      }
    } else window.location.href = "/sign_in";
  };
  componentDidMount() {
    if (
      !localStorage.getItem("reservationSummary") ||
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    ) {
      this.props.history.push("/");
      return;
    }
    this.postReservation();
    // console.log(JSON.parse(localStorage.getItem('reservationSummary')));
    // console.log(JSON.parse(localStorage.getItem('EditedReservation')));
    //TODO:  remove comment
    //this.clearStorage();
  }

  clearStorage = () => {
    localStorage.removeItem("reservationSummary");
    localStorage.removeItem("searchResultData");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("EditedReservation");
    window.dispatchEvent(new Event("storage"));
  };

  onReturnToHome = () => {
    this.props.history.push("/");
  };

  onShowReservations = () => {
    this.props.history.push("/reservations");
  };

  render() {
    if (
      !localStorage.getItem("reservationSummary") ||
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    ) {
      this.props.history.push("/");
      return <></>;
    }

    const Reservation = this.state.flightsWithReservation;
    return (
      <div
        style={{
          backgroundImage: `url("https://i.pinimg.com/originals/48/7b/c1/487bc14012c5b2ceac9a29d8ed6406dd.jpg")`,
        }}
      >
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "left",
          }}
        >
          <Box
            component="span"
            border={2}
            borderRadius={10}
            borderLeft={2}
            borderRight={2}
            borderColor="#a9a9a9"
            sx={{ p: 1 }}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              width: "40%",
            }}
          >
            <Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label style={{ font: "35px Montserrat" }}>
                  Thank you for choosing us!
                </label>
              </div>
            </Stack>
            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "left",
              }}
            >
              <div>
                <Stack>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "20px", fontWeight: "16" }}>
                      Departure Flight Details
                    </label>
                  </div>
                </Stack>
                <br />
                <div style={{ fontSize: "15px" }}>
                  Flight Number: {Reservation.flight1.flightNumber}
                  <br />
                  From Airport: {Reservation.flight1.departure.airport}
                  <br />
                  From Terminal: {Reservation.flight1.departure.terminal}
                  <br />
                  From Time:{" "}
                  {Reservation.flight1.departure.time.substring(0, 10) +
                    " at " +
                    Reservation.flight1.departure.time.substring(11, 16)}
                  <br />
                  To Airport: {Reservation.flight1.arrival.airport}
                  <br />
                  To Terminal: {Reservation.flight1.arrival.terminal}
                  <br />
                  To Time:{" "}
                  {Reservation.flight1.arrival.time.substring(0, 10) +
                    " at " +
                    Reservation.flight1.arrival.time.substring(11, 16)}
                  <br />
                  Airline: {Reservation.flight1.airline}
                  <br />
                  Has Transit: {Reservation.flight1.hasTransit.toString()}
                  <br />
                  Reserved Seats:{" "}
                  {Reservation.selectedDepSeats
                    .slice(0, Reservation.selectedDepSeats.length - 1)
                    .map((entry) => entry + " , ")}{" "}
                  {
                    Reservation.selectedDepSeats[
                      Reservation.selectedDepSeats.length - 1
                    ]
                  }
                  <br />
                  Cabin: {Reservation.Reservation.departureFlight.cabin}
                  <br />
                  Number of Adults:{" "}
                  {Reservation.Reservation.departureFlight.noAdults}
                  <br />
                  Number of Children:{" "}
                  {Reservation.Reservation.departureFlight.noChildren}
                </div>
              </div>
              <hr />
              <div>
                <Stack>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "20px", fontWeight: "16" }}>
                      Return Flight Details
                    </label>
                  </div>
                </Stack>
                <br />
                <div style={{ fontSize: "15px" }}>
                  Flight Number: {Reservation.flight2.flightNumber}
                  <br />
                  From Airport: {Reservation.flight2.departure.airport}
                  <br />
                  From Terminal: {Reservation.flight2.departure.terminal}
                  <br />
                  From Time:{" "}
                  {Reservation.flight2.departure.time.substring(0, 10) +
                    " at " +
                    Reservation.flight2.departure.time.substring(11, 16)}
                  <br />
                  To Airport: {Reservation.flight2.arrival.airport}
                  <br />
                  To Terminal: {Reservation.flight2.arrival.terminal}
                  <br />
                  To Time:{" "}
                  {Reservation.flight2.arrival.time.substring(0, 10) +
                    " at " +
                    Reservation.flight2.arrival.time.substring(11, 16)}
                  <br />
                  Airline: {Reservation.flight2.airline}
                  <br />
                  Has Transit: {Reservation.flight2.hasTransit.toString()}
                  <br />
                  Reserved Seats:{" "}
                  {Reservation.selectedArrSeats
                    .slice(0, Reservation.selectedArrSeats.length - 1)
                    .map((entry) => entry + " , ")}{" "}
                  {
                    Reservation.selectedArrSeats[
                      Reservation.selectedArrSeats.length - 1
                    ]
                  }
                  <br />
                  Cabin: {Reservation.Reservation.returnFlight.cabin}
                  <br />
                  Number of Adults:{" "}
                  {Reservation.Reservation.returnFlight.noAdults}
                  <br />
                  Number of Children:{" "}
                  {Reservation.Reservation.returnFlight.noChildren}
                </div>
              </div>
            </div>
            <hr />
            <Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label style={{ font: "30px montserrat" }}>
                  Reservation Price
                </label>
              </div>
            </Stack>
            <Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label
                  style={{
                    fontSize: "30px",
                    color: "#107710",
                  }}
                >
                  {+Reservation.price1.split(" ")[0] +
                    +Reservation.price2.split(" ")[0]}{" "}
                  L.E
                </label>
              </div>
            </Stack>
            <Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  margin: "9px 0",
                }}
              >
                <Button
                  index="1"
                  onClick={this.onShowReservations}
                  width="250px"
                  height="50px"
                  label="Show all reservations"
                >
                  Show all reservations
                </Button>
                {/* <Button
                  width={150}
                  index={2}
                  label="Return To Home Page"
                  onClick={this.onShowReservations}

                  >
                  </Button>
                  <Button
                  width={150}
                  index={1}
                  label="Show All Reservations"
                  onClick={this.onReturnToHome}
                  >
                  </Button> */}
              </div>
            </Stack>
          </Box>
        </div>
        <br />
      </div>
    );
  }
}

export default ReservationSummary;
