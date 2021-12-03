import React from 'react';


function ReservationDetails() {

  function onClick(){};
  
  return (
    <>       

       Reservation Price: {Reservation.price}

        <hr/>
        Departure Flight details:
        <br/>Flight Number:{Reservation.departureFlight.flightId.flightNumber}
        <br/>From Airport:{Reservation.departureFlight.flightId.departure.airport}
        <br/>From Terminal{Reservation.departureFlight.flightId.departure.terminal}
        <br/>From Time:{Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}
        <br/>To Airport:{Reservation.departureFlight.flightId.arrival.airport}
        <br/>To Terminal:{Reservation.departureFlight.flightId.arrival.terminal}
        <br/>To Time:{Reservation.departureFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.arrival.time.substring(11,16)}
        <br/>Airline:{Reservation.departureFlight.flightId.airline}
        <br/>Has Transit:{Reservation.departureFlight.flightId.hasTransit}
        <br/>Reserved Seats:{Reservation.departureFlight.seats}
        <br/>{Reservation.departureFlight.cabin}
        <br/>{Reservation.departureFlight.noAdults}
        <br/>{Reservation.departureFlight.noChildren}

        <br/>{Reservation.returnFlight.flightId.flightNumber}
        <br/>{Reservation.returnFlight.flightId.departure.airport}
        <br/>{Reservation.returnFlight.flightId.departure.terminal}
        <br/>{Reservation.returnFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.departure.time.substring(11,16)}
        <br/>{Reservation.returnFlight.flightId.arrival.airport}
        <br/>{Reservation.returnFlight.flightId.arrival.terminal}
        <br/>{Reservation.returnFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.arrival.time.substring(11,16)}
        <br/>{Reservation.returnFlight.flightId.airline}
        <br/>{Reservation.returnFlight.flightId.hasTransit}
        <br/>{Reservation.returnFlight.seats}
        <br/>{Reservation.returnFlight.cabin}
        <br/>{Reservation.returnFlight.noAdults}
        <br/>{Reservation.returnFlight.noChildren}


      
      <button className="showAllDetails" onClick ={onClick} >
        Delete Reservation
      </button >
    </>

  )
}

export default ReservationDetails;
