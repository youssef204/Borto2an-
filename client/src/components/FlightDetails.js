import React from "react";
import axios from "axios";


class FlightDetails extends React.Component {
    constructor(){
        super();
        this.state = {
            from:'',
            to:'',
            flightNumber:'',
            flightDate:'',
            departureTime:'',
            arrivalTime:'',
            seatsAvailable:'',
            cabin:'',
            totalSeats:'',
            airplaneType:'',
            duration:'',
            airline:'',
            hasTransit: false
        }
    }



    render() {
        let flight = this.props.history.location.state;
    return (
        <div>
      <label> From :{flight.from}  </label>
      <br/>
      <label> To :  </label>
      <br/>
      <label> Flight Number :  </label>
      <br/>
      <label> Flight Date :  </label>
      <br/>
      <label> Departure Time :  </label>
      <br/>
      <label> Arrival Time :  </label>
      <br/>
      <label> Transit :  </label>
      <br/>
      <label> Available Seats :  </label>
      <br/>
      <label> Total Seats :  </label>
      <br/>
      <label> Cabin :  </label>
      <br/>
      <label> Airplane Type :  </label>
      <br/>
      <label> Duration :  </label>
      </div>
    );
    }
}

export default FlightDetails;