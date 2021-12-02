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
  //  console.log(curFlightNumber, "curfn");
    axios({
      method: "get",
      url: "http://localhost:8000/api/flights",
      params: curFlightNumber,
    })
      .then((res) => {
        this.setState({
          flights: res.data,
        });
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
    let flightlist;
    const flights = this.state.flights;
    if (!flights) {
      flightlist = "there is no such flight !";
    } else {
      flightlist = flights.map((flight) => (
        <div>
          Flight Number: {flight.flightNumber}
          <br/>
          <hr/>
          Departure Details:
          <br/>
          Airport: {flight.departure.airport}
          <br/>
          Terminal: {flight.departure.terminal}
          <br/>
          Time: {flight.departure.time.substring(0, 10)+" at "+flight.departure.time.substring(11, 16)}
          <br/> <hr/>
          Arrival Details:
          <br/>
          Airport: {flight.arrival.airport}
          <br/>
          Terminal: {flight.arrival.terminal}
          <br/>
          Time: {flight.arrival.time.substring(0, 10)+" at "+flight.arrival.time.substring(11, 16)}
          <br/> <hr/>
          Airline: {flight.airline}
          <br/>
          Has transit: {flight.hasTransit?'True':'False'}
          <br/>
          Airplane Model: {flight.airplaneModelID?(flight.airplaneModelID.name+ 
                          " ==> [Economy seats: "+flight.airplaneModelID.economyRows+" × "+flight.airplaneModelID.economyColumns+
                          "] [Business seats: "+flight.airplaneModelID.businessRows+" × "+flight.airplaneModelID.businessColumns+
                          "] [First Class seats: "+flight.airplaneModelID.firstClassRows+" × "+flight.airplaneModelID.firstClassColumns+']'):""
                          }
          <br/> <hr/>


          Economy Cabin Details:
          <br/>
          Taken seats: {flight.economyCabin.takenSeats}
          <br/>
          Adult Price: {flight.economyCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.economyCabin.adultBaggage}
          <br/>
          Child Price: {flight.economyCabin.childPrice}
          <br/>
          Child Baggage: {flight.economyCabin.childBaggage}
          <br/> <hr/>


          Business Cabin Details:
          <br/>
          Taken seats: {flight.businessCabin.takenSeats}
          <br/>
          Adult Price: {flight.businessCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.businessCabin.adultBaggage}
          <br/>
          Child Price: {flight.businessCabin.childPrice}
          <br/>
          Child Baggage: {flight.businessCabin.childBaggage}
          <br/> <hr/>


          First Class Cabin Details:
          <br/>
          Taken seats: {flight.firstCabin.takenSeats}
          <br/>
          Adult Price: {flight.firstCabin.adultPrice}
          <br/>
          Adult Baggage: {flight.firstCabin.adultBaggage}
          <br/>
          Child Price: {flight.firstCabin.childPrice}
          <br/>
          Child Baggage: {flight.firstCabin.childBaggage}

          <br/>
          <br/>

          
          <button onClick={(e) => this.handleClick(e, state)}>Update</button>
          <div>
            <br></br>
            <button onClick={handleClickOpen}>Delete</button>
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

    
    return (
        <div>{flightlist}</div>
    );
  }
}

export default FlightDetails;