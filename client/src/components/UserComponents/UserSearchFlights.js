import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import FilledTextField from "../FilledTextField";
import OutlinedTextField from "../OutlinedTextField";
import Button from "../Button";
import Calendar from "../Calendar";
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { Popover } from "@mui/material";
import { InputLabel } from "@mui/material";

class UserSearchFlights extends React.Component {
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
    console.log(this.state);
  };

  onChangeTo = (e) => {
    this.setState(prevState =>({
      arrival :{
        ... prevState.arrival,
        airport : e.target.value
      }
    }

    ));
    console.log(this.state);
  };

  onChangeDepTime = date => {
    const inputval = date.toISOString();
    this.setState(prevState =>({
      departure :{
        ... prevState.departure,
        time : inputval
      }
    }

    ));
    console.log(this.state);
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
  console.log(this.state);
}

  
onChangeCabin = e => {
  let chosenCabin = '';
  if(e.target.value === "Economy")
    chosenCabin = "economyCabin"
  else if(e.target.value === "Business")
    chosenCabin = "businessCabin"
  else if(e.target.value === "First")
    chosenCabin = "firstCabin"
  console.log(chosenCabin);
  return chosenCabin;
}
onChangeAdult = e => {
  let AdultNumber;
  AdultNumber = e.target.value.replace(/\D/,'')
  console.log(AdultNumber);
  return (AdultNumber);
}

onChangeChild = e => {
  let ChildNumber;
  ChildNumber = e.target.value.replace(/\D/,'')
  console.log(ChildNumber);
  return (ChildNumber);
}

getAirplaneEconomySeats = flight => {
  axios({
    method: "get",
    url: "http://localhost:8000/api/airplaneModel/",
    params: {_id : flight["airplaneModelID"]},
  }).then((res) => {
      let totalEconomySeats;
      totalEconomySeats = res["economyRows"] * res["economyColumns"];
      return totalEconomySeats;
  })
}

getAirplaneBusinessSeats = flight => {
  axios({
    method: "get",
    url: "http://localhost:8000/api/airplaneModel/",
    params: {_id : flight["airplaneModelID"]},
  }).then((res) => {
      let totalEconomySeats;
      totalEconomySeats = res["businessRows"] * res["businessColumns"];
      return totalEconomySeats;
  })
}

getAirplaneFirstClassSeats = flight => {
  axios({
    method: "get",
    url: "http://localhost:8000/api/airplaneModel/",
    params: {_id : flight["airplaneModelID"]},
  }).then((res) => {
      let totalEconomySeats;
      totalEconomySeats = res["firstClassRows"] * res["firstClassColumns"];
      return totalEconomySeats;
  })
}

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
        let choosenCabin = this.onChangeCabin();
        let AdultNo = this.onChangeAdult();
        let ChildNo = this.onChangeChild();
        let totalSeats = +ChildNo + +AdultNo;

        let sentData;
        if(choosenCabin === "economyCabin"){
           sentData = res.data.filter((entry) => entry.economyCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "economy");
           sentData.filter((entry) => totalSeats <= getAirplaneEconomySeats(entry) - entry["economyCabin"]["takenSeats"].length )
        }
        else if(choosenCabin === "businessCabin"){
           sentData = res.data.filter((entry) => entry.businessCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "business");
           sentData.filter((entry) => totalSeats <= getAirplaneBusinessSeats(entry) - entry["businessCabin"]["takenSeats"].length )
        }
        else if(choosenCabin === "firstCabin"){
           sentData = res.data.filter((entry) => entry.firstCabin !== null) 
           sentData.map((info) => info["chosenCabin"] = "first");
           sentData.filter((entry) => totalSeats <= getAirplaneFirstClassSeats(entry) - entry["firstCabin"]["takenSeats"].length )
        }
        console.log(sentData);
        this.props.history.push({
          pathname: "/search_results",
          state: sentData,
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
        <form noValidate onSubmit={(e) => this.onSubmit(e, this.state)}>
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
                   label = "From"
                   width={200}
                   fontsize={18}
                   onChange={this.onChangeFrom}
                   name="departure{airport}"
                   value={this.state.departure.airport}>
                   </OutlinedTextField>
                   <OutlinedTextField
                   label = "To"
                   width={200}
                   fontsize={18}
                   value={this.state.arrival.airport}
                   onChange={this.onChangeTo}>
                   </OutlinedTextField>
            </Stack>
                  <Stack spacing={5}>
                      <Calendar
                      onChange={this.onChangeDepTime}
                       selected={this.state.departure.time}
                       value={this.state.departure.time}
                      label="Departure Date">
                      </Calendar>
                      <Calendar
                      label="Arrival Date"
                      onChange={this.onChangeArrTime}
                      selected={this.state.arrival.time}
                      value={this.state.arrival.time}>
                      </Calendar>
                  </Stack>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Choose your Cabin</FormLabel>
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
                    <label style={{margin:"10px"}}>No. of Adults: </label>
                  <input style={{width:"150px" , height:"20px"}} type="number" max="9" min="1" onInvalid={this.invalid}  onChange={this.onChangeAdult}/>
                  </div>
                  <div >
                    <label style={{margin:"1.5px"}}>No. of Children: </label>
                  <input style={{width:"150px" , height:"20px"}} type="number" max="5" min="0"  onChange={this.onChangeAdult}/>
                  </div>
                  </Stack>
                  <Button
                  label="Search"
                  index={1}
                  width={70}
                  height={40}
                  onClick={this.onSubmit}>
                  </Button>
            </Stack>
            </Box>
          </div>
        </form>
    );
  }
}

export default UserSearchFlights;
