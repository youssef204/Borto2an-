import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
class SearchFlights extends React.Component {
  constructor() {
    super();
    this.state = {
      fromAirport: "",
      toAirport: "",
      flightNumber: "",
      departureTime: "",
      arrivalTime: ""
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e, state) => {
    e.preventDefault();

    const data = this.getNonEmptyFields(state);

    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      params: data,
    })
      .then((res) => {
        // go to search results component with the data
        console.log(res.data);
        this.props.history.push({
          pathname: "/search_results",
          state: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getNonEmptyFields = (obj) => {
    const res = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) res[key] = value;
    }
    return res;
  };

  render() {
    return (
      <>
        <Header Title =" Search Flights Page" />
        
        <br></br>
        <br></br>

        <form noValidate onSubmit={(e) => this.onSubmit(e, this.state)}>
          <div>
            <label>Departure Airport: </label>
            <br />
            <input
              type="text"
              placeholder="e.x. Cairo"
              name="fromAirport"
              value={this.state.fromAirport}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Terminal: </label>
            <br />
            <input
              type="number"
              placeholder="e.x. 1"
              name="fromTerminal"
              value={this.state.fromTerminal}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Arrival Airport: </label>
            <br />

            <input
              type="text"
              placeholder="e.x. Paris"
              name="toAirport"
              value={this.state.toAirport}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Arrival Terminal: </label>
            <br />

            <input
              type="number"
              placeholder="e.x. 1"
              name="toTerminal"
              value={this.state.toTerminal}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Flight Number: </label>
            <br />

            <input
              type="number"
              placeholder="Flight Number"
              name="flightNumber"
              value={this.state.flightNumber}
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Time: </label>
            <br />
            <input
              type="datetime-local"
              name="departureTime"
              value={this.state.departureTime}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Arrival Time: </label>
            <br />
            <input
              type="datetime-local"
              name="arrivalTime"
              value={this.state.arrivalTime}
              onChange={this.onChange}
            />
          </div>
          <br></br>

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
        <br></br>
        <button
          onClick={() => {
            this.props.history.push("/all_flights");
          }}
        >
          View all flights
        </button>
        <br/> <br/>
        <button
          onClick={() => {
            this.props.history.push("/create_flight");
          }}
        >
          Create a flight
        </button>
      </>
    );
  }
}

export default SearchFlights;
