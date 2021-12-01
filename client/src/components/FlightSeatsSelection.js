import React, { Component } from 'react';
import SeatSelection from './SeatSelection';
import Button from "@mui/material/Button";

class FlightSeatsSelection extends React.Component {
    state = {
        departureSeats: [],
        arrivalSeats: []
    }
    updateSeats = (key,seats)=>{
        this.setState({[key]: seats});
    }

    renderConfirmButton = () => {
        const {departureSeats, arrivalSeats} = this.state;
        const allChosen = true;
        //  departureSeats.length == this.props.departure.numberOfSeats &&
        //  arrivalSeats.length == this.props.arrival.numberOfSeats;
        return (
          <Button
            variant="contained"
            disabled={!allChosen}
            onClick={() => {
              alert(`chosen seats are ${departureSeats} and ${arrivalSeats}`);
            }}
            sx={{ margin: "20px" }}
          >
            Confirm
          </Button>
        );
      };
    
    render() { 
        const flight = {
            _id: "61a59b84b407eba753da9c9a",
            flightNumber: 109,
            departure: {
              airport: "New York",
              terminal: "990",
              time: "2021-11-30T16:19:00.000Z",
              _id: "61a63546e773595397a8261d",
            },
            arrival: {
              airport: "Berlin",
              terminal: "991",
              time: "2021-11-30T11:33:00.000Z",
              _id: "61a63546e773595397a8261e",
            },
            airline: "Lufthanza",
            hasTransit: true,
            airplaneModelID: {
              _id: "61a4efcae90c6cd60e01423f",
              name: "Airbus 1192",
              economyRows: 10,
              economyColumns: 10,
              businessRows: 3,
              businessColumns: 5,
              firstClassRows: 6,
              firstClassColumns: 4,
              createdAt: "2021-11-29T15:20:42.166Z",
              updatedAt: "2021-11-29T15:20:42.166Z",
              __v: 0,
            },
            economyCabin: {
              takenSeats: [5, 6, 7, 100],
              adultPrice: 100,
              adultBaggage: 90,
              childPrice: 80,
              childBaggage: 70,
              _id: "61a636e2bafff62e510ab6ae",
            },
            businessCabin: {
              takenSeats: [],
              adultPrice: 100,
              adultBaggage: 90,
              childPrice: 80,
              childBaggage: 70,
              _id: "61a636e2bafff62e510ab6af",
            },
            firstCabin: {
              takenSeats: [],
              adultPrice: 100,
              adultBaggage: 90,
              childPrice: 80,
              childBaggage: 70,
              _id: "61a636e2bafff62e510ab6b0",
            },
            createdAt: "2021-11-30T03:33:24.048Z",
            updatedAt: "2021-11-30T19:22:22.265Z",
            __v: 0,
          };
          const departure = {
            flight,
            numberOfSeats: 3,
            chosenCabin: "economy",
          };
          const arrival = {
            flight,
            numberOfSeats: 5,
            chosenCabin: "first",
          };
        return (<div>
            <h1> Departure Flight </h1>
            <SeatSelection {...departure} onUpdateSeats={(seats) =>{this.updateSeats('departureSeats', seats)}}/>
            <h1> Arrival Flight </h1>
            <SeatSelection {...arrival} onUpdateSeats={(seats) =>{this.updateSeats('arrivalSeats', seats)}}/>
            {this.renderConfirmButton()}
        </div>);
    }
}
 
export default FlightSeatsSelection;