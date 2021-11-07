import axios from "axios";
import React, { Component } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

class UpdateFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: [],
      updated: {},
      //todo
      flightNumber: 1920,
    };
    //todo
    //this.setState(this.props.history.location.state);
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });
    //console.log(this.state);
  };
  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      flightNumber: this.state.flightNumber,
      update: this.state.updated,
    };
    console.log(data);
    axios
      .put("http://localhost:8000/api/flights", data)
      .then(this.props.history.push("/"));
  };

  render() {
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div>
        <h1>Update flight {this.state.flight.flightNumber}</h1>

        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <input
              type="text"
              placeholder="From.."
              name="from"
              value={this.state.flight.from}
              onChange={this.onChange}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="To.."
              name="to"
              value={this.state.flight.to}
              onChange={this.onChange}
            />
          </div>

          <div>
            <input
              type="date"
              placeholder="Flight Date"
              name="flightDate"
              value={this.state.flight.flightDate}
              onChange={this.onChange}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Departure Time"
              name="departureTime"
              value={this.state.flight.departureTime}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Arrival Time"
              name="arrivalTime"
              value={this.state.flight.arrivalTime}
              onChange={this.onChange}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="Seats Available"
              name="seatsAvailable"
              value={this.state.flight.seatsAvailable}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Cabin"
              name="cabin"
              value={this.state.flight.cabin}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Total Seats"
              name="totalSeats"
              value={this.state.flight.totalSeats}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Airplane Type"
              name="airplaneType"
              value={this.state.flight.airplaneType}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Duration"
              name="duration"
              value={this.state.flight.duration}
              onChange={this.onChange}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Airline"
              name="airline"
              value={this.state.flight.airline}
              onChange={this.onChange}
            />
          </div>
          <div>
            Please check if this flight has a transit
            <input
              type="checkbox"
              onChange={(e) => {
                this.onChange({
                  target: {
                    name: "hasTransit",
                    value: e.target.checked ? true : false,
                  },
                });
              }}
            />
          </div>

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Open alert dialog
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you really want to delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                if you really love me dont delete
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default UpdateFlight;
