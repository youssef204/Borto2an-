import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";

class SearchFlights extends React.Component {
  constructor() {
    super();
    this.state = {
      departure:{},
      arrival:{},
      flightNumber:''
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  departureOnChange = (e) => {
    this.setState({departure:{ ...this.state.departure,[e.target.name]: e.target.value }});
  };

  arrivalOnChange = (e) => {
    this.setState({arrival:{ ...this.state.arrival,[e.target.name]: e.target.value }});
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
        <form noValidate onSubmit={(e) => this.onSubmit(e, this.state)}>
          <div>
            <label>Departure Airport: </label>
            <br />
            <input
              type="text"
              placeholder="Departure Airport"
              name="airport"
              onChange={this.departureOnChange}
            />
          </div>

          <div>
            <label>Departure Terminal: </label>
            <br />
            <input
              type="text"
              placeholder="Departure Terminal"
              name="terminal"
              onChange={this.departureOnChange}
            />
          </div>

          <div>
            <label>Arrival Airport: </label>
            <br />

            <input
              type="text"
              placeholder="Arrival Airport"
              name="airport"
              onChange={this.arrivalOnChange}
            />
          </div>

          <div>
            <label>Arrival Terminal: </label>
            <br />

            <input
              type="text"
              placeholder="Arrival Terminal"
              name="terminal"
              onChange={this.arrivalOnChange}
            />
          </div>

          <div>
            <label>Flight Number: </label>
            <br />

            <input
              type="number"
              placeholder="Flight Number"
              name="flightNumber"
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Time: </label>
            <br />
            <input
              type="datetime-local"
              name="time"
              onChange={this.departureOnChange}
            />
          </div>
          <div>
            <label>Arrival Time: </label>
            <br />
            <input
              type="datetime-local"
              name="time"
              onChange={this.arrivalOnChange}
            />
          </div>
          <br></br>

          <input
            type="submit"
            className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
      </>
    );
  }
}

export default SearchFlights;
