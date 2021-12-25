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
import "./TripSummaryCSS.css";

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
  constructor(props) {
    super(props);
    if (
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    )
      return;
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
      edited: false,
      editiableprice1: 0,
      editiableprice2: 0,
    };
    this.state = selectedFlightsWithSeats;
  }

  componentDidMount() {
    if (
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    )
      return;

    if (JSON.parse(localStorage.getItem("EditedReservation"))) {
      //if(this.state.Reservation !== null)
      //const reserved = this.state.Reservation;
      const reserved = JSON.parse(localStorage.getItem("EditedReservation"));
      this.setState({
        edited: true,
        editiableprice1: +this.getPriceOfFlight(
          reserved.departureFlight,
          "1"
        ).split(" ")[0],
        editiableprice2: +this.getPriceOfFlight(
          reserved.returnFlight,
          "2"
        ).split(" ")[0],
      });
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
    window.dispatchEvent(new Event("storage"));
  }

  getPriceOfFlight = (flight, cabinNum) => {
    let cabin =
      flight.cabin === "business"
        ? "businessCabin"
        : flight.cabin === "economy"
        ? "economyCabin"
        : "firstCabin";
    // console.log("cabinNum is " ,cabinNum);
    // if(cabinNum === "1"){
    //   cabin = this.state.chosenCabin1 === "economy" ? "economyCabin" :
    //           this.state.chosenCabin1 === "business" ? "businessCabin" : "firstCabin"
    // }
    // if(cabinNum === "2"){
    //   cabin = this.state.chosenCabin2 === "economy" ? "economyCabin" :
    //           this.state.chosenCabin2 === "business" ? "businessCabin" : "firstCabin"
    // }
    console.log("get price ", flight);
    console.log("cabin is ", flight.flightId[cabin].adultPrice);
    const adultPrice = +flight.flightId[cabin].adultPrice * +flight.noAdults;
    const childPrice = +flight.flightId[cabin].childPrice * +flight.noChildren;
    return +adultPrice + +childPrice + " L.E";
  };
  //TODO: create pay button
  onClickPay = (e) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      const reservationSummary = JSON.parse(
        localStorage.getItem("reservationSummary")
      );
      reservationSummary["userId"] = JSON.parse(
        localStorage.getItem("user")
      )._id;

      reservationSummary.departureFlight.price = !this.state.edited
        ? +this.state.price1.split(" ")[0]
        : +this.state.price1.split(" ")[0] - this.state.editiableprice1;
      reservationSummary.returnFlight.price = !this.state.edited
        ? +this.state.price2.split(" ")[0]
        : +this.state.price2.split(" ")[0] - this.state.editiableprice2;

      reservationSummary["success_url"] =
        "http://localhost:3000/reservation_summary";
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
  };

  onClickPaid = (e) => {
    if (JSON.parse(localStorage.getItem("user"))) {
      window.location.href = "/reservation_summary";
    } else window.location.href = "/sign_in";
  };

  onClickContinue = (e) => {
    window.location.href = "/reservation_summary";
  };

  onClickRefund = (e) => {
    // TODO:email to confirm refunding the money
    window.location.href = "/reservation_summary";
  };

  render() {
    if (
      !localStorage.getItem("flightSelectionData") ||
      !localStorage.getItem("selectedSeats")
    ) {
      this.props.history.push("/select_seats");
      return <></>;
    }

    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };

    return (
      <div
      // style={{backgroundImage: `url("https://i.pinimg.com/originals/48/7b/c1/487bc14012c5b2ceac9a29d8ed6406dd.jpg")`
      //}}
      >
        <div
          className="TripTitleDiv"
          style={{
            height: "130px",
            marginBottom: "-20px",
            paddingBottom: "50px",
          }}
        >
          <div class="TripTitleText">Trip Summary</div>
          <img class="Trip-bg" src="trip3.jpg" />
        </div>
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
              sx={{ p: 3 }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
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
                {
                  //normal pricee -----------------------------------------------
                  !this.state.edited ? (
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginBottom: "10x",
                      }}
                    >
                      Price : {this.state.price1}
                    </label>
                  ) : //new price less than old price
                  this.state.editiableprice1 >
                    this.state.price1.split(" ")[0] ? (
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginBottom: "10x",
                      }}
                    >
                      Amount to be refunded :{" "}
                      {+this.state.editiableprice1 -
                        +this.state.price1.split(" ")[0]}{" "}
                      L.E
                    </label>
                  ) : (
                    //new price greater than or equal old price
                    <label
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        alignSelf: "center",
                        justifyContent: "center",
                        marginBottom: "10x",
                      }}
                    >
                      Amount to be paid :{" "}
                      {+this.state.price1.split(" ")[0] -
                        this.state.editiableprice1}{" "}
                      L.E
                    </label>
                  )
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
              sx={{ p: 3 }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
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
                {!this.state.edited ? (
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom: "10x",
                    }}
                  >
                    Price : {this.state.price2}
                  </label>
                ) : this.state.editiableprice2 >
                  this.state.price2.split(" ")[0] ? (
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom: "10x",
                    }}
                  >
                    Amount to be refunded :{" "}
                    {+this.state.editiableprice2 -
                      +this.state.price2.split(" ")[0]}{" "}
                    L.E
                  </label>
                ) : (
                  <label
                    style={{
                      fontSize: "22px",
                      fontWeight: "bold",
                      alignSelf: "center",
                      justifyContent: "center",
                      marginBottom: "10x",
                    }}
                  >
                    Amount to be paid :{" "}
                    {+this.state.price2.split(" ")[0] -
                      +this.state.editiableprice2}{" "}
                    L.E
                  </label>
                )}
              </div>
            </Box>
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
            height: "85px",
            backgroundColor: "rgba(20, 20, 20, 0.9)",
            marginBottom: "-30px",
          }}
        >
          <Stack
            direction="row"
            style={{
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                color: "#EEEEEE",
                display: "flex",
                justifyContent: "space-around",
                paddingTop: "15px",
              }}
            >
              {!this.state.edited ? (
                <label
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    alignSelf: "center",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  Total Price :{" "}
                  {+this.state.price2.split(" ")[0] +
                    +this.state.price1.split(" ")[0]}
                </label>
              ) : this.state.editiableprice2 + this.state.editiableprice1 >
                +this.state.price2.split(" ")[0] +
                  +this.state.price1.split(" ")[0] ? (
                <label
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    alignSelf: "center",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  Amount to be refunded :{" "}
                  {this.state.editiableprice2 +
                    this.state.editiableprice1 -
                    (+this.state.price2.split(" ")[0] +
                      +this.state.price1.split(" ")[0])}{" "}
                  L.E
                </label>
              ) : (
                <label
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    alignSelf: "center",
                    justifyContent: "center",
                    margin: "10px",
                  }}
                >
                  Amount to be paid :{" "}
                  {-(this.state.editiableprice2 + this.state.editiableprice1) +
                    (+this.state.price2.split(" ")[0] +
                      +this.state.price1.split(" ")[0])}{" "}
                  L.E
                </label>
              )}
            </div>
            <div style={{ paddingTop: "25px" }}>
              <Button
                label={
                  this.state.edited ? "Update Reservation" : "Place Reservation"
                }
                index={1}
                width={300}
                height={40}
                onClick={handleClickOpen}
              ></Button>
            </div>
          </Stack>
        </div>
        {
          //case it is not an edit ----------------------------------------
        }
        {!this.state.edited ? (
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
                You are about to reserve and pay{" "}
                {+this.state.price2.split(" ")[0] +
                  +this.state.price1.split(" ")[0]}{" "}
                L.E for the shown trip
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
        ) : //case the edited reservation price is the same as the original reservation price --------------------------
        this.state.editiableprice2 + this.state.editiableprice1 ===
          +this.state.price2.split(" ")[0] +
            +this.state.price1.split(" ")[0] ? (
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
        ) : //case the new price is larger than the previous price -----------------------------------------------------
        this.state.editiableprice2 + this.state.editiableprice1 >
          +this.state.price2.split(" ")[0] +
            +this.state.price1.split(" ")[0] ? (
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
                You will receive an email shortly to confirm refunding you with{" "}
                {this.state.editiableprice2 +
                  this.state.editiableprice1 -
                  (+this.state.price2.split(" ")[0] +
                    +this.state.price1.split(" ")[0])}{" "}
                L.E!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <button onClick={handleClose}>Cancel</button>
              <button onClick={this.onClickRefund} autoFocus>
                Continue
              </button>
            </DialogActions>
          </Dialog>
        ) : (
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
                You are about to Update your reservation and pay{" "}
                {-(this.state.editiableprice2 + this.state.editiableprice1) +
                  (+this.state.price2.split(" ")[0] +
                    +this.state.price1.split(" ")[0])}{" "}
                L.E for the shown trip
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
        )}
      </div>
    );
  }
}

export default TripSummary;
