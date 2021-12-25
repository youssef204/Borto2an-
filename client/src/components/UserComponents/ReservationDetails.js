import axios from "axios";
import React from "react";
import Button from "@mui/material/Button";
import PeterButton from "../Button.js";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import ReservationCommon from "./ReservationCommon";
import ReservationDetailsTable from "./ReservationDetailsTable";

class ReservationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openUpdate: false,
      message: "",
      deleted: false,
    };
  }

  render() {
    let Reservation = this.props.history.location.state;
    if (!Reservation) {
      this.props.history.push("/");
      return <></>;
    }
    const onClick = () => {
      axios
        .delete(`http://localhost:8000/api/reservations/${Reservation._id}`, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.setState({message:"Reservation was deleted successfully. An email with refund amount has been sent to you.",
          deleted: true,
          open: false
        });
        })
        .catch((err) => {
          console.log(err);
          this.setState({message:"Sorry! We were unable to delete your reservation. Try again later!"});
        });
    };

    const sendItinerary = () => {
      axios
        .get(
          `http://localhost:8000/api/reservations/sendItinerary/${Reservation._id}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          // alert("An email with reservtion itinerary was sent to you.");
          // this.props.history.push("/");
          this.setState({message:"An email with reservtion details is sent to you."});
        })
        .catch((err) => {
          console.log(err);
          this.setState({message:"Sorry! We were unable to send you reservation details. Try again later!"});
        });
    };

    const handleClickOpen = () => {
      this.setState({ open: true });
    };
    const handleClickOpenUpdate = () => {
      this.setState({ openUpdate: true });
    };
    const handleCloseUpdate = () => {
      this.setState({ openUpdate: false });
    };
    const handleClose = () => {
      this.setState({ open: false });
    };
    const UpdateReservation = () => {
      let AirplaneModelDeparture;
      let AirplaneModelReturn;
      axios
        .get(
          `http://localhost:8000/api/airplaneModel/${Reservation.departureFlight.flightId.airplaneModelID}`,
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          AirplaneModelDeparture = res.data;
          axios
            .get(
              `http://localhost:8000/api/airplaneModel/${Reservation.returnFlight.flightId.airplaneModelID}`,
              {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              AirplaneModelReturn = res.data;
              Reservation.airplaneModeDeparture = AirplaneModelDeparture;
              Reservation.airplaneModeReturn = AirplaneModelReturn;
              localStorage.setItem(
                "EditedReservation",
                JSON.stringify(Reservation)
              );
              this.props.history.push("/");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };

    const renderMainButtons = (reservationDeleted) => {
      if (!reservationDeleted) {
        return (
            <div style={{ marginLeft: "50%", marginTop: "20px" }}>
              <span className="footerButtonMargin">
              <PeterButton
                variant="contained"
                index="1"
                onClick={handleClickOpen}
                width="200px"
                height="60px"
                label="Delete"
              /> </span>
              <span className="footerButtonMargin">
              <PeterButton
                variant="contained"
                index="1"
                onClick={sendItinerary}
                width="200px"
                height="60px"
                label="Email Itinerary"
              /></span>
              <span className="footerButtonMargin">
              <PeterButton
                variant="contained"
                index="1"
                onClick={handleClickOpenUpdate}
                width="200px"
                height="60px"
                label="Update"
              /></span>
            </div>);
      }else{
        return (
            <div style={{ marginLeft: "70%", marginTop: "20px" }}>
              <span className="footerButtonMargin">
              <PeterButton
                variant="contained"
                index="1"
                onClick={()=>this.props.history.push("/reservations")}
                width="250px"
                height="60px"
                label="Back to my reservations"
              /> </span>
              </div>);
      }
    };
    return (
      <>
      <ReservationDetailsTable Reservation={Reservation}></ReservationDetailsTable>
      <div id="seatButton" className="seat-wrap">
      <span className="message">{this.state.message}</span>
            {renderMainButtons(this.state.deleted)}
      </div>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you really want to delete this reservation?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is irrevertable. You will be refunded with the amount paid.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >Cancel</Button>
            <Button onClick={onClick} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openUpdate}
          onClose={handleCloseUpdate}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to update your reservation?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will be directed to change this reservation
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate}>Cancel</Button>
            <Button onClick={UpdateReservation} autoFocus>
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <br />
        <br />
      </>
    );
  }
}

export default ReservationDetails;
