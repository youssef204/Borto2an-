import React from "react";
import axios from "axios";
import DropDown from './ModelsDropDownList';

class CreateFlight extends React.Component {
    constructor(){
        super();
        this.state = {
          flightNumber:0,
          departure: {
            airport:'',
            terminal:'',
            time:null
          },
          arrival:{
            airport:'',
            terminal:'',
            time:null
          },
          airline:'',
          hasTransit:false,
          airplaneModelID:'',
          economyCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          },
          businessCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          },
          firstCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    departureOnChange = (e) =>{
      this.setState({departure:{...this.state.departure,[e.target.name]: e.target.value}});
    }

    arrivalOnChange = (e) =>{
      this.setState({arrival:{...this.state.arrival,[e.target.name]: e.target.value}});
    }

    economyOnChange = (e) =>{
      this.setState({economyCabin:{...this.state.economyCabin,[e.target.name]: e.target.value}});
    }

    businessOnChange = (e) =>{
      this.setState({businessCabin:{...this.state.businessCabin,[e.target.name]: e.target.value}});
    }

    firstOnChange = (e) =>{
      this.setState({firstCabin:{...this.state.firstCabin,[e.target.name]: e.target.value}});
    }
    

    onSubmit = e => {
    e.preventDefault();

    const data = {
      flightNumber: this.state.flightNumber,
      departure: this.state.departure,
      arrival: this.state.arrival,
      airline: this.state.airline,
      hasTransit: this.state.hasTransit,
      airplaneModelID: this.state.airplaneModelID,
      economyCabin: this.state.economyCabin,
      businessCabin: this.state.businessCabin,
      firstCabin: this.state.firstCabin
    }; 
    axios
      .post('http://localhost:8000/api/flights', data)
      .then(res => {
        this.setState({
          flightNumber:0,
          departure: {
            airport:'',
            terminal:'',
            time:null
          },
          arrival:{
            airport:'',
            terminal:'',
            time:null
          },
          airline:'',
          hasTransit:false,
          airplaneModelID:'',
          economyCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          },
          businessCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          },
          firstCabin:{
            takenSeats:[],
            adultPrice:0,
            adultBaggage:0,
            childPrice:0,
            childBaggage:0
          }
        })
        this.props.history.push("/");
        alert("flight created successfully!!");
      })
      .catch(err => {
        alert("Enter Valid Data");
      });      
  };

    render() { 
        return (<>
        <div className="createFlight-container">

              <form className=" UpdateForm-container" noValidate onSubmit={this.onSubmit}>
              <h2>Create New Flight </h2>
              <br></br>
                Flight Number:
                <div>
                  <input
                    type='number'
                    placeholder='Flight Number'
                    name='flightNumber'
                    value={this.state.flightNumber}
                    onChange={this.onChange}
                  />
                </div>


                <div>
                <hr/>
                Departure Details
                <br/>
                  Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      value={this.state.departure.airport}
                      onChange={this.departureOnChange}
                    />
                  </div>
                  Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      value={this.state.departure.terminal}
                      onChange={this.departureOnChange}
                    />
                  </div>
                  Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      value={this.state.departure.time}
                      onChange={this.departureOnChange}
                    />
                  </div>

                  <hr/>
                  </div>



                <div>
                Arrival Details
                <br/>
                  Air port:
                  <div>
                    <input
                      type='text'
                      placeholder='Air port'
                      name='airport'
                      value={this.state.arrival.airport}
                      onChange={this.arrivalOnChange}
                    />
                  </div>
                  Terminal:
                  <div>
                    <input
                      type='text'
                      placeholder='Terminal'
                      name='terminal'
                      value={this.state.arrival.terminal}
                      onChange={this.arrivalOnChange}
                    />
                  </div>
                  Time:
                  <div>
                    <input
                      type='datetime-local'
                      placeholder='Time'
                      name='time'
                      value={this.state.arrival.time}
                      onChange={this.arrivalOnChange}
                    />
                  </div>

                  <hr/>
                  </div>


                Airline:
                <div>
                  <input
                    type='text'
                    placeholder='Airline'
                    name='airline'
                    value={this.state.airline}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                    Please check if this flight has a transit 
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

                  <DropDown 
                  name="airplaneModelID"
                  onChange={this.onChange}/>

                </div>


                <div>
                <hr/>
                Economy Cabin
                <br/>
                  Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.economyCabin.adultPrice}
                      onChange={this.economyOnChange}
                    />
                  </div>
                  Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.economyCabin.adultBaggage}
                      onChange={this.economyOnChange}
                    />
                  </div>
                  Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.economyCabin.childPrice}
                      onChange={this.economyOnChange}
                    />
                  </div>
                  Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.economyCabin.childBaggage}
                      onChange={this.economyOnChange}
                    />
                  </div>
                  </div>




                  <div>
                <hr/>
                Business Cabin
                <br/>
                  Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.businessCabin.adultPrice}
                      onChange={this.businessOnChange}
                    />
                  </div>
                  Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.businessCabin.adultBaggage}
                      onChange={this.businessOnChange}
                    />
                  </div>
                  Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.businessCabin.childPrice}
                      onChange={this.businessOnChange}
                    />
                  </div>
                  Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.businessCabin.childBaggage}
                      onChange={this.businessOnChange}
                    />
                  </div>
                  </div>



                  
                <div>
                <hr/>
                First Class Cabin
                <br/>
                  Adult Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Adult Price'
                      name='adultPrice'
                      value={this.state.firstCabin.adultPrice}
                      onChange={this.firstOnChange}
                    />
                  </div>
                  Adult Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='adultBaggage'
                      value={this.state.firstCabin.adultBaggage}
                      onChange={this.firstOnChange}
                    />
                  </div>
                  Child Price:
                  <div>
                    <input
                      type='number'
                      placeholder='Child Price'
                      name='childPrice'
                      value={this.state.firstCabin.childPrice}
                      onChange={this.firstOnChange}
                    />
                  </div>
                  Child Baggage:
                  <div>
                    <input
                      type='number'
                      placeholder='Maximum baggage in Kg'
                      name='childBaggage'
                      value={this.state.firstCabin.childBaggage}
                      onChange={this.firstOnChange}
                    />
                  </div>
                  <hr/>
                  </div>




                <button>
                  Create
                </button>
              </form>
              </div>
          </>
    );
    }
}
 
export default CreateFlight;