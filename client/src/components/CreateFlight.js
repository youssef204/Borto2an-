import React from "react";
import axios from "axios";
import Header from "./Header";

class CreateFlight extends React.Component {
    constructor(){
        super();
        this.state = {
            from:'',
            to:'',
            flightDate:'',
            economySeatsAvailable: '',
            businessSeatsAvailable: '',
            firstSeatsAvailable: '',
            departureTime:'',
            arrivalTime:'',
            airPort:'',
            airline:'',
            hasTransit: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
    e.preventDefault();

    const data = {
      from: this.state.from,
      to: this.state.to,
      flightDate: this.state.flightDate,
      economySeatsAvailable: this.state.economySeatsAvailable,
      businessSeatsAvailable: this.state.businessSeatsAvailable,
      firstSeatsAvailable: this.state.firstSeatsAvailable,
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
      airPort: this.state.airPort,
      airline: this.state.airline,
      hasTransit: this.state.hasTransit
    }; 
    axios
      .post('http://localhost:8000/api/flights', data)
      .then(res => {
        this.setState({
            from:'',
            to:'',
            flightDate:'',
            departureTime:'',
            arrivalTime:'',
            seatsAvailable:'',
            totalSeats:'',
            airplaneType:'',
            duration:'',
            airline:'',
            hasTransit: false
        })
        this.props.history.push("/");
      })
      .catch(err => {
        alert("Enter Valid Data");
      });      
  };

    render() { 
        return (<>
              <button onClick={() => this.props.history.push('/')}>
                Home
              </button>
              <br/>
             <Header Title = " Create a new flight"/>
           
          
          <br></br>

              <form noValidate onSubmit={this.onSubmit}>
                <div>
                  <input
                    type='text'
                    placeholder='From..'
                    name='from'
                    value={this.state.from}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='To..'
                    name='to'
                    value={this.state.to}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='date'
                    placeholder='Flight Date'
                    name='flightDate'
                    value={this.state.flightDate}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='Departure Time'
                    name='departureTime'
                    value={this.state.departureTime}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Arrival Time'
                    name='arrivalTime'
                    value={this.state.arrivalTime}
                    onChange={this.onChange}
                  />
                </div>

                <div>
                  <input
                    type='number'
                    placeholder='Seats Available'
                    name='seatsAvailable'
                    value={this.state.seatsAvailable}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='Total Seats'
                    name='totalSeats'
                    value={this.state.totalSeats}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Airplane Type'
                    name='airplaneType'
                    value={this.state.airplaneType}
                    onChange={this.onChange}
                  />
                </div>
                <div>
                  <input
                    type='number'
                    placeholder='Duration'
                    name='duration'
                    value={this.state.duration}
                    onChange={this.onChange}
                  />
                </div>
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

                <button>
                  Create
                </button>
              </form>
          </>
    );
    }
}
 
export default CreateFlight;