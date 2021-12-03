import React from "react";
import axios from "axios";

class SearchFlights extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
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
              name="departure.airport"
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Terminal: </label>
            <br />
            <input
              type="text"
              placeholder="Departure Terminal"
              name="departure.terminal"
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Arrival Airport: </label>
            <br />

            <input
              type="text"
              placeholder="Arrival Airport"
              name="arrival.airport"
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Arrival Terminal: </label>
            <br />

            <input
              type="text"
              placeholder="Arrival Terminal"
              name="arrival.terminal"
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
              onChange={this.onChange}
            />
          </div>

          <div>
            <label>Departure Time: </label>
            <br />
            <input
              type="date"
              name="departure.time"
              onChange={this.onChange}
            />
          </div>
          <div>
            <label>Arrival Time: </label>
            <br />
            <input
              type="date"
              name="arrival.time"
              onChange={this.onChange}
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