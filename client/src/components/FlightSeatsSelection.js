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
              localStorage.setItem("selectedSeats" , JSON.stringify(this.state));
              alert(`chosen seats are ${departureSeats} and ${arrivalSeats}`);
              window.location.href = "http://localhost:3000/trip_summary";
            }}
            sx={{ margin: "20px" }}
          >
            Confirm
          </Button>
        );
      };
    
    render() { 

          const departure = {
            flight : JSON.parse(localStorage.getItem("flightSelectionData")).flight1,
            numberOfSeats: +(JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber) + +(JSON.parse(localStorage.getItem("flightSelectionData")).childNumber),
            chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData")).chosenCabin1,
          };
          const arrival = {
            flight : JSON.parse(localStorage.getItem("flightSelectionData")).flight2,
            numberOfSeats: +(JSON.parse(localStorage.getItem("flightSelectionData")).adultNumber) + +(JSON.parse(localStorage.getItem("flightSelectionData")).childNumber),
            chosenCabin: JSON.parse(localStorage.getItem("flightSelectionData")).chosenCabin2,
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