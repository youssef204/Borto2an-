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

class SearchFlights extends React.Component {
  constructor() {
    super();
    this.state = {
      departue:{},
      arrival:{},
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
        <form noValidate onSubmit={(e) => this.onSubmit(e, this.state)}>
          <div 
          style = {{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
               <Box component="span" border={2}
               borderRadius={10}
      borderLeft={2}
      borderRight={2}
      borderColor="#a9a9a9" sx={{ p: 5}}>
              <Stack direction="row" spacing={5} style={{justifyContent:'center', alignItems:'center'}}>
                  <Stack spacing={5}>
                   <OutlinedTextField
                   label = "From"
                   width={200}
                   fontsize={18}
                   name="departure"
                  // value={this.state.departue}
                   onChange={this.onChange}>
                   </OutlinedTextField>
                   <OutlinedTextField
                   label = "To"
                   width={200}
                   fontsize={18}
                  // value={this.state.arrival.airport}
                   onChange={this.onChange}>
                   </OutlinedTextField>
            </Stack>
                  <Stack spacing={5}>
                      <Calendar
                      label="Departure Date">
                      </Calendar>
                      <Calendar
                      label="Arrival Date">
                      </Calendar>
                  </Stack>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Cabin</FormLabel>
                        <RadioGroup
                          aria-label="cabin"
                          name="radio-buttons-group"
                        >
                         <FormControlLabel value="Economy" control={<Radio />} label="Economy" />
                         <FormControlLabel value="Business" control={<Radio />} label="Business" />
                         <FormControlLabel value="First" control={<Radio />} label="First Class" />
                        </RadioGroup>
                  </FormControl>
                  <Button
                  label="Search"
                  index={1}
                  width={70}
                  height={40}
                  onClick>
                  </Button>
            </Stack>
            </Box>
          </div>
        </form>
      </>
    );
  }
}

export default SearchFlights;
