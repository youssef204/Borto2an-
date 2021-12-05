import axios from 'axios';
import React from 'react';

class ReservationSummary extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      Reservation:JSON.parse(localStorage.getItem("reservationSummary")),
    }
    }
    onShowReservations=()=>{
        this.props.history.push("/reservations");
    };

  render(){
    if(!localStorage.getItem("reservationSummary")){
        return this.props.history.push("/");
    }
      const Reservation = this.state.Reservation;
    return (
        <> 
         <div class="container" id="container">

            Reservation Price: {Reservation.price}
            </div>
            <div class="container" id="container">
            <hr/>
            Departure Flight details:
            <br/>
            <br/>Flight Number: {Reservation.departureFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.departureFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.departureFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.departureFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.departureFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.departureFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.departureFlight.flightId.airline}
            <br/>Has Transit: {Reservation.departureFlight.flightId.hasTransit}
            <br/>Reserved Seats: {Reservation.departureFlight.seats}
            <br/>Cabin: {Reservation.departureFlight.cabin}
            <br/>Number of Adults: {Reservation.departureFlight.noAdults}
            <br/>Number of Children: {Reservation.departureFlight.noChildren}
            </div>
            <hr/>
            <div class="container" id="container">
            Return flight details:
            <br/>
            <br/>Flight Number: {Reservation.returnFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.returnFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.returnFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.returnFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.returnFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.returnFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.returnFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.returnFlight.flightId.airline}
            <br/>Has Transit: {Reservation.returnFlight.flightId.hasTransit}
            <br/>Reserved Seats: {Reservation.returnFlight.seats}
            <br/>Cabin: {Reservation.returnFlight.cabin}
            <br/>Number of Adults: {Reservation.returnFlight.noAdults}
            <br/>Number of Children: {Reservation.returnFlight.noChildren}
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
