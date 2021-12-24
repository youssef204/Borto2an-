import React from "react";
import axios from "axios";
import Header from "./Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import OutlinedTextField from "./OutlinedTextField";
import Button from "./Button";
import Calendar from "./Calendar";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Footer from './Footer/Footer'

class SearchFlights extends React.Component {
  constructor() {
    super();
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user"))["isAdmin"]
    )
      this.state = {};
    else
      this.state = {
        departure: {
          airport: "",
          terminal: "",
          time: null,
        },
        arrival: {
          airport: "",
          terminal: "",
          time: null,
        },
        chosenCabin: undefined,
        adultNumber: 0,
        childNumber: 0,
      };
  }

  componentDidMount() {
    localStorage.removeItem("searchResultData");
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("reservationSummary");
    localStorage.removeItem("selectedSeats");
    localStorage.removeItem("path");
    let EditedReservation = JSON.parse(
      localStorage.getItem("EditedReservation")
    );
    if (EditedReservation) {
      this.state.departure.airport =
        EditedReservation.departureFlight.flightId.departure.airport;
      this.state.arrival.airport =
        EditedReservation.returnFlight.flightId.departure.airport;
      this.state.departure.time = new Date(
        EditedReservation.departureFlight.flightId.departure.time
      ).getTime();
      this.state.arrival.time = new Date(
        EditedReservation.returnFlight.flightId.arrival.time
      ).getTime();
      this.state.adultNumber = parseInt(
        EditedReservation.departureFlight.noAdults
      );
      this.state.childNumber = parseInt(
        EditedReservation.departureFlight.noChildren
      );
      this.setState(this.state);
    }
    window.dispatchEvent(new Event("storage"));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit2 = (e, state) => {
    e.preventDefault();

    const data = this.getNonEmptyFields(state);

    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
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

  onChangeFrom = (e) => {
    this.setState((prevState) => ({
      departure: {
        ...prevState.departure,
        airport: e.target.value,
      },
    }));
  };

  onChangeTo = (e) => {
    this.setState((prevState) => ({
      arrival: {
        ...prevState.arrival,
        airport: e.target.value,
      },
    }));
  };

  onChangeDepTime = (date) => {
    this.setState((prevState) => ({
      departure: {
        ...prevState.departure,
        time: date,
      },
    }));
  };

  onChangeArrTime = (date) => {
    //const inputval = date.toISOString();
    this.setState((prevState) => ({
      arrival: {
        ...prevState.arrival,
        time: date,
      },
    }));
    // console.log(this.selectedArrday);
    //this.render();
    //console.log(this.state);
  };

  onChangeCabin = (e) => {
    if (e.target.value === "Economy")
      this.setState((prevState) => ({
        ...prevState,
        chosenCabin: "economyCabin",
      }));
    else if (e.target.value === "Business")
      this.setState((prevState) => ({
        ...prevState,
        chosenCabin: "businessCabin",
      }));
    else if (e.target.value === "First")
      this.setState((prevState) => ({
        ...prevState,
        chosenCabin: "firstCabin",
      }));
    //this.render();
    //console.log(this.chosenCabin);
  };
  onChangeAdult = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      adultNumber: e.target.value,
    }));
    // this.render();
    // console.log(this.adultnumber);
  };

  onChangeChild = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      childNumber: e.target.value,
    }));
  };

  onErrorDep = (e) => {
    e.target.label = "error";
  };

  onSubmit = async (e, state) => {
    if (!this.validateInput()) return;
    e.preventDefault();

    const data = this.getNonEmptyFields(state);
    //console.log(data);
    let paramsDataSent = {
      "departure.airport": data["departure"]["airport"],
      //"departure.time": data["departure"]["time"],
      "arrival.airport": data["arrival"]["airport"],
      //"arrival.time" : data["arrival"]["time"]
    };

    let res = await axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      params: paramsDataSent,
    });
    // .then((res) => {
    // go to search results component with the data

    // let sentData = this.filterData(this.state.chosenCabin, res);
    let sentData = res.data;
    sentData = this.filterDataByDate(
      this.state.departure.time,
      this.state.arrival.time,
      sentData
    );
    console.log("cabin choosen ", this.state.chosenCabin);
    sentData = sentData.filter((entry) => {
      return (
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].economyRows *
            +entry["airplaneModelID"].economyColumns -
            +entry.economyCabin.takenSeats.length ||
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].businessRows *
            +entry["airplaneModelID"].businessColumns -
            +entry.businessCabin.takenSeats.length ||
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].firstClassRows *
            +entry["airplaneModelID"].firstClassColumns -
            +entry.firstCabin.takenSeats.length
      );
    });
    let paramsDataReturn = {
      "departure.airport": data["arrival"]["airport"],
      //"departure.time": data["arrival"]["time"],
      "arrival.airport": data["departure"]["airport"],
      //"arrival.time" : data["arrival"]["time"]
    };

    res = await axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      params: paramsDataReturn,
    });
    // let returnData = this.filterData(this.state.chosenCabin, res);
    let returnData = res.data;
    returnData = this.filterDataByDate(
      this.state.departure.time,
      this.state.arrival.time,
      returnData
    );
    returnData = returnData.filter((entry) => {
      return (
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].economyRows *
            +entry["airplaneModelID"].economyColumns -
            +entry.economyCabin.takenSeats.length ||
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].businessRows *
            +entry["airplaneModelID"].businessColumns -
            +entry.businessCabin.takenSeats.length ||
        +this.state.adultNumber + +this.state.childNumber <=
          +entry["airplaneModelID"].firstClassRows *
            +entry["airplaneModelID"].firstClassColumns -
            +entry.firstCabin.takenSeats.length
      );
    });
    console.log("sentData are", sentData);
    console.log("returnData are", returnData);

    let stateData = {
      sentData,
      returnData,
      adultNumber: this.state.adultNumber,
      childNumber: this.state.childNumber,
      chosenCabin: this.state.chosenCabin,
      from: this.state.departure.airport,
      to: this.state.arrival.airport,
    };

    localStorage.setItem("searchResultData", JSON.stringify(stateData));
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("reservationSummary");
    console.log(JSON.parse(localStorage.getItem("searchResultData")));
    this.props.history.push("/flight_selection");
    localStorage.setItem("path", "http://localhost:3000/flight_selection");
    window.dispatchEvent(new Event("storage"));
  };

  filterData(cabin, unfilteredData) {
    console.log("timing ", typeof this.state.departure.time);
    let totalSeats = +this.state.childNumber + +this.state.adultNumber;
    let ans = unfilteredData.data.filter((entry) => entry[cabin] !== null);
    let rows =
      cabin === "economyCabin"
        ? "economyRows"
        : cabin === "businessCabin"
        ? "businessRows"
        : "firstClassRows";
    let columns =
      cabin === "economyCabin"
        ? "economyColumns"
        : cabin === "businessCabin"
        ? "businessColumns"
        : "firstClassColumns";
    console.log(
      "result iissssssss ",
      ans[0]["airplaneModelID"][rows] * ans[0]["airplaneModelID"][columns] -
        ans[0][cabin]["takenSeats"].length
    );
    console.log("totalll nummmmm ", totalSeats);
    ans.filter((entry) => {
      return (
        totalSeats <=
        entry["airplaneModelID"][rows] * entry["airplaneModelID"][columns] -
          entry[cabin]["takenSeats"].length
      );
    });
    // ans = this.filterDataByDate(
    //   this.state.departure.time,
    //   this.state.arrival.time,
    //   ans
    // );
    return ans;
  }

  filterDataByDate(dep, arr, unfilteredData) {
    // console.log("timing ", typeof this.state.departure.time);
    // console.log("unfiltered", unfilteredData);
    //console.log(new Date(new Date(dep).setHours(0,0,0)));
    // console.log(new Date(unfilteredData[0].arrival.time));
    // console.log(new Date(arr));

    const ans = unfilteredData.filter((e) => {
      return (
        new Date(
          new Date(
            new Date(e.departure.time).setHours(
              new Date(e.departure.time).getHours() - 2
            )
          )
        ) >= new Date(new Date(dep).setHours(0, 0, 0)) &&
        new Date(
          new Date(
            new Date(e.arrival.time).setHours(
              new Date(e.arrival.time).getHours() - 2
            )
          )
        ) <= new Date(new Date(arr).setHours(23, 59, 59))
      );
    });
    console.log("after filter", ans);
    return ans;
  }

  getNonEmptyFields = (obj) => {
    const res = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) res[key] = value;
    }
    return res;
  };

  validateInput = () => {
    if (!this.state.departure.airport) {
      console.log(this.state.departure.airport);
      return false;
    }
    if (!this.state.arrival.airport) {
      console.log("arr problem");
      return false;
    }
    if (!this.state.adultNumber) {
      console.log("adult problem");
      return false;
    }
    if (this.state.departure.time == null || isNaN(this.state.departure.time)) {
      console.log(this.state.departure.time);
      return false;
    }
    if (this.state.arrival.time == null || isNaN(this.state.arrival.time)) {
      console.log("arr time problem");
      return false;
    }
    console.log("no problem");
    return true;
  };

  render() {
    let EditedReservation = localStorage.getItem("EditedReservation");
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user"))["isAdmin"]
    ) {
      console.log(localStorage.getItem("user")["isAdmin"]);
      return (
        <>
          <br></br>
          <div className="profile-container">
            <form
              className=" ProfileForm-container"
              noValidate
              onSubmit={(e) => this.onSubmit2(e, this.state)}
            >
              <h2>Search For Flights</h2>
              <br></br>
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

              <button>Search</button>
            </form>
          </div>
          <br></br>
        </>
      );
    } else {
      return (
        <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundImage: "url('search.jpg')",
            backgroundSize: "100% 100%",
          }}
        >
          <Box
            component="span"
            style={{ background: "#ffffffe0" }}
            border={2}
            borderRadius={10}
            borderLeft={2}
            borderRight={2}
            borderColor="#a9a9a9"
            sx={{ p: 5 }}
          >
            <Stack
              direction="row"
              spacing={7}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Stack spacing={5}>
                <OutlinedTextField
                  label="From*"
                  width={200}
                  fontsize={18}
                  value={this.state.departure.airport}
                  onChange={this.onChangeFrom}
                  disabled={EditedReservation}
                ></OutlinedTextField>
                {this.state.departure.airport &&
                this.state.arrival.airport !== undefined &&
                this.state.arrival.airport === this.state.departure.airport ? (
                  <TextField
                    style={{ width: "200px", fontsize: "18px" }}
                    onChange={this.onChangeTo}
                    error
                    id="outlined-error-helper-text"
                    label="To*"
                    defaultValue={this.state.arrival.airport}
                    helperText="please enter different destinations."
                  />
                ) : (
                  <OutlinedTextField
                    label="To*"
                    width={200}
                    fontsize={18}
                    onChange={this.onChangeTo}
                    value={this.state.arrival.airport}
                    disabled={EditedReservation}
                  />
                )}
              </Stack>
              <Stack spacing={5}>
                <Calendar
                  onChange={this.onChangeDepTime}
                  selected={this.state.departure.time}
                  value={this.state.departure.time}
                  minDate={Date.now()}
                  maxDate={
                    this.state.arrival.time === null
                      ? {}
                      : this.state.arrival.time
                  }
                  // onError = {this.onErrorDep}
                  label="Departure Date*"
                  error={isNaN(this.state.departure.time)}
                ></Calendar>
                <Calendar
                  label="Return Date*"
                  onChange={this.onChangeArrTime}
                  selected={this.state.arrival.time}
                  minDate={
                    this.state.departure.time === undefined
                      ? Date.now()
                      : this.state.departure.time
                  }
                  value={this.state.arrival.time}
                  error={isNaN(this.state.arrival.time)}
                ></Calendar>
              </Stack>
              <FormControl component="fieldset">
                <FormLabel component="legend">Choose your Cabin</FormLabel>
                <RadioGroup
                  aria-label="cabin"
                  name="radio-buttons-group"
                  onChange={this.onChangeCabin}
                >
                  <FormControlLabel
                    value="Economy"
                    control={<Radio />}
                    label="Economy"
                  />
                  <FormControlLabel
                    value="Business"
                    control={<Radio />}
                    label="Business"
                  />
                  <FormControlLabel
                    value="First"
                    control={<Radio />}
                    label="First Class"
                  />
                </RadioGroup>
              </FormControl>
              <Stack spacing={5}>
                <div>
                  <label style={{ margin: "10px" }}>No. of Adults*: </label>
                  <input
                    style={{ width: "150px", height: "20px" }}
                    type="number"
                    max="9"
                    min="1"
                    value={this.state.adultNumber}
                    onInvalid={this.invalid}
                    onChange={this.onChangeAdult}
                  />
                </div>
                <div>
                  <label style={{ margin: "5.75px" }}>No. of Children: </label>
                  <input
                    style={{ width: "150px", height: "20px" }}
                    type="number"
                    max="5"
                    min="0"
                    value={this.state.childNumber}
                    onChange={this.onChangeChild}
                  />
                </div>
              </Stack>
              <Stack spacing={5}>
                <Button
                  label="Search"
                  index={this.validateInput() ? 1 : 0} //{this.numberOfSelecetedInputs.includes(0) ? 0 : 1}
                  width={70}
                  height={40}
                  onClick={(e) => this.onSubmit(e, this.state)}
                ></Button>
              </Stack>
            </Stack>
          </Box>
        </div>
        <Footer/>
        </>
      );
    }
  }
}

export default SearchFlights;
