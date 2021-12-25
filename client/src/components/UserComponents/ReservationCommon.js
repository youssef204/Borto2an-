import React from 'react';
import {useHistory} from 'react-router-dom';
import { Stack } from '@mui/material';



function ReservationCommon({Reservation}) {
  console.log(Reservation);

  return (
    <>
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
            <br/>Flight Number: {Reservation.departureFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.departureFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.departureFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.departureFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.departureFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.departureFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.departureFlight.flightId.airline}
            <br/>Has Transit: {Reservation.departureFlight.flightId.hasTransit.toString()}
            <br/>Reserved Seats: {Reservation.departureFlight.seats.slice(0, Reservation.departureFlight.seats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      Reservation.departureFlight.seats[
                        Reservation.departureFlight.seats.length - 1
                      ]
                    }
            <br/>Cabin: {Reservation.departureFlight.cabin}
            <br/>Number of Adults: {Reservation.departureFlight.noAdults}
            <br/>Number of Children: {Reservation.departureFlight.noChildren}
            </div>
            </div>

            <div>
            <Stack>
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
            <br/>Flight Number: {Reservation.returnFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.returnFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.returnFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.returnFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.returnFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.returnFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.returnFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.returnFlight.flightId.airline}
            <br/>Has Transit: {Reservation.returnFlight.flightId.hasTransit.toString()}
            <br/>Reserved Seats: {Reservation.returnFlight.seats.slice(0, Reservation.returnFlight.seats.length - 1)
                      .map((entry) => entry + " , ")}{" "}
                    {
                      Reservation.returnFlight.seats[
                        Reservation.returnFlight.seats.length - 1
                      ]
                    }
            <br/>Cabin: {Reservation.returnFlight.cabin}
            <br/>Number of Adults: {Reservation.returnFlight.noAdults}
            <br/>Number of Children: {Reservation.returnFlight.noChildren}

            <br/> <br/>
            </div>
            </div>
    </>

  )
}

export default ReservationCommon;
