import axios from 'axios';
import React from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


class ReservationDetails extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    }
  
  
  render(){

    const Reservation = this.props.history.location.state;
    console.log(Reservation);
    const onClick=()=>{
        axios.
        delete(`http://localhost:8000/api/reservations/${Reservation._id}`, {
            headers:{"authorization":"Bearer "+localStorage.getItem("token")},
        })
        .then(res => {alert("an email with refund amount has been sent to you"); this.props.history.push("/");})
        .catch(err => console.log(err));
    };

    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };

    return (
        <>       

            Reservation Price: {Reservation.price}

            <hr/>
            Departure Flight details:
            <br/>
            <br/>Flight Number: {Reservation.departureFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.departureFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.departureFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.departureFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.departureFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.departureFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.departureFlight.flightId.airline}
            <br/>Has Transit: {Reservation.departureFlight.flightId.hasTransit}
            <br/>Reserved Seats: {Reservation.departureFlight.seats}
            <br/>Cabin: {Reservation.departureFlight.cabin}
            <br/>Number of Adults: {Reservation.departureFlight.noAdults}
            <br/>Number of Children: {Reservation.departureFlight.noChildren}


            <hr/>
            Return flight details:
            <br/>
            <br/>Flight Number: {Reservation.returnFlight.flightId.flightNumber}
            <br/>From Airport: {Reservation.returnFlight.flightId.departure.airport}
            <br/>From Terminal: {Reservation.returnFlight.flightId.departure.terminal}
            <br/>From Time: {Reservation.returnFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.departure.time.substring(11,16)}
            <br/>To Airport: {Reservation.returnFlight.flightId.arrival.airport}
            <br/>To Terminal: {Reservation.returnFlight.flightId.arrival.terminal}
            <br/>To Time: {Reservation.returnFlight.flightId.arrival.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.arrival.time.substring(11,16)}
            <br/>Airline: {Reservation.returnFlight.flightId.airline}
            <br/>Has Transit: {Reservation.returnFlight.flightId.hasTransit}
            <br/>Reserved Seats: {Reservation.returnFlight.seats}
            <br/>Cabin: {Reservation.returnFlight.cabin}
            <br/>Number of Adults: {Reservation.returnFlight.noAdults}
            <br/>Number of Children: {Reservation.returnFlight.noChildren}

            <br/> <br/>

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
                <Button onClick={onClick} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
        <br/>
        <br/>
        </>

    );
  }
  
}

export default ReservationDetails;
