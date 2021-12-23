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
    const Reservation =    {
      "_id": "61c39c122e06e948cc3df12d",
      "userId": "61bfd3d7e58887dc89080cbe",
      "price": 108,
      "departureFlight": {
          "flightId": {
              "_id": "61acd93b0d5434342497c13a",
              "flightNumber": 33,
              "departure": {
                  "airport": "CAI",
                  "terminal": "1",
                  "time": "2021-12-23T17:21:00.000Z",
                  "_id": "61acd93b0d5434342497c13b"
              },
              "arrival": {
                  "airport": "MUN",
                  "terminal": "1",
                  "time": "2021-12-23T22:23:00.000Z",
                  "_id": "61acd93b0d5434342497c13c"
              },
              "airline": "luft",
              "hasTransit": false,
              "airplaneModelID": "61acac407fb7bbbb95342ee0",
              "economyCabin": {
                  "takenSeats": [
                      7,
                      8,
                      45,
                      47,
                      58,
                      36,
                      67,
                      68,
                      69,
                      70,
                      12,
                      11,
                      10,
                      117,
                      83,
                      95,
                      21,
                      22,
                      23,
                      44,
                      119,
                      120,
                      96,
                      94,
                      93,
                      92,
                      108,
                      59,
                      24,
                      35,
                      118,
                      30,
                      54,
                      51,
                      55,
                      77,
                      6,
                      18,
                      31,
                      9,
                      20,
                      3,
                      2,
                      42,
                      114,
                      113,
                      39,
                      76,
                      57,
                      29,
                      17,
                      34,
                      25,
                      32,
                      33,
                      46,
                      43,
                      48,
                      1,
                      109,
                      13,
                      5,
                      56,
                      71,
                      81,
                      41,
                      65,
                      101,
                      16,
                      15,
                      72,
                      60,
                      84,
                      14,
                      27,
                      26,
                      28,
                      40,
                      37,
                      38,
                      82,
                      80,
                      63,
                      4,
                      78,
                      90,
                      89,
                      19,
                      104,
                      49
                  ],
                  "adultPrice": 40,
                  "adultBaggage": 1,
                  "childPrice": 100,
                  "childBaggage": 1,
              },
              "businessCabin": {
                  "takenSeats": [
                      20,
                      37,
                      54,
                      49,
                      1,
                      2,
                      3,
                      18,
                      4
                  ],
                  "adultPrice": 100,
                  "adultBaggage": 1,
                  "childPrice": 100,
                  "childBaggage": 1,
                  "_id": "61c0ed7fc6183a8a258e645f"
              },
              "firstCabin": {
                  "takenSeats": [
                      39,
                      50,
                      1,
                      40,
                      2,
                      3,
                      4,
                      5,
                      17
                  ],
                  "adultPrice": 150,
                  "adultBaggage": 1,
                  "childPrice": 100,
                  "childBaggage": 1,
                  "_id": "61c0ed7fc6183a8a258e6460"
              },
              "createdAt": "2021-12-05T15:22:35.599Z",
              "updatedAt": "2021-12-22T21:43:46.462Z",
              "__v": 105
          },
          "seats": [
              4
          ],
          "cabin": "business",
          "noAdults": 1,
          "noChildren": 0,
          "_id": "61c39c122e06e948cc3df12e"
      },
      "returnFlight": {
          "flightId": {
              "_id": "61acd9b10d5434342497c14a",
              "flightNumber": 42,
              "departure": {
                  "airport": "MUN",
                  "terminal": "1",
                  "time": "2022-01-01T17:23:00.000Z",
                  "_id": "61acd9b10d5434342497c14b"
              },
              "arrival": {
                  "airport": "CAI",
                  "terminal": "1",
                  "time": "2022-01-02T23:30:00.000Z",
                  "_id": "61acd9b10d5434342497c14c"
              },
              "airline": "1",
              "hasTransit": false,
              "airplaneModelID": "61acac407fb7bbbb95342ee0",
              "economyCabin": {
                  "takenSeats": [
                      7,
                      36,
                      33,
                      45,
                      58,
                      1,
                      9,
                      10,
                      11,
                      12,
                      4,
                      8,
                      19,
                      57,
                      23,
                      22,
                      15,
                      16,
                      24,
                      34,
                      48,
                      60,
                      72,
                      84,
                      96,
                      108,
                      120,
                      44,
                      70,
                      35,
                      47,
                      46,
                      37,
                      63,
                      86,
                      66,
                      88,
                      21,
                      20,
                      14,
                      2,
                      3,
                      13,
                      25,
                      62,
                      69,
                      68,
                      27,
                      40,
                      41,
                      76,
                      17,
                      26,
                      42,
                      6,
                      18,
                      30,
                      29,
                      28,
                      31,
                      118,
                      43,
                      71,
                      39,
                      74,
                      65,
                      49,
                      52,
                      64,
                      87,
                      53,
                      83,
                      38,
                      54,
                      51,
                      50,
                      75,
                      113,
                      56,
                      78,
                      73,
                      89,
                      90,
                      112,
                      77,
                      32
                  ],
                  "adultPrice": 1,
                  "adultBaggage": 1,
                  "childPrice": 1,
                  "childBaggage": 1,
                  "_id": "61acd9b10d5434342497c14d"
              },
              "businessCabin": {
                  "takenSeats": [
                      1,
                      2,
                      3,
                      4,
                      5,
                      6,
                      31,
                      7
                  ],
                  "adultPrice": 0,
                  "adultBaggage": 68,
                  "childPrice": 4,
                  "childBaggage": 65,
                  "_id": "61acd9b10d5434342497c14e"
              },
              "firstCabin": {
                  "takenSeats": [
                      31,
                      26,
                      35,
                      42,
                      4,
                      27,
                      44,
                      1,
                      2,
                      3,
                      5,
                      6,
                      7,
                      8
                  ],
                  "adultPrice": 15,
                  "adultBaggage": 5,
                  "childPrice": 8,
                  "childBaggage": 8,
                  "_id": "61acd9b10d5434342497c14f"
              },
              "createdAt": "2021-12-05T15:24:33.686Z",
              "updatedAt": "2021-12-22T21:43:46.628Z",
              "__v": 105
          },
          "seats": [
              8
          ],
          "cabin": "first",
          "noAdults": 1,
          "noChildren": 0,
          "_id": "61c39c122e06e948cc3df12f"
      },
      "createdAt": "2021-12-22T21:43:46.787Z",
      "updatedAt": "2021-12-22T21:43:46.787Z",
      "__v": 0
  }
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
      Reservation,
      edited : false,
      editiableprice1 : 0,
      editiableprice2 : 0,
    };
    this.state = selectedFlightsWithSeats;
  }

  componentDidMount() {
    //if(JSON.parse(localStorage.getItem("editReservation")))
    if(this.state.Reservation !== null)
    {
      const reserved = this.state.Reservation;
      // JSON.parse(localStorage.getItem("editReservation"));
      this.setState({
        edited : true,
        editiableprice1 : (+this.getPriceOfFlight(reserved.departureFlight,"1").split(" ")[0]),
        editiableprice2 : (+this.getPriceOfFlight(reserved.returnFlight,"2").split(" ")[0])
      })
      // const hamada =  (+this.getPriceOfFlight(reserved.departureFlight,"1").split(" ")[0]);
      // console.log("hamada is " , hamada);
      // console.log("real price is" , +(this.getPriceOfFlight(reserved.departureFlight,"1")).split(" ")[0]);
      //    console.log("price is " , (+this.state.editiableprice1));
    }
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

   getPriceOfFlight = (flight,cabinNum) => {
    let cabin;
    console.log("cabinNum is " ,cabinNum);
    if(cabinNum === "1"){
      cabin = this.state.chosenCabin1 === "economy" ? "economyCabin" : 
              this.state.chosenCabin1 === "business" ? "businessCabin" : "firstCabin" 
    }
    if(cabinNum === "2"){
      cabin = this.state.chosenCabin2 === "economy" ? "economyCabin" : 
              this.state.chosenCabin2 === "business" ? "businessCabin" : "firstCabin" 
    }
    console.log("get price ", flight);
    console.log("cabin is ", flight.flightId[cabin].adultPrice);
    const adultPrice = (+flight.flightId[cabin].adultPrice) * (+flight.noAdults);
    const childPrice = (+flight.flightId[cabin].childPrice) * (+flight.noChildren);
    return (+adultPrice) + (+childPrice) + " L.E";
  };
  //TODO: create pay button
  onClickPay = (e) =>{
    if (JSON.parse(localStorage.getItem("user"))) {
      const reservationSummary = JSON.parse(
        localStorage.getItem("reservationSummary")
      );
      reservationSummary["userId"] = JSON.parse(
        localStorage.getItem("user")
      )._id;

      reservationSummary.departureFlight.price = 
      !this.state.edited ? +this.state.price1.split(" ")[0] : +this.state.price1.split(" ")[0] - this.state.editiableprice1;
      reservationSummary.returnFlight.price = 
      !this.state.edited ? +this.state.price2.split(" ")[0] : +this.state.price2.split(" ")[0] - this.state.editiableprice2;

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
      .catch((e) => {
        console.log(e.response);
      });
    } else window.location.href = "/sign_in";

  }

  onClickPaid = (e) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      window.location.href = "/reservation_summary";
    } else window.location.href = "/sign_in";
  };

  onClickContinue = (e) => {
    window.location.href = "/reservation_summary";
  }

  onClickRefund = (e) => {
    //email to confirm refunding the money 
  }

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
                style={{
                  backgroundColor : "#ffffff"
                }}
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
               {//normal pricee -----------------------------------------------
               !this.state.edited ?    
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom : "5x"
                    }}
                  >
                 Price :  {this.state.price1}
                 </label>
                 //new price less than old price
                   : this.state.editiableprice1 > this.state.price1.split(" ")[0] ?
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginBottom : "5x"
                      }}
                    >
                   Amount to be refunded :  {+this.state.editiableprice1 - +this.state.price1.split(" ")[0]} L.E
                   </label>
                   //new price greater than or equal old price
                    :
                   <label
                   style={{
                     fontSize: "22px",
                     fontWeight: "bold",
                     alignSelf: "center",
                     justifyContent: "center",
                     marginBottom : "5x"
                   }}
                 >
                Amount to be paid : {(+this.state.price1.split(" ")[0]) - (this.state.editiableprice1)} L.E
                </label>
  }
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
                style = {{
                  backgroundColor : "#ffffff"
                }}
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
                     {!this.state.edited ?
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom : "5x"
                    }}
                  >
                 Price : {this.state.price2}
                 </label>
                   : this.state.editiableprice2 > this.state.price2.split(" ")[0] ?
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginBottom : "5x"
                      }}
                    >
                   Amount to be refunded : {+this.state.editiableprice2 - +this.state.price2.split(" ")[0]} L.E
                   </label> :
                   <label
                   style={{
                     fontSize: "22px",
                     fontWeight: "bold",
                     alignSelf: "center",
                     justifyContent: "center",
                     marginBottom : "5x"
                   }}
                 >
                Amount to be paid : {+this.state.price2.split(" ")[0] - +this.state.editiableprice2} L.E
                </label>
  }
                </div>
              </Box>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
                     {!this.state.edited ?
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      margin : "10px"
                    }}
                  >
                 Total Price : {+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0]}
                 </label>
                   : this.state.editiableprice2 + this.state.editiableprice1 >
                   +this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0] ?
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        margin : "10px"
                      }}
                    >
                   Amount to be refunded : {(this.state.editiableprice2 + this.state.editiableprice1) -
                   (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0]) } L.E
                   </label> :
                   <label
                   style={{
                     fontSize: "22px",
                     fontWeight: "bold",
                     alignSelf: "center",
                     justifyContent: "center",
                     margin : "10px"
                   }}
                 >
                Amount to be paid : {-(this.state.editiableprice2 + this.state.editiableprice1) +
                   (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0])} L.E
                </label>
  }
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
              height: "75px",
              backgroundColor: "rgba(20, 20, 20, 0.9)",
              marginBottom : "-30px"
            }}
          >
            <div style={{ marginLeft: "70%", paddingTop: "20px" }}>
              <Button
                label= {this.state.edited ? "Update Reservation" : "Place Reservation"}
                index={1}
                width={300}
                height={40}
                onClick={handleClickOpen}
              ></Button>
            </div>
          </div>
        </Box>
         {//case it is not an edit ----------------------------------------
         }
        {!this.state.edited ?
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
              You are about to reserve and pay {
                (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0])
              } L.E for the shown trip
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
        //case the edited reservation price is the same as the original reservation price --------------------------
        : (this.state.editiableprice2 + this.state.editiableprice1) ===
        (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0]) ?
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to update your reservation ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              There is no price difference to pay !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={this.onClickContinue} autoFocus>
              Continue
            </button>
          </DialogActions>
        </Dialog>
        //case the new price is larger than the previous price -----------------------------------------------------
        :  (this.state.editiableprice2 + this.state.editiableprice1) >
        (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0]) ?
        <Dialog
        open={this.state.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update your reservation ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will receive an email shortly to confirm refunding you with {(this.state.editiableprice2 + this.state.editiableprice1) -
        (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0]) } L.E!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={this.onClickRefund} autoFocus>
            Continue
          </button>
        </DialogActions>
      </Dialog>
      : 
      //case older price is greater than new price ---------------------------------------------------------------------------
      <Dialog
      open={this.state.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to Update your reservation?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You are about to Update your reservation and pay {
            -(this.state.editiableprice2 + this.state.editiableprice1) +
            (+this.state.price2.split(" ")[0] + +this.state.price1.split(" ")[0])
          } L.E for the shown trip
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
  }
      </>
    );
  }
}

export default TripSummary;