import axios from 'axios';
import React from 'react';


class ReservationDetails extends React.Component {

  
  
  render(){

    const Reservation = this.props.history.location.state;

    const onClick=()=>{
        axios.
        delete(`http://localhost:8000/api/reservations/${Reservation._id}`, {
            headers:{"authorization":"Bearer "+localStorage.getItem("token")},
        })
        .then(res => {alert("an email with refund amount has been sent to you"); this.props.history.push("/");})
        .catch(err => console.log(err));
    };

    return (
        <>       

            Reservation Price: {Reservation.price}

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


            <hr/>
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

        
        <button className="showAllDetails" onClick ={onClick} >
            Delete Reservation
        </button >
        <br/>
        <br/>
        </>

    );
  }
  
}

export default ReservationDetails;
