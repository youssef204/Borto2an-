import React from "react";
import axios from "axios";
import Flight from "./Flight";


class FlightDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            flights: []
        }
    }

    componentDidMount(){
        let curFlightNumber = {flightNumber:this.props.history.location.state.flightNumber};
        console.log(curFlightNumber,"curfn")
        axios({
            method: "get",
            url: "http://localhost:8000/api/flights",
            params: curFlightNumber,
          }).then(res => {
            this.setState(
                {
                    flights: res.data
                }
            )
            console.log(this.state);    
      //      console.log(this.state.flights);
        }).catch(err=>{
            console.log(err); 
        })
    }
    render() {
        let flightlist;
        const flights = this.state.flights;
        if (!flights) {
          flightlist = "there is no flights !";
        } else {
          flightlist = flights.map((flight) => (
            <div>
            <label> From :{flight.from} </label>
            <br/>
            <label> To : {flight.to} </label>
            <br/>
            <label> Flight Number : {flight.flightNumber} </label>
            <br/>
            <label> Flight Date :{flight.flightDate}  </label>
            <br/>
            <label> Departure Time :{flight.departureTime}  </label>
            <br/>
            <label> Arrival Time : {flight.arrivalTime} </label>
            <br/>
            <label> Transit : {flight.hasTransit.toString()} </label>
            <br/>
            <label> Available Seats {flight.seatsAvailable} :  </label>
            <br/>
            <label> Total Seats :{flight.totalSeats}  </label>
            <br/>
            <label> Cabin : {flight.cabin} </label>
            <br/>
            <label> Airplane Type : {flight.airplaneType} </label>
            <br/>
            <label> Duration : {flight.duration} </label>
            <br/>
            <label> Airline  : {flight.airline} </label>
            <br/>
            </div>
          ));
        }



    /*render() {
      let flights = this.state.flights ;
      console.log(flights);
       const flightlist = flights.map((flight)=>{
        <div>
        <label> From :{flight.from} </label>
        <br/>
        <label> To : {flight.to} </label>
        <br/>
        <label> Flight Number : {flight.flightNumber} </label>
        <br/>
        <label> Flight Date :{flight.flightDate}  </label>
        <br/>
        <label> Departure Time :{flight.departureTime}  </label>
        <br/>
        <label> Arrival Time : {flight.arrivalTime} </label>
        <br/>
        <label> Transit : {flight.hasTransit} </label>
        <br/>
        <label> Available Seats {flight.seatsAvailable} :  </label>
        <br/>
        <label> Total Seats :{flight.totalSeats}  </label>
        <br/>
        <label> Cabin : {flight.cabin} </label>
        <br/>
        <label> Airplane Type : {flight.airplaneType} </label>
        <br/>
        <label> Duration : {flight.duration} </label>
        <br/>
        <label> Airline  : {flight.airline} </label>
        <br/>
        </div>
    }); */
  /*  let flights = this.state.flights ; 
    console.log(flights);
    return (
        <div>
        <label> From :{flights.from} </label>
        <br/>
        <label> To : {flights.to} </label>
        <br/>
        <label> Flight Number : {this.state.flightNumber} </label>
        <br/>
        <label> Flight Date :{this.state.flightDate}  </label>
        <br/>
        <label> Departure Time :{this.state.departureTime}  </label>
        <br/>
        <label> Arrival Time : {this.state.arrivalTime} </label>
        <br/>
        <label> Transit : {this.state.hasTransit} </label>
        <br/>
        <label> Available Seats {this.state.seatsAvailable} :  </label>
        <br/>
        <label> Total Seats :{this.state.totalSeats}  </label>
        <br/>
        <label> Cabin : {this.state.cabin} </label>
        <br/>
        <label> Airplane Type : {this.state.airplaneType} </label>
        <br/>
        <label> Duration : {this.state.duration} </label>
        <br/>
        <label> Airline  : {this.state.airline} </label>
        <br/>
        </div>*/
    return(
        <div>
 {flightlist}
        </div>
       
    )
       }
}

export default FlightDetails;