import axios from 'axios';
import React from 'react';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import Button from "../Button";

class ReservationSummary extends React.Component {

    constructor(props) {
    super(props);
    const Reservation = JSON.parse(
      localStorage.getItem("reservationSummary")
    );
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
       selectedArrSeats
    };
    this.state = {
      flightsWithReservation
    }
    }

  render(){
    if(!localStorage.getItem("reservationSummary")){
        return this.props.history.push("/");
    }
      const Reservation = this.state.Reservation;
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
  } else window.location.href = "/sign_in";
}
componentDidMount(){
  this.postReservation();
  localStorage.removeItem('reservationSummary');
  localStorage.removeItem('searchResultData');
  localStorage.removeItem('selectedSeats');
  localStorage.removeItem('flightSelectionData');
  window.dispatchEvent( new Event('storage') );
}

onReturnToHome=()=>{
    this.props.history.push('/');
}
    
onShowReservations=()=>{
  this.props.history.push("/reservations");
}

  render(){
      const Reservation = this.state.flightsWithReservation;
    return (
      <div>
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
              sx={{ p: 5 }}
              style={{
                backgroundColor: "#ffffff",
                width : "40%"
              }}
            >
              <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <label style={{ fontSize: "24px" , fontWeight:"bold"}}>
                      THANK YOU FOR CHOOSING US!
                  </label>
                </div>
              </Stack>
            <hr/>
            <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "left",
            }}
          >
            <div>
            <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginRight:"20px"
                  }}
                >
                  <label style={{ fontSize: "16px" , fontWeight:"16"}}>
                      Departure Flight Details
                  </label>
                </div>
              </Stack>
            <br/>
            <div>
            <br/>Flight Number: {Reservation.flight1.flightNumber}
            <br/>From Airport: {Reservation.flight1.departure.airport}
            <br/>From Terminal: {Reservation.flight1.departure.terminal}
            <br/>From Time: {Reservation.flight1.departure.time.substring(0,10)+" at "+Reservation.flight1.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.flight1.arrival.airport}
            <br/>To Terminal: {Reservation.flight1.arrival.terminal}
            <br/>To Time: {Reservation.flight1.arrival.time.substring(0,10)+" at "+Reservation.flight1.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.flight1.airline}
            <br/>Has Transit: {Reservation.flight1.hasTransit.toString()}
            <br/>Reserved Seats: {Reservation.selectedDepSeats
                      .slice(0, Reservation.selectedDepSeats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      Reservation.selectedDepSeats[
                        Reservation.selectedDepSeats.length - 1
                      ]
                    }
            <br/>Cabin: {Reservation.Reservation.departureFlight.cabin}
            <br/>Number of Adults: {Reservation.Reservation.departureFlight.noAdults}
            <br/>Number of Children: {Reservation.Reservation.departureFlight.noChildren}
            </div>
            </div>
            <hr/>
            <div>
            <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <label style={{ fontSize: "16px" , fontWeight:"16"}}>
                      Return Flight Details
                  </label>
                </div>
              </Stack>
            <br/>
            <br/>Flight Number: {Reservation.flight2.flightNumber}
            <br/>From Airport: {Reservation.flight2.departure.airport}
            <br/>From Terminal: {Reservation.flight2.departure.terminal}
            <br/>From Time: {Reservation.flight2.departure.time.substring(0,10)+" at "+Reservation.flight2.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.flight2.arrival.airport}
            <br/>To Terminal: {Reservation.flight2.arrival.terminal}
            <br/>To Time: {Reservation.flight2.arrival.time.substring(0,10)+" at "+Reservation.flight2.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.flight2.airline}
            <br/>Has Transit: {Reservation.flight2.hasTransit.toString()}
            <br/>Reserved Seats: {Reservation.selectedArrSeats
                      .slice(0, Reservation.selectedArrSeats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      Reservation.selectedArrSeats[
                        Reservation.selectedArrSeats.length - 1
                      ]
                    }
            <br/>Cabin: {Reservation.Reservation.returnFlight.cabin}
            <br/>Number of Adults: {Reservation.Reservation.returnFlight.noAdults}
            <br/>Number of Children: {Reservation.Reservation.returnFlight.noChildren}
            <br/> <br/>
            </div>
            </div>
            <hr/>
            <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <label style={{ fontSize: "22px" , fontWeight:"bold"}}>
                  Reservation Price
                  </label>
                </div>
              </Stack>
              <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around"
                  }}
                >
                  <label style={{ fontSize: "22px" , fontWeight:"bold"}}>
                  {+Reservation.price1.split(" ")[0] + +Reservation.price2.split(" ")[0]} L.E
                  </label>
                </div>
              </Stack>
              <Stack style={{ margin: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop:"30px"
                  }}
                >

<button  onClick={this.onShowReservations}>Show All Reservations</button>
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
        <br/>
        </div>
    );
  }
  
}

export default ReservationSummary;
