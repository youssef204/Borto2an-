import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import FilledTextField from "./FilledTextField";
import OutlinedTextField from "./OutlinedTextField";
import Button from "./Button";
import Calendar from "./Calendar";
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { Popover } from "@mui/material";
import { InputLabel } from "@mui/material";

class UserSearchFlights extends React.Component {
  selectedDepAirport;
  selectedArrAirport;
  selectedArrday;
  selectedDepday;
  chosenCabin;
  adultnumber;
  childnumber;
  errorYes;
  numberOfSelecetedInputs = [0,0,0,0,0,0];
  constructor() {
    super();
    this.state = {
      departure:{
        airport : "",
        terminal : "",
        time : ""
      },
      arrival:{
        airport : "",
        terminal : "",
        time : ""
      },
    };
  }

  onChangeFrom = (e) => {
    this.setState(prevState =>({
      departure :{
        ... prevState.departure,
        airport : e.target.value
      }
    }

    ));
    if(e.target.value.length !== 0)
    this.numberOfSelecetedInputs[0] = 1;
    else
    this.numberOfSelecetedInputs[0] = 0;
    this.selectedDepAirport = e.target.value;
    console.log(this.state);
    console.log(this.numberOfSelecetedInputs);
    //this.render();
  };

  onChangeTo = (e) => {
    this.setState(prevState =>({
      arrival :{
        ... prevState.arrival,
        airport : e.target.value
      }
    }

    ));
    if(e.target.value.length !== 0)
    this.numberOfSelecetedInputs[1] = 1;
    else
    this.numberOfSelecetedInputs[1] = 0;
    this.selectedArrAirport = e.target.value
    console.log(e.target.value);
    console.log(this.numberOfSelecetedInputs);
    //this.render();
  };

  onChangeToError = e => {
    this.selectedArrAirport = e.target.value;
    this.setState({});
  }

  onChangeDepTime = date => {
    this.setState(prevState =>({
      departure :{
        ... prevState.departure,
        time : date
      }
    }

    ));
    this.selectedDepday = date
    if(this.selectedDepday !== null)
    this.numberOfSelecetedInputs[2] = 1;
    else 
    this.numberOfSelecetedInputs[2] = 0;
    console.log(this.numberOfSelecetedInputs);
   // console.log(this.selectedDepday);
    //this.render();
    //console.log(this.state);
}

onChangeArrTime = date => {
  //const inputval = date.toISOString();
  this.setState(prevState =>({
    arrival :{
      ... prevState.arrival,
      time : date
    }
  }

  ));
  this.selectedArrday = date;
  if(this.selectedArrday !== null)
  this.numberOfSelecetedInputs[3] = 1;
  else 
  this.numberOfSelecetedInputs[3] = 0;
  console.log(this.numberOfSelecetedInputs);
 // console.log(this.selectedArrday);
  //this.render();
  //console.log(this.state);
}

  
onChangeCabin = e => {
  if(e.target.value === "Economy")
    this.chosenCabin = "economyCabin"
  else if(e.target.value === "Business")
    this.chosenCabin = "businessCabin"
  else if(e.target.value === "First")
    this.chosenCabin = "firstCabin"
  else
    this.chosenCabin = null;
  if(this.chosenCabin !== null)
  this.numberOfSelecetedInputs[4] = 1;
  else
  this.numberOfSelecetedInputs[4] = 0;
  console.log(this.numberOfSelecetedInputs);
  this.setState({});
  //this.render();
  //console.log(this.chosenCabin);
}
onChangeAdult = e => {
  this.adultnumber = e.target.value
  if(e.target.value.length !== 0)
  this.numberOfSelecetedInputs[5] = 1;
  else
  this.numberOfSelecetedInputs[5] = 0;
  console.log(this.numberOfSelecetedInputs);
  console.log(this.numberOfSelecetedInputs.includes(0));
  this.setState({});
 // this.render();
 // console.log(this.adultnumber);
}

onChangeChild = e => {
  this.childnumber = e.target.value
  console.log(this.childnumber);
}

onErrorDep = e => {
  e.target.label = "error";
}
// getAirplaneEconomySeats = flight => {
//   axios({
//     method: "get",
//     url: "http://localhost:8000/api/airplaneModel/",
//     params: {_id : flight["airplaneModelID"]},
//   }).then((res) => {
//       let totalEconomySeats;
//       totalEconomySeats = res["economyRows"] * res["economyColumns"];
//       return totalEconomySeats;
//   })
// }

// getAirplaneBusinessSeats = flight => {
//   axios({
//     method: "get",
//     url: "http://localhost:8000/api/airplaneModel/",
//     params: {_id : flight["airplaneModelID"]},
//   }).then((res) => {
//       let totalEconomySeats;
//       totalEconomySeats = res["businessRows"] * res["businessColumns"];
//       return totalEconomySeats;
//   })
// }

// getAirplaneFirstClassSeats = flight => {
//   axios({
//     method: "get",
//     url: "http://localhost:8000/api/airplaneModel/",
//     params: {_id : flight["airplaneModelID"]},
//   }).then((res) => {
//       let totalEconomySeats;
//       totalEconomySeats = res["firstClassRows"] * res["firstClassColumns"];
//       return totalEconomySeats;
//   })
// }

  onSubmit = (e, state) => {
    e.preventDefault();
    //let arrDate = Date.parse(this.state.arrival.time);
    //console.log("arrival date is",arrDate);
    this.setState(prevState =>({
      arrival :{
        ... prevState.arrival,
        time : this.selectedArrday.toISOString().substring(0, 10)
      },
      departure :{
        ... prevState.departure,
        time : this.selectedDepday.toISOString().substring(0, 10)
      }
    }
  
    ));
   // console.log(this.selectedArrday.toISOString().substring(0, 10));
  //  console.log("are they equal ", this.selectedArrday.toISOString().localeCompare("2021-11-30T11:33:00.000Z"))
    const data = this.getNonEmptyFields(state);
    console.log(data);
    let paramsData ={
      "departure.airport" : data["departure"]["airport"],
      "departure.time" : data["departure"]["time"],
      "arrival.airport" : data["arrival"]["airport"],
      //"arrival.time" : data["arrival"]["time"]
    }
    if(this.childnumber === null)
       this.childnumber = 0;

  let sentData;
console.log("x=",paramsData);
    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      params: paramsData
    })
      .then((res) => {
        // go to search results component with the data
        let totalSeats = +this.childnumber + +this.adultnumber;

        if(this.chosenCabin === "economyCabin"){
           sentData = res.data.filter((entry) => entry.economyCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "economy");
           sentData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["economyRows"] * entry["airplaneModelID"]["economyColumns"]) - entry["economyCabin"]["takenSeats"].length )
           sentData.map((info) => info["AdultNumber"] = this.adultnumber);
           sentData.map((info) => info["childNumber"] = this.childnumber);
        }
        else if(this.chosenCabin === "businessCabin"){
           sentData = res.data.filter((entry) => entry.businessCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "business");
           sentData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["businessRows"] * entry["airplaneModelID"]["businessColumns"]) - entry["businessCabin"]["takenSeats"].length )
           sentData.map((info) => info["AdultNumber"] = this.adultnumber);
           sentData.map((info) => info["childNumber"] = this.childnumber);
          }
        else if(this.chosenCabin === "firstCabin"){
           sentData = res.data.filter((entry) => entry.firstCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "first");
           sentData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["firstClassRows"] * entry["airplaneModelID"]["firstClassColumns"]) - entry["firstCabin"]["takenSeats"].length )
           sentData.map((info) => info["AdultNumber"] = this.adultnumber);
           sentData.map((info) => info["childNumber"] = this.childnumber);
          }
        console.log("sentData are",sentData);
        // this.props.history.push({
        //   pathname: "/search_results",
        //   state: sentData,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
      

      let paramsDataReturn ={
        "departure.airport" : data["arrival"]["airport"],
        "departure.time" : data["arrival"]["time"],
        "arrival.airport" : data["departure"]["airport"],
        //"arrival.time" : data["arrival"]["time"]
      } 

      axios({
        method: "get",
        url: "http://localhost:8000/api/flights",
        params: paramsDataReturn
      })
        .then((res) => {
          // go to search results component with the data
          let totalSeats = +this.childnumber + +this.adultnumber;
  
          let returnData;
          if(this.chosenCabin === "economyCabin"){
             returnData = res.data.filter((entry) => entry.economyCabin !== null) 
             returnData.map((info) => info["chosenCabin"] = "economy");
             returnData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["economyRows"] * entry["airplaneModelID"]["economyColumns"]) - entry["economyCabin"]["takenSeats"].length )
             returnData.map((info) => info["AdultNumber"] = this.adultnumber);
             returnData.map((info) => info["childNumber"] = this.childnumber);
          }
          else if(this.chosenCabin === "businessCabin"){
             returnData = res.data.filter((entry) => entry.businessCabin !== null) 
             returnData.map((info) => info["chosenCabin"] = "business");
             returnData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["businessRows"] * entry["airplaneModelID"]["businessColumns"]) - entry["businessCabin"]["takenSeats"].length )
             returnData.map((info) => info["AdultNumber"] = this.adultnumber);
             returnData.map((info) => info["childNumber"] = this.childnumber);
            }
          else if(this.chosenCabin === "firstCabin"){
             returnData = res.data.filter((entry) => entry.firstCabin !== null) 
             returnData.map((info) => info["chosenCabin"] = "first");
             returnData.filter((entry) => totalSeats <= (entry["airplaneModelID"]["firstClassRows"] * entry["airplaneModelID"]["firstClassColumns"]) - entry["firstCabin"]["takenSeats"].length )
             returnData.map((info) => info["AdultNumber"] = this.adultnumber);
             returnData.map((info) => info["childNumber"] = this.childnumber);
            }
          console.log("sentData are",returnData);
          this.props.history.push({
            pathname: "/search_results",
            state: returnData,sentData
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
          <div 
          style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
               <Box component="span" border={2}
               borderRadius={10}
      borderLeft={2}
      borderRight={2}
      borderColor="#a9a9a9" sx={{ p: 5}}>
              <Stack direction="row" spacing={7} style={{justifyContent:'center', alignItems:'center'}}>
                  <Stack spacing={5}>
                  <OutlinedTextField
                   label = "From*"
                   width={200}
                   fontsize={18}
                   value={this.state.departure.airport}
                   onChange={this.onChangeFrom}>
                   </OutlinedTextField>
                    {this.selectedDepAirport !== undefined && this.selectedArrAirport !== undefined && this.selectedArrAirport === this.selectedDepAirport ?
                      <TextField
                      style={{width:"200px" ,fontsize:"18px"}}
                      onChange = {this.onChangeToError}
                      error
                      id="outlined-error-helper-text"
                      label="To*"
                      defaultValue={this.selectedArrAirport}
                      helperText="please enter different destinations."
                    />
                    :
                   <OutlinedTextField
                   label = "To*"
                   width={200}
                   fontsize={18}
                   onChange={this.onChangeTo}
                   name="arrival{airport}"
                   value={this.state.arrival.airport}>
                   </OutlinedTextField>
  }
            </Stack>
                  <Stack spacing={5}>
                      <Calendar
                      onChange={this.onChangeDepTime}
                       selected={this.state.departure.time}
                       value={this.state.departure.time}
                       minDate={Date.now()}
                       maxDate={this.selectedArrday === null ? {} : this.selectedArrday}
                      // onError = {this.onErrorDep}
                      label="Departure Date*">
                      </Calendar>
                      <Calendar
                      label="Arrival Date*"
                      onChange={this.onChangeArrTime}
                      selected={this.state.arrival.time}
                      minDate={this.selectedDepday === undefined ? Date.now() : this.selectedDepday}
                      value={this.state.arrival.time}>
                      </Calendar>
                  </Stack>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your Cabin*</FormLabel>
                        <RadioGroup
                          aria-label="cabin"
                          name="radio-buttons-group"
                          onChange={this.onChangeCabin}
                        >
                         <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
                         <FormControlLabel value="Business" control={<Radio />} label="Business" />
                         <FormControlLabel value="First" control={<Radio />} label="First Class" />
                        </RadioGroup>
                  </FormControl>
                  <Stack spacing={5}>
                    <div >
                    <label style={{margin:"10px"}}>No. of Adults*: </label>
                  <input style={{width:"150px" , height:"20px"}} type="number" max="9" min="1" onInvalid={this.invalid}  onChange={this.onChangeAdult}/>
                  </div>
                  <div >
                    <label style={{margin:"5.75px"}}>No. of Children: </label>
                  <input style={{width:"150px" , height:"20px"}} type="number" max="5" min="0"  onChange={this.onChangeAdult}/>
                  </div>
                  </Stack>
                  <Stack spacing={5}>
                  <Button
                  label="Search"
                  index = {this.numberOfSelecetedInputs.includes(0) ? 0 : 1}
                  width={70}
                  height={40}
                  onClick={this.numberOfSelecetedInputs.includes(0) ? {} : (e) => this.onSubmit(e, this.state)}>
                  </Button>
                  </Stack>
            </Stack>
            </Box>
          </div>
    );
  }
}

export default UserSearchFlights;
