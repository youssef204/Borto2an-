//CHECK 3LA EL ACCESS TOKEN FE KOL EL AXIOSS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import React from "react";
import axios from "axios";
import Header from "./Header";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import FilledTextField from "./FilledTextField";
import OutlinedTextField from "./OutlinedTextField";
import Button from "./Button";
import Calendar from "./Calendar";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Popover } from "@mui/material";
import { InputLabel } from "@mui/material";

class SearchFlights extends React.Component {
  //selectedArrday;
  //selectedDepday;
  //chosenCabin;
  // adultNumber;
  // childNumber;
  //numberOfSelecetedInputs = [0, 0, 0, 0, 0, 0];
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
    console.log(this.state);
    //this.render();
  };

  onChangeTo = (e) => {
    this.setState((prevState) => ({
      arrival: {
        ...prevState.arrival,
        airport: e.target.value,
      },
    }));
    //this.render();
  };

  onChangeDepTime = (date) => {
    this.setState((prevState) => ({
      departure: {
        ...prevState.departure,
        time: date,
      },
    }));
    // console.log(this.selectedDepday);
    //this.render();
    //console.log(this.state);
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
    //let arrDate = Date.parse(this.state.arrival.time);
    //console.log("arrival date is",arrDate);
    this.setState((prevState) => ({
      arrival: {
        ...prevState.arrival,
        time: this.state.arrival.time.toISOString().substring(0, 10),
      },
      departure: {
        ...prevState.departure,
        time: this.state.departure.time.toISOString().substring(0, 10),
      },
    }));
    console.log(this.state.departure.time.toISOString().substring(0, 10));
    //  console.log("are they equal ", this.selectedArrday.toISOString().localeCompare("2021-11-30T11:33:00.000Z"))
    const data = this.getNonEmptyFields(state);
    console.log(data);
    let paramsData = {
      "departure.airport": data["departure"]["airport"],
      "departure.time": data["departure"]["time"],
      "arrival.airport": data["arrival"]["airport"],
      //"arrival.time" : data["arrival"]["time"]
    };
    if (this.state.childNumber === undefined) this.state.childNumber = "0";

    let sentData;
    let res = await axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      params: paramsData,
    });
    // .then((res) => {
    // go to search results component with the data
    let totalSeats = +this.state.childNumber + +this.state.adultNumber;

    if (this.state.chosenCabin === "economyCabin") {
      sentData = res.data.filter((entry) => entry.economyCabin !== null);
      //sentData.map((info) => (info["chosenCabin"] = "economy"));
      sentData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["economyRows"] *
            entry["airplaneModelID"]["economyColumns"] -
            entry["economyCabin"]["takenSeats"].length
      );
      // sentData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // sentData.map((info) => (info["childNumber"] = this.childnumber));
    } else if (this.state.chosenCabin === "businessCabin") {
      sentData = res.data.filter((entry) => entry.businessCabin !== null);
      // sentData.map((info) => (info["chosenCabin"] = "business"));
      sentData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["businessRows"] *
            entry["airplaneModelID"]["businessColumns"] -
            entry["businessCabin"]["takenSeats"].length
      );
      // sentData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // sentData.map((info) => (info["childNumber"] = this.childnumber));
    } else if (this.state.chosenCabin === "firstCabin") {
      sentData = res.data.filter((entry) => entry.firstCabin !== null);
      // sentData.map((info) => (info["chosenCabin"] = "first"));
      sentData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["firstClassRows"] *
            entry["airplaneModelID"]["firstClassColumns"] -
            entry["firstCabin"]["takenSeats"].length
      );
      // sentData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // sentData.map((info) => (info["childNumber"] = this.childnumber));
    }
    // console.log("sentData are",sentData);
    // this.props.history.push({
    //   pathname: "/search_results",
    //   state: sentData,
    // });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });

    let paramsDataReturn = {
      "departure.airport": data["arrival"]["airport"],
      "departure.time": data["arrival"]["time"],
      "arrival.airport": data["departure"]["airport"],
      //"arrival.time" : data["arrival"]["time"]
    };

    res = await axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
      params: paramsDataReturn,
    });
    // .then((res) => {
    // go to search results component with the data

    let returnData;
    if (this.state.chosenCabin === "economyCabin") {
      returnData = res.data.filter((entry) => entry.economyCabin !== null);
      // returnData.map((info) => (info["chosenCabin"] = "economy"));
      returnData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["economyRows"] *
            entry["airplaneModelID"]["economyColumns"] -
            entry["economyCabin"]["takenSeats"].length
      );
      // returnData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // returnData.map((info) => (info["childNumber"] = this.childnumber));
    } else if (this.state.chosenCabin === "businessCabin") {
      returnData = res.data.filter((entry) => entry.businessCabin !== null);
      //returnData.map((info) => (info["chosenCabin"] = "business"));
      returnData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["businessRows"] *
            entry["airplaneModelID"]["businessColumns"] -
            entry["businessCabin"]["takenSeats"].length
      );
      // returnData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // returnData.map((info) => (info["childNumber"] = this.childnumber));
    } else if (this.state.chosenCabin === "firstCabin") {
      returnData = res.data.filter((entry) => entry.firstCabin !== null);
      //  returnData.map((info) => (info["chosenCabin"] = "first"));
      returnData.filter(
        (entry) =>
          totalSeats <=
          entry["airplaneModelID"]["firstClassRows"] *
            entry["airplaneModelID"]["firstClassColumns"] -
            entry["firstCabin"]["takenSeats"].length
      );
      //  returnData.map((info) => (info["AdultNumber"] = this.adultnumber));
      // returnData.map((info) => (info["childNumber"] = this.childnumber));
    }
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
    console.log("state Data ", stateData);
    // localStorage.setItem("depData",JSON.stringify(sentData));
    // localStorage.setItem("retData",JSON.stringify(returnData));
    // localStorage.setItem("adultNumber",JSON.stringify(this.adultnumber));
    // localStorage.setItem("chosenCabin",JSON.stringify(this.chosenCabin));
    // localStorage.setItem("chilcNumber",JSON.stringify(this.childnumber));
    localStorage.setItem("searchResultData", JSON.stringify(stateData));
    console.log(JSON.parse(localStorage.getItem("searchResultData")));
    window.location.href = "http://localhost:3000/flight_selection";

    // this.props.history.push({
    //   pathname: "/flight_component",
    //   state: stateData
    // });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  getNonEmptyFields = (obj) => {
    const res = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value) res[key] = value;
    }
    return res;
  };

  validateInput = () => {
    if (!this.state.departure.airport) {
      console.log("dep problem");
      return false;
    }
    if (!this.state.arrival.airport) {
      console.log("arr problem");
      return false;
    }
    if (!this.state.chosenCabin) {
      console.log("cabin problem");
      return false;
    }
    if (!this.state.adultNumber) {
      console.log("adult problem");
      return false;
    }
    if (!this.state.departure.time || isNaN(this.state.departure.time)) {
      console.log("dep time problem");
      return false;
    }
    if (!this.state.arrival.time || isNaN(this.state.arrival.time)) {
      console.log("arr time problem");
      return false;
    }
    console.log("no problem");
    return true;
  };

  render() {
    if (
      JSON.parse(localStorage.getItem("user")) &&
      JSON.parse(localStorage.getItem("user"))["isAdmin"]
    ) {
      console.log(localStorage.getItem("user")["isAdmin"]);
      return (
        <>
          <form noValidate onSubmit={(e) => this.onSubmit2(e, this.state)}>
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
              <input type="date" name="arrival.time" onChange={this.onChange} />
            </div>
            <br></br>

            <input
              type="submit"
              className="btn btn-outline-warning btn-block mt-4"
            />
          </form>
        </>
      );
    } else {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box
            component="span"
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
                <FormLabel component="legend">Choose your Cabin*</FormLabel>
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
      );
    }
  }
}

export default SearchFlights;
