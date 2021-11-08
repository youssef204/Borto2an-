import React from "react";
import axios from "axios";
import Header from "./Header";

class CreateFlight extends React.Component {
    constructor(){
        super();
        this.state = {
            fromAirport:'',
            toAirport:'',
            fromTerminal:'',
            toTerminal:'',
            departureTime:'',
            arrivalTime:'',
            economySeatsAvailable: '',
            businessSeatsAvailable: '',
            firstSeatsAvailable: '',
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
      fromAirport: this.state.fromAirport,
      toAirport: this.state.toAirport,
      fromTerminal: this.state.fromTerminal,
      toTerminal: this.state.toTerminal,
      departureTime: this.state.departureTime,
      arrivalTime: this.state.arrivalTime,
      economySeatsAvailable: this.state.economySeatsAvailable,
      businessSeatsAvailable: this.state.businessSeatsAvailable,
      firstSeatsAvailable: this.state.firstSeatsAvailable,
      airline: this.state.airline,
      hasTransit: this.state.hasTransit
    }; 
    axios
      .post('http://localhost:8000/api/flights', data)
      .then(res => {
        this.setState({
            fromAirport:'',
            toAirport:'',
            fromTerminal:'',
            toTerminal:'',
            departureTime:'',
            arrivalTime:'',
            economySeatsAvailable: '',
            businessSeatsAvailable: '',
            firstSeatsAvailable: '',
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
                Departure Airport:
                <div>
                  <input
                    type='text'
                    placeholder='Departure Airport'
                    name='fromAirport'
                    value={this.state.fromAirport}
                    onChange={this.onChange}
                  />
                </div>
                Departure Terminal:
                <div>
                  <input
                    type='number'
                    placeholder='Departure Terminal'
                    name='fromTerminal'
                    value={this.state.fromTerminal}
                    onChange={this.onChange}
                  />
                </div>

                Arrival Airport:
                <div>
                  <input
                    type='text'
                    placeholder='Arrival Airport'
                    name='toAirport'
                    value={this.state.toAirport}
                    onChange={this.onChange}
                  />
                </div>
                Arrival Terminal:
                <div>
                  <input
                    type='number'
                    placeholder='Arrival Terminal'
                    name='toTerminal'
                    value={this.state.toTerminal}
                    onChange={this.onChange}
                  />
                </div>

                Departure Time:
                <div>
                  <input
                    type='datetime-local'
                    placeholder='Departure Time'
                    name='departureTime'
                    value={this.state.departureTime}
                    onChange={this.onChange}
                  />
                </div>

                Arrival Time:
                <div>
                  <input
                    type='datetime-local'
                    placeholder='Arrival Time'
                    name='arrivalTime'
                    value={this.state.arrivalTime}
                    onChange={this.onChange}
                  />
                </div>

                Economy Seats Available:
                <div>
                  <input
                    type='number'
                    placeholder='Economy Seats Available'
                    name='economySeatsAvailable'
                    value={this.state.economySeatsAvailable}
                    onChange={this.onChange}
                  />
                </div>

                Business Seats Available:
                <div>
                  <input
                    type='number'
                    placeholder='Business Seats Available'
                    name='businessSeatsAvailable'
                    value={this.state.businessSeatsAvailable}
                    onChange={this.onChange}
                  />
                </div>

                First Seats Available:
                <div>
                  <input
                    type='number'
                    placeholder='First class Seats Available'
                    name='firstSeatsAvailable'
                    value={this.state.firstSeatsAvailable}
                    onChange={this.onChange}
                  />
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

                <button>
                  Create
                </button>
              </form>
          </>
    );
    }
}
 
export default CreateFlight;