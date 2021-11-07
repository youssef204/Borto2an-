import React from "react";
import axios from "axios";
import Flight from "./Flight";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

class FlightDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      open: false,
    };
  }

  componentDidMount() {
    let curFlightNumber = {
      flightNumber: this.props.history.location.state.flightNumber,
    };
    console.log(curFlightNumber, "curfn");
    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      params: curFlightNumber,
    })
      .then((res) => {
        this.setState({
          flights: res.data,
        });
        console.log(this.state);
        //      console.log(this.state.flights);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick(e, state) {
    if (typeof state.flight !== "undefined") {
      this.props.history.push("/update_flight", state);
    } else {
      console.log(state);
    }
  }
  render() {
    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    const handleDelete = () => {
      axios
        .delete(
          `http://localhost:8000/api/flights/${this.state.flights[0]?._id}`
        )
        .then(() => {
          console.log("deleted succesfully");
          this.props.history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
      this.setState({ open: false });
    };

    //important syntax : flightNumber is undefined problem occur when '?' is not in the code
    // the issue is state is by default {flight:[]} so there is no flight[0]
    // and you are trying to access flight[0].flightNumber
    // '?' means if the term before exists get from it the expression after '.'
    const state = {
      flightNumber: this.state.flights[0]?.flightNumber,
      flight: this.state.flights[0] ? this.state.flights[0] : undefined,
    };
    console.log("state is ", state);
    let flightlist;
    const flights = this.state.flights;
    if (!flights) {
      flightlist = "there is no flights !";
    } else {
      flightlist = flights.map((flight) => (
        <div>
          <label> From :{flight.from} </label>
          <br />
          <label> To : {flight.to} </label>
          <br />
          <label> Flight Number : {flight.flightNumber} </label>
          <br />
          <label> Flight Date :{flight.flightDate} </label>
          <br />
          <label> Departure Time :{flight.departureTime} </label>
          <br />
          <label> Arrival Time : {flight.arrivalTime} </label>
          <br />
          <label> Transit : {flight.hasTransit.toString()} </label>
          <br />
          <label> Available Seats {flight.seatsAvailable} : </label>
          <br />
          <label> Total Seats :{flight.totalSeats} </label>
          <br />
          <label> Cabin : {flight.cabin} </label>
          <br />
          <label> Airplane Type : {flight.airplaneType} </label>
          <br />
          <label> Duration : {flight.duration} </label>
          <br />
          <label> Airline : {flight.airline} </label>
          <br />
          <button onClick={(e) => this.handleClick(e, state)}>update</button>
          <div>
            <button onClick={handleClickOpen}>delete</button>
            <Dialog
              open={this.state.open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do you really want to delete?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  This action is irrevertable
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
    return (
      <>
        <button onClick={() => this.props.history.push("/")}>Home</button>
        <br />
        <br />
        <div>{flightlist}</div>
      </>
    );
  }
}

export default FlightDetails;
