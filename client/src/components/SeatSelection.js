import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import Button from "@mui/material/Button";

class SeatSelection extends React.Component {
  state = {
    loading: false,
    selectedSeats: [],
  };

  remainingSeats = () => {
    return this.props.numberOfSeats - this.state.selectedSeats.length;
  };

  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        //await new Promise((resolve) => setTimeout(resolve, 0));
        console.log(`Added seat ${number}, row ${row}, id ${id}`);
        const newTooltip = `tooltip for id-${id} added by callback`;
        addCb(row, number, id, newTooltip);
        const selectedSeats = [...this.state.selectedSeats];
        selectedSeats.push(id);
        this.setState({ loading: false, selectedSeats });
        this.props.onUpdateSeats(selectedSeats);
      }
    );
  };

  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState(
      {
        loading: true,
      },
      async () => {
        //await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(`Removed seat ${number}, row ${row}, id ${id}`);
        // A value of null will reset the tooltip to the original while '' will hide the tooltip
        const newTooltip = ["A", "B", "C"].includes(row) ? null : "";
        removeCb(row, number, newTooltip);
        const selectedSeats = this.state.selectedSeats.filter(
          (curID) => curID != id
        );
        this.setState({ loading: false, selectedSeats });
        this.props.onUpdateSeats(selectedSeats);
      }
    );
  };

  getSeatsInfo = () => {
    const airplaneModel = this.props.flight.airplaneModelID;
    const cabin = this.props.chosenCabin;
    let rows, cols, takenSeats;
    if (cabin === "economy") {
      rows = airplaneModel.economyRows;
      cols = airplaneModel.economyColumns;
      takenSeats = this.props.flight.economyCabin.takenSeats;
    } else if (cabin === "business") {
      rows = airplaneModel.businessRows;
      cols = airplaneModel.businessColumns;
      takenSeats = this.props.flight.businessCabin.takenSeats;
    } else if (cabin === "first") {
      rows = airplaneModel.firstClassRows;
      cols = airplaneModel.firstClassColumns;
      takenSeats = this.props.flight.firstCabin.takenSeats;
    }
    return { rows, cols, takenSeats };
  };
  buildSeatsArray = () => {
    console.log(this.getSeatsInfo());
    const { rows, cols, takenSeats } = this.getSeatsInfo();
    const seats = [];
    for (let i = 0, id = 1; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++, id++) {
        const isReserved = takenSeats.includes(id);
        const tooltip = isReserved ? "Seat Taken" : "Seat Available";
        // add space at the middle of the plane representing aisle
        if (j === ~~(cols / 2)) row.push(null);
        const seat = {
          id: id,
          number: id,
          isReserved: isReserved,
          tooltip: tooltip,
        };
        row.push(seat);
      }
      seats.push(row);
    }
    return seats;
  };

  render() {
    const seats = this.buildSeatsArray();
    const { loading } = this.state;
    return (
      <div>
        {this.remainingSeats() == 0 ? (
          <h2>Select chosen seat to deselect.</h2>
        ) : (
          <h2>{`Choose ${this.remainingSeats()} more seats.`}</h2>
        )}
        <div style={{ margin: "20px" }}>
          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            removeSeatCallback={this.removeSeatCallback}
            rows={seats}
            maxReservableSeats={this.props.numberOfSeats}
            alpha
            visible
            selectedByDefault
            loading={loading}
            tooltipProps={{ multiline: true }}
          />
        </div>
      </div>
    );
  }
}

export default SeatSelection;
