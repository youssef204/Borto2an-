import axios from 'axios';
import React from 'react';

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
onShowReservations=()=>{
    this.props.history.push("/reservations");
}
    

  render(){
    
      const Reservation = this.state.flightsWithReservation;
    return (
        <> 
         <div class="container" id="container">

            Reservation Price: {Reservation.price}
            </div>
            <div class="container" id="container">
            <hr/>
            Departure Flight details:
            <br/>
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
            <hr/>
            <div class="container" id="container">
            Return flight details:
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
            <br></br>
            <br></br>
            <button onClick={this.onShowReservations}>Show All Reservations</button>
        <br/>
        <br/>
        </>

    );
  }
  
}

export default ReservationSummary;
