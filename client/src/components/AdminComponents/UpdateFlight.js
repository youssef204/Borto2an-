import axios from "axios";
import React from "react";
import DropDown from './ModelsDropDownList';

import { Button , TextField , Grid,Container,ThemeProvider,createTheme,Box} from "@mui/material";

const theme = createTheme();

class UpdateFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: {},
      updated: {},
      _id: -1,
    };
  }
  componentDidMount() {
    const flightData = { ...this.props.location.state.flight };
    this.setState({
      flight: flightData,
      _id: flightData._id,
    });
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });
  };

  departureOnChange = (e) =>{
    const newUpdate = { ...this.state.updated };
    let newDeparture = {...this.state.flight.departure};
    newDeparture = {...newDeparture,...this.state.updated.departure};
    const name = e.target.name;
    const value = e.target.value;
    newDeparture[name] = value;
    newUpdate['departure']=newDeparture;
    delete newUpdate.departure._id;
    this.setState({updated:newUpdate});
  };

  arrivalOnChange = (e) =>{
    const newUpdate = { ...this.state.updated };
    let newArrival = {...this.state.flight.arrival};
    newArrival = {...newArrival,...this.state.updated.arrival};
    const name = e.target.name;
    const value = e.target.value;
    newArrival[name] = value;
    newUpdate['arrival']=newArrival;
    delete newUpdate.arrival._id;
    this.setState({updated:newUpdate});
  };

  economyOnChange = (e) =>{
    const newUpdate = { ...this.state.updated };
    let newEconomy = {...this.state.flight.economyCabin};
    newEconomy = {...newEconomy,...this.state.updated.economyCabin};
    const name = e.target.name;
    const value = e.target.value;
    newEconomy[name] = value;
    newUpdate['economyCabin']=newEconomy;
    delete newUpdate.economyCabin._id;
    this.setState({updated:newUpdate});
  };

  businessOnChange = (e) =>{
    const newUpdate = { ...this.state.updated };
    let newBusiness = {...this.state.flight.businessCabin};
    newBusiness = {...newBusiness,...this.state.updated.businessCabin};
    const name = e.target.name;
    const value = e.target.value;
    newBusiness[name] = value;
    newUpdate['businessCabin']=newBusiness;
    delete newUpdate.businessCabin._id;
    this.setState({updated:newUpdate});
  };

  firstOnChange = (e) =>{
    const newUpdate = { ...this.state.updated };
    let newFirst = {...this.state.flight.firstCabin};
    newFirst = {...newFirst,...this.state.updated.firstCabin};
    const name = e.target.name;
    const value = e.target.value;
    newFirst[name] = value;
    newUpdate['firstCabin']=newFirst;
    delete newUpdate.firstCabin._id;
    this.setState({updated:newUpdate});
  };



  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: this.state._id,
      update: this.state.updated,
    };
    console.log("sent item", data);
    axios
      .put("http://localhost:8000/api/flights", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {this.props.history.push("/"); alert("updated successfully")})
      .catch(err => alert("Update failed! Data Error!!"));
  };

  render() {
    return (
      <>
        <br></br>
        <div
          className="TripTitleDiv"
          style={{
            height: "130px",
            marginBottom: "20px",
            paddingBottom: "50px",
          }}
        >
            <div class="TripTitleText">Update Flight Details</div>
          <img class="Trip-bg" src="admin.jpg" style={{position:"relative",top:-150}}/>
          </div>
              <br></br>
              <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          
          <Box component="form" sx={{ mt: 3 }} noValidate onSubmit={this.onSubmit}>


                {/* Flight Number:
                <div>
                  <input
                    type='number'
                    placeholder='Flight Number'
                    name='flightNumber'
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Flight Number'
                   name='flightNumber'
                   onChange={this.onChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>


                <div>
                <hr/>
                Departure Details
                <br/><br/>
                  {/* Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='text'
                   label='Airport'
                   name='airport'
                   onChange={this.departureOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='text'
                   label='Terminal'
                   name='terminal'
                   onChange={this.departureOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      onChange={this.departureOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='datetime-local'
                   placeholder='Time'
                   name='time'
                   onChange={this.departureOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>

                  <hr/>
                  </div>



                <div>
                Arrival Details
                <br/><br/>
                  {/* Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='text'
                   label='Airport'
                   name='airport'
                   onChange={this.arrivalOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='text'
                   label='Terminal'
                   name='terminal'
                   onChange={this.arrivalOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      onChange={this.arrivalOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='datetime-local'
                   placeholder='Time'
                   name='time'
                   onChange={this.arrivalOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>

                  <hr/>
                  </div>


                {/* Airline:
                <div>
                  <input
                    type='text'
                    placeholder='Airline'
                    name='airline'
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                   type='text'
                   label='Airline'
                   name='airline'
                   onChange={this.onChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                <div>
                    Has Transit? 
                  <input
                    type='checkbox'
                    onChange={(e) => {
                                this.onChange({
                                  target: {
                                    name: "hasTransit",
                                    value: e.target.checked?true:false
                                  },
                          });}} />
                </div>

                <br/>


                <div>

                  Flight Model:
                  <br/>

                  <DropDown 
                  name="airplaneModelID"
                  onChange={this.onChange}/>

                </div>


                <div>
                <hr/>
                Economy Cabin Details
                <br/><br/>
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Adult Price'
                   name='adultPrice'
                   onChange={this.economyOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum adult baggage'
                   name='adultBaggage'
                   onChange={this.economyOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Child Price'
                   name='childPrice'
                   onChange={this.economyOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      onChange={this.economyOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum child baggage'
                   name='childBaggage'
                   onChange={this.economyOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  </div>




                  <div>
                <hr/>
                Business Cabin Details
                <br/><br/>
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Adult Price'
                   name='adultPrice'
                   onChange={this.businessOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum adult baggage'
                   name='adultBaggage'
                   onChange={this.businessOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Child Price'
                   name='childPrice'
                   onChange={this.businessOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      onChange={this.businessOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum child baggage'
                   name='childBaggage'
                   onChange={this.businessOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  </div>



                  
                <div>
                <hr/>
                First Class Cabin Details
                <br/><br/>
                  {/* Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Adult Price'
                   name='adultPrice'
                   onChange={this.firstOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum adult baggage'
                   name='adultBaggage'
                   onChange={this.firstOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Child Price'
                   name='childPrice'
                   onChange={this.firstOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  {/* Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      onChange={this.firstOnChange}
                    />
                  </div> */}
                  <Grid item xs={12}>
                  <TextField
                   type='number'
                   label='Maximum child baggage'
                   name='childBaggage'
                   onChange={this.firstOnChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                  <hr/>
                  </div>




                  <Grid>
              <Button
              type = "submit"
              variant="contained"
              sx={{margin:"auto", mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}
            
            >
              Update Flight  
            </Button> 
            </Grid>
             
             
                </Box>
                </Box>
      </Container>
    </ThemeProvider>
      <br/>
      </>
    );
  }
}

export default UpdateFlight;
