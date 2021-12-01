import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import Button from "@mui/material/Button";

class SeatSelection extends React.Component {
  state = {
    loading: false,
    selectedSeats: [],
    prob: {
      flight:{
        "_id": "61a59b84b407eba753da9c9a",
        "flightNumber": 109,
        "departure": {
          "airport": "New York",
          "terminal": "990",
          "time": "2021-11-30T16:19:00.000Z",
          "_id": "61a63546e773595397a8261d"
        },
        "arrival": {
          "airport": "Berlin",
          "terminal": "991",
          "time": "2021-11-30T11:33:00.000Z",
          "_id": "61a63546e773595397a8261e"
        },
        "airline": "Lufthanza",
        "hasTransit": true,
        "airplaneModelID": "61a4efcae90c6cd60e01423f",
        "economyCabin": {
          "takenSeats": [],
          "adultPrice": 100,
          "adultBaggage": 90,
          "childPrice": 80,
          "childBaggage": 70,
          "_id": "61a636e2bafff62e510ab6ae"
        },
        "businessCabin": {
          "takenSeats": [],
          "adultPrice": 100,
          "adultBaggage": 90,
          "childPrice": 80,
          "childBaggage": 70,
          "_id": "61a636e2bafff62e510ab6af"
        },
        "firstCabin": {
          "takenSeats": [],
          "adultPrice": 100,
          "adultBaggage": 90,
          "childPrice": 80,
          "childBaggage": 70,
          "_id": "61a636e2bafff62e510ab6b0"
        },
        "createdAt": "2021-11-30T03:33:24.048Z",
        "updatedAt": "2021-11-30T19:22:22.265Z",
        "__v": 0
      },
      numberOfSeats:3,
      chosenCabin:'economy',
    }
  };
  

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        const selectedSeats = [...this.state.selectedSeats];
        selectedSeats.push(id);
        this.setState({ loading: false, selectedSeats });
        console.log(this.state.selectedSeats);
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        const selectedSeats = this.state.selectedSeats.filter((curID)=>curID != id);
        this.setState({ loading: false , selectedSeats});
        console.log(this.state.selectedSeats);
      }
    );
  };

  getSeatsInfo = ()=>{
    const airplaneModel = this.state.prob.flight.airplaneModelID;
    const cabin = this.state.prob.chosenCabin;
    let rows, cols, takenSeats;
    if(cabin === 'economy'){
      rows = airplaneModel.economyRows;
      cols = airplaneModel.economyColumns;
      takenSeats = this.state.prob.flight.economyCabin.takenSeats;
    }else if(cabin === 'business'){
      rows = airplaneModel.businessRows;
      cols = airplaneModel.businessColumns;
      takenSeats = this.state.prob.flight.businessCabin.takenSeats;
    }else if(cabin === 'first'){
      rows = airplaneModel.firstClassRows;
      cols = airplaneModel.firstClassColumns;
      takenSeats = this.state.prob.flight.firstCabin.takenSeats;
    }
    return {rows, cols, takenSeats};
  }
  buildSeatsArray = ()=>{
    console.log(this.getSeatsInfo());
    const {rows, cols, takenSeats} = this.getSeatsInfo();
    const seats = [];
    for(let i = 0, id = 1;i<rows;i++){
      const row = [];
      for(let j = 0;j<cols;j++, id++){
        const isReserved = takenSeats.includes(id);
        const tooltip = (isReserved?"Seat Taken":"Seat Available");
        const seat = {
          id: id,
          number: id,
          isReserved: isReserved,
          tooltip:tooltip
        }
        row.push(seat);
      }
      seats.push(row);
    }
    return seats;
  }

  renderConfirmButton = () => {
    if(this.state.selectedSeats.length == this.state.prob.numberOfSeats)
      return (<Button variant="contained">Confirm</Button>);
    else
    return (<Button variant="contained" disabled>Confirm</Button>);
  };

  
  render() {
    const seats = this.buildSeatsArray();
    console.log(seats);
    const rows = [
      [
        { id: 1, number: 1, isSelected: true, tooltip: "Reserved by you" },
        { id: 2, number: 2, tooltip: "Cost: 15$" },
        null,
        {
          id: 3,
          number: "3",
          isReserved: true,
          orientation: "east",
          tooltip: "Reserved by Rogger",
        },
        { id: 4, number: "4", orientation: "west" },
        null,
        { id: 5, number: 5 },
        { id: 6, number: 6 },
      ],
      [
        {
          id: 7,
          number: 1,
          isReserved: true,
          tooltip: "Reserved by Matthias Nadler",
        },
        { id: 8, number: 2, isReserved: true },
        null,
        { id: 9, number: "3", isReserved: true, orientation: "east" },
        { id: 10, number: "4", orientation: "west" },
        null,
        { id: 11, number: 5 },
        { id: 12, number: 6 },
      ],
      [
        { id: 13, number: 1 },
        { id: 14, number: 2 },
        null,
        { id: 15, number: 3, isReserved: true, orientation: "east" },
        { id: 16, number: "4", orientation: "west" },
        null,
        { id: 17, number: 5 },
        { id: 18, number: 6 },
      ],
      [
        { id: 19, number: 1, tooltip: "Cost: 25$" },
        { id: 20, number: 2 },
        null,
        { id: 21, number: 3, orientation: "east" },
        { id: 22, number: "4", orientation: "west" },
        null,
        { id: 23, number: 5 },
        { id: 24, number: 6 },
      ],
      [
        { id: 25, number: 1, isReserved: true },
        { id: 26, number: 2, orientation: "east" },
        null,
        { id: 27, number: "3", isReserved: true },
        { id: 28, number: "4", orientation: "west" },
        null,
        { id: 29, number: 5, tooltip: "Cost: 11$" },
        { id: 30, number: 6, isReserved: true },
      ],
    ];
    const { loading } = this.state;
    return (
      <div>
        <h1>Seat Picker</h1>
        <div style={{ marginTop: "100px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            removeSeatCallback={this.removeSeatCallback}
            rows={seats}
            maxReservableSeats={this.state.prob.numberOfSeats}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
          />
        </div>
        {this.renderConfirmButton()}
      </div>
    );
  }
}

export default SeatSelection;
