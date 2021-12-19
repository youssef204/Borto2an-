import React from "react";
import axios from "axios";
import { Box, width } from "@mui/system";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "../Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: 140,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

class TripSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
    const selectedFlights = JSON.parse(
      localStorage.getItem("flightSelectionData")
    );
    const selectedDepSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    ).departureSeats;
    const selectedArrSeats = JSON.parse(
      localStorage.getItem("selectedSeats")
    ).arrivalSeats;
    const selectedFlightsWithSeats = {
      ...selectedFlights,
      selectedDepSeats,
      selectedArrSeats,
    };
    this.state = selectedFlightsWithSeats;
  }

  componentDidMount() {
    console.log("state is ", this.state);
    const depFlightData = this.state.flight1;
    const retFlightData = this.state.flight2;
    const depCabin = this.state.chosenCabin1;
    const arrCabin = this.state.chosenCabin2;
    const adultno = this.state.adultNumber;
    const childno = this.state.childNumber;
    const selectedDepartureSeats = this.state.selectedDepSeats;
    const selectedArrivalSeats = this.state.selectedArrSeats;
    const price1 = +this.state.price1.split(" ")[0];
    const price2 = +this.state.price2.split(" ")[0];
    const price = price1 + price2;



    const reservationSummary = {
      userId: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))._id
        : "no user signed in yet",
      price: price,
      departureFlight: {
        flightId: depFlightData._id,
        seats: selectedDepartureSeats,
        cabin: depCabin,
        noAdults: adultno,
        noChildren: childno,
      },
      returnFlight: {
        flightId: retFlightData._id,
        seats: selectedArrivalSeats,
        cabin: arrCabin,
        noAdults: adultno,
        noChildren: childno,
      },
    };

    localStorage.setItem(
      "reservationSummary",
      JSON.stringify(reservationSummary)
    );
    window.dispatchEvent( new Event('storage') );
  }
  //TODO: create pay button
  onClickPay = (e) =>{
    if (JSON.parse(localStorage.getItem("user"))) {
      const reservationSummary = JSON.parse(
        localStorage.getItem("reservationSummary")
      );
      reservationSummary["userId"] = JSON.parse(
        localStorage.getItem("user")
      )._id;

      reservationSummary.departureFlight.price = +this.state.price1.split(" ")[0];
      reservationSummary.returnFlight.price = +this.state.price2.split(" ")[0];

      reservationSummary["success_url"] = "http://localhost:3000/reservation_summary";
      reservationSummary["cancel_url"] = "http://localhost:3000/trip_summary";

      console.log("reserve summary is ", reservationSummary);


    axios({
      method: "post",
      url: "http://localhost:8000/api/payment/create-session",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      data: reservationSummary,
    })
      .then((res) => {
        console.log("result is ", res);
        window.location.href = res.data.url;
      })
        .then((res) => {
          console.log("result is ", res);
          this.props.history.push("/reservation_summary");
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else this.props.history.push("/sign_in");
  };

  render() {
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };

    return (
      <>
        <Box
          component="span"
          border={2}
          borderRadius={10}
          borderLeft={2}
          borderRight={2}
          borderColor="#a9a9a9"
          sx={{ p: 1 }}
        >
          <Stack>
            <br />
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
              >
                <Stack spacing={0.5}>
                  <img
                    src="takingOff2.png"
                    width="30%"
                    height="60%"
                    style={{ alignSelf: "left", justifyContent: "left" }}
                  />
                  <label
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Departure Flight (
                    {this.state.flight1.departure.time.substring(0, 10)})
                  </label>
                  <br />
                  <div>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "2px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {this.state.flight1.departure.time.substring(11, 16)}
                      </label>
                      <BorderLinearProgress variant="determinate" value={50} />
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {this.state.flight1.arrival.time.substring(11, 16)}
                      </label>
                    </Stack>
                  </div>
                  <label
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Duration : {this.state.duration1}
                  </label>
                </Stack>
                <br />
                <br />
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Departure Airport :{" "}
                      {this.state.flight1["departure"]["airport"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Arrival Airport :{" "}
                      {this.state.flight1["arrival"]["airport"]}
                    </label>
                  </div>
                </Stack>

                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Departure Terminal :{" "}
                      {this.state.flight1["departure"]["terminal"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Arrival Terminal :{" "}
                      {this.state.flight1["arrival"]["terminal"]}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Airplane Model :{" "}
                      {this.state.flight1["airplaneModelID"]["name"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Chosen Cabin : {this.state.chosenCabin1}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Adults : {this.state.adultNumber}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Children : {this.state.childNumber}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Flight Number : {this.state.flight1.flightNumber}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Seats :{" "}
                      {this.state.selectedDepSeats
                        .slice(0, this.state.selectedDepSeats.length - 1)
                        .map((entry) => entry + " , ")}{" "}
                      {
                        this.state.selectedDepSeats[
                          this.state.selectedDepSeats.length - 1
                        ]
                      }
                    </label>
                  </div>
                </Stack>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    Price : {this.state.price1}
                  </label>
                </div>
              </Box>
              <Box
                component="span"
                border={2}
                borderRadius={10}
                borderLeft={2}
                borderRight={2}
                borderColor="#a9a9a9"
                sx={{ p: 1 }}
              >
                <Stack spacing={0.5}>
                  <img
                    src="takingOff2.png"
                    width="30%"
                    height="60%"
                    style={{ alignSelf: "left", justifyContent: "left" }}
                  />
                  <label
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Return Flight (
                    {this.state.flight2.departure.time.substring(0, 10)})
                  </label>
                  <br />
                  <div>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "2px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {this.state.flight2.departure.time.substring(11, 16)}
                      </label>
                      <BorderLinearProgress variant="determinate" value={50} />
                      <label
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          alignSelf: "center",
                        }}
                      >
                        {this.state.flight2.arrival.time.substring(11, 16)}
                      </label>
                    </Stack>
                  </div>
                  <label
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      alignSelf: "center",
                    }}
                  >
                    Duration : {this.state.duration2}
                  </label>
                </Stack>
                <br />
                <br />
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Departure Airport :{" "}
                      {this.state.flight2["departure"]["airport"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Arrival Airport :{" "}
                      {this.state.flight2["arrival"]["airport"]}
                    </label>
                  </div>
                </Stack>

                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Departure Terminal :{" "}
                      {this.state.flight2["departure"]["terminal"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Arrival Terminal :{" "}
                      {this.state.flight2["arrival"]["terminal"]}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Airplane Model :{" "}
                      {this.state.flight2["airplaneModelID"]["name"]}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Chosen Cabin : {this.state.chosenCabin2}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Adults : {this.state.adultNumber}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Children : {this.state.childNumber}
                    </label>
                  </div>
                </Stack>
                <Stack style={{ margin: "2px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <label style={{ fontSize: "14px" }}>
                      Flight Number : {this.state.flight1.flightNumber}
                    </label>
                    <label style={{ fontSize: "14px" }}>
                      Seats :{" "}
                      {this.state.selectedArrSeats
                        .slice(0, this.state.selectedArrSeats.length - 1)
                        .map((entry) => entry + " , ")}{" "}
                      {
                        this.state.selectedArrSeats[
                          this.state.selectedArrSeats.length - 1
                        ]
                      }
                    </label>
                  </div>
                </Stack>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                    }}
                  >
                    Price : {this.state.price2}
                  </label>
                </div>
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <label
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                Total price :{" "}
                {+this.state.price2.split(" ")[0] +
                  +this.state.price1.split(" ")[0]}{" "}
                L.E
              </label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "10px",
              }}
            ></div>
          </Stack>
          <div
            style={{
              width: "100%",
              height: "105px",
              backgroundColor: "rgba(20, 20, 20, 0.9)",
            }}
          >
            <div style={{ marginLeft: "70%", paddingTop: "20px" }}>
              <Button
                label="Place Reservation"
                index={1}
                width={300}
                height={40}
                onClick={handleClickOpen}
              ></Button>
            </div>
          </div>
        </Box>

        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to reserve?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are about to reserve and pay for the shown trip
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={this.onClickPaid} autoFocus>
              I already Paid
            </button>
            <button onClick={this.onClickPay} autoFocus>
              Pay
            </button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default TripSummary;