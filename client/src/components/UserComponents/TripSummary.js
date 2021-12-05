import React from "react";
import axios from "axios";
import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "../Button";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

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
    /*this.state = {
      flight1: {
        _id: "61a8f74d52f3604dd937856b",
        flightNumber: "99",
        departure: {
          airport: "London",
          terminal: "3",
          time: "2021-12-02T12:41:00.000Z",
          _id: "61a8f74d52f3604dd937856c",
        },
        arrival: {
          airport: "New York",
          terminal: "1",
          time: "2021-12-02T12:41:00.000Z",
          _id: "61a8f74d52f3604dd937856d",
        },
        airline: "Lufthanza",
        hasTransit: true,
        airplaneModelID: {
          _id: "61a8f72352f3604dd9378564",
          name: "Boeing 2012",
          economyRows: 12,
          economyColumns: 12,
          businessRows: 10,
          businessColumns: 10,
          firstClassRows: 8,
          firstClassColumns: 8,
          createdAt: "2021-12-02T16:41:07.037Z",
          updatedAt: "2021-12-02T16:41:07.037Z",
          __v: 0,
        },
        economyCabin: {
          takenSeats: [],
          adultPrice: -4,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd937856e",
        },
        businessCabin: {
          takenSeats: [],
          adultPrice: 0,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd937856f",
        },
        firstCabin: {
          takenSeats: [],
          adultPrice: 0,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd9378570",
        },
        createdAt: "2021-12-02T16:41:49.742Z",
        updatedAt: "2021-12-02T22:53:36.246Z",
        __v: 4,
      },
      flight2: {
        _id: "61a8f74d52f3604dd937856b",
        flightNumber: "99",
        departure: {
          airport: "London",
          terminal: "3",
          time: "2021-12-02T12:41:00.000Z",
          _id: "61a8f74d52f3604dd937856c",
        },
        arrival: {
          airport: "Berlin",
          terminal: "1",
          time: "2021-12-02T12:41:00.000Z",
          _id: "61a8f74d52f3604dd937856d",
        },
        airline: "Lufthanza",
        hasTransit: true,
        airplaneModelID: {
          _id: "61a8f72352f3604dd9378564",
          name: "Boeing 2012",
          economyRows: 12,
          economyColumns: 12,
          businessRows: 10,
          businessColumns: 10,
          firstClassRows: 8,
          firstClassColumns: 8,
          createdAt: "2021-12-02T16:41:07.037Z",
          updatedAt: "2021-12-02T16:41:07.037Z",
          __v: 0,
        },
        economyCabin: {
          takenSeats: [],
          adultPrice: -4,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd937856e",
        },
        businessCabin: {
          takenSeats: [],
          adultPrice: 0,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd937856f",
        },
        firstCabin: {
          takenSeats: [],
          adultPrice: 0,
          adultBaggage: 0,
          childPrice: 0,
          childBaggage: 0,
          _id: "61a8f74d52f3604dd9378570",
        },
        createdAt: "2021-12-02T16:41:49.742Z",
        updatedAt: "2021-12-02T22:53:36.246Z",
        __v: 4,
      },
      chosenCabin1: "Economy",
      chosenCabin2: "economy",
      adultNumber: "6",
      childNumber: "2",
      duration1: "4",
      price1: "780",
      price2: "980",
      duration2: "18",
    };*/
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

  onClick = (e) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      console.log("state is ", this.state);
      const depFlightData = this.state.flight1;
      const retFlightData = this.state.flight2;
      const depCabin = this.state.chosenCabin1;
      const arrCabin = this.state.chosenCabin2;
      const adultno = this.state.adultNumber;
      const childno = this.state.childNumber;
      const selectedDepartureSeats = this.state.selectedDepSeats;
      const selectedArrivalSeats = this.state.selectedArrSeats;
      const price =
        +this.state.price1.split(" ")[0] + +this.state.price2.split(" ")[0];

      const reservationSummary = {
        userId: JSON.parse(localStorage.getItem("user"))._id,
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

      console.log("reserve summary is ", reservationSummary);

      // localStorage.setItem(
      //   "reservationSummary",
      //   JSON.stringify(reservationSummary)
      // );

      axios({
        method: "post",
        url: "http://localhost:8000/api/reservations",
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
        data: reservationSummary,
      })
        .then((res) => {
          console.log("result is ", res);
          localStorage.setItem("reservationSummary" , JSON.stringify(res.data));
          window.location.href = "http://localhost:3000/reservation_summary";
        })
        .catch((e) => {
          console.log(e.response);
        });
    } else window.location.href = "http://localhost:3000/sign_in";
  };

  render() {
    return (
        <Stack>
          <br/>
          <br/>
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
                    Arrival Airport : {this.state.flight1["arrival"]["airport"]}
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
                    Arrival Airport : {this.state.flight2["arrival"]["airport"]}
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
          >
            <Button
              label="Confirm Reservation"
              index={1}
              width={300}
              height={40}
              onClick={this.onClick}
            ></Button>
          </div>
        </Stack>
    );
  }
}

export default TripSummary;
