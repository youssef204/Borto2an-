import axios from 'axios';
import React from 'react';

class ReservationSummary extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      Reservation: {
        "_id": "61aa5046507c8c08803d2177",
        "userId": "61a5359e658b90eaeb1da412",
        "price": 100,
        "departureFlight": {
            "_id": "61abbbbc4e225b6af58edaea",
            "flightId": {
                "_id": "61a8f74d52f3604dd937856b",
                "flightNumber": 99,
                "departure": {
                    "airport": "London",
                    "terminal": "3",
                    "time": "2021-12-02T12:41:00.000Z",
                    "_id": "61a8f74d52f3604dd937856c"
                },
                "arrival": {
                    "airport": "New York",
                    "terminal": "1",
                    "time": "2021-12-02T12:41:00.000Z",
                    "_id": "61a8f74d52f3604dd937856d"
                },
                "airline": "Lufthanza",
                "hasTransit": true,
                "airplaneModelID": "61a8f72352f3604dd9378564",
                "economyCabin": {
                    "takenSeats": [],
                    "adultPrice": -4,
                    "adultBaggage": 0,
                    "childPrice": 0,
                    "childBaggage": 0,
                    "_id": "61a8f74d52f3604dd937856e"
                },
                "businessCabin": {
                    "takenSeats": [],
                    "adultPrice": 0,
                    "adultBaggage": 0,
                    "childPrice": 0,
                    "childBaggage": 0,
                    "_id": "61a8f74d52f3604dd937856f"
                },
                "firstCabin": {
                    "takenSeats": [],
                    "adultPrice": 0,
                    "adultBaggage": 0,
                    "childPrice": 0,
                    "childBaggage": 0,
                    "_id": "61a8f74d52f3604dd9378570"
                },
                "createdAt": "2021-12-02T16:41:49.742Z",
                "updatedAt": "2021-12-02T22:53:36.246Z",
                "__v": 4
            },
            "seats": [
                1,
                2
            ],
            "cabin": "economy",
            "noAdults": 3,
            "noChildren": 4
        },
        "returnFlight": {
            "_id": "61abbbbc4e225b6af58edaeb",
            "flightId": {
                "_id": "61a902672d2a2a1f1e214233",
                "flightNumber": 6,
                "departure": {
                    "airport": "New York",
                    "terminal": "2",
                    "time": "2021-12-17T19:27:00.000Z",
                    "_id": "61a902672d2a2a1f1e214234"
                },
                "arrival": {
                    "airport": "London",
                    "terminal": "2",
                    "time": "2021-12-17T21:27:00.000Z",
                    "_id": "61a902672d2a2a1f1e214235"
                },
                "airline": "vsvdd",
                "hasTransit": false,
                "airplaneModelID": "61a8f72c52f3604dd9378567",
                "economyCabin": {
                    "takenSeats": [],
                    "adultPrice": 6,
                    "adultBaggage": 1,
                    "childPrice": 3,
                    "childBaggage": 1,
                    "_id": "61a902672d2a2a1f1e214236"
                },
                "businessCabin": {
                    "takenSeats": [],
                    "adultPrice": 3,
                    "adultBaggage": 2,
                    "childPrice": 4,
                    "childBaggage": 1,
                    "_id": "61a902672d2a2a1f1e214237"
                },
                "firstCabin": {
                    "takenSeats": [],
                    "adultPrice": 3,
                    "adultBaggage": 0,
                    "childPrice": 2,
                    "childBaggage": 1,
                    "_id": "61a902672d2a2a1f1e214238"
                },
                "createdAt": "2021-12-02T17:29:11.136Z",
                "updatedAt": "2021-12-02T22:53:36.408Z",
                "__v": 4
            },
            "seats": [
                3,
                4
            ],
            "cabin": "business",
            "noAdults": 3,
            "noChildren": 4
        }
    }
    };
}
onShowReservations=()=>{
    this.props.history.push("/reservations");
}

  render(){
    
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
