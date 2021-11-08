import axios from "axios";
import React, { Component } from "react";

class UpdateFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {},
      updated: {},
      flightNumber: -1,
    };
  }
  componentDidMount() {
    const flightData = { ...this.props.location.state.flight };
    // const arrival = flightData.arrivalTime;
    // const deprature = flightData.departureTime;
    // flightData.flightDate = date.substring(0, 10);
    flightData.arrivalTime = flightData.arrivalTime.substring(0,16);
    flightData.departureTime = flightData.departureTime.substring(0,16);
    this.setState({
      flight: flightData,
      flightNumber: this.props.location.state.flightNumber,
    });
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });

    const newFlight = { ...this.state.flight };
    newFlight[name] = value;
    this.setState({ flight: newFlight });

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
    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>
                Home
              </button>
       <header
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            Update Flight {this.state.flightNumber}
          </header>
          <br></br>

        <form noValidate onSubmit={this.onSubmit}>
          <div>
            <label> Departure Airport: </label>
            <br></br>
            <input
              type="text"
              placeholder="From Airport"
              name="fromAirport"
              value={this.state.flight.fromAirport}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label> Departure Terminal: </label>
            <br></br>
            <input
              type="number"
              placeholder="From Terminal"
              name="fromTerminal"
              value={this.state.flight.fromTerminal}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Arrival Airport: </label>
            <br></br>
            <input
              type="text"
              placeholder="To Airport"
              name="toAirport"
              value={this.state.flight.toAirport}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Arrival Terminal: </label>
            <br></br>
            <input
              type="number"
              placeholder="To Terminal"
              name="toTerminal"
              value={this.state.flight.toTerminal}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Departure Time: </label>
            <br></br>
            <input
              type="datetime-local"
              placeholder="Departure Time"
              name="departureTime"
              value={this.state.flight.departureTime}
              onChange={this.onChange}
            />
          </div>
          <div>
          <label> Arrival Time: </label>
            <br></br>
            <input
              type="datetime-local"
              placeholder="Arrival Time"
              name="arrivalTime"
              value={this.state.flight.arrivalTime}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Economy Seats Available: </label>
            <br></br>
            <input
              type="number"
              placeholder="Economy Seats Available"
              name="economySeatsAvailable"
              value={this.state.flight.economySeatsAvailable}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Business Seats Available: </label>
            <br></br>
            <input
              type="number"
              placeholder="Business Seats Available"
              name="businessSeatsAvailable"
              value={this.state.flight.businessSeatsAvailable}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> First class Seats Available: </label>
            <br></br>
            <input
              type="number"
              placeholder="First class Seats Available"
              name="firstSeatsAvailable"
              value={this.state.flight.firstSeatsAvailable}
              onChange={this.onChange}
            />
          </div>

          <div>
          <label> Airline: </label>
            <br></br>
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
              checked={this.state.flight.hasTransit}
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
            <br></br>

          <button>Update

            </button> 
        </form>
        </div>
    );
  }
}

export default UpdateFlight;
