import axios from "axios";
import React from "react";
import Button from "@mui/material/Button";
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
          this.setState({message:"Reservation was deleted successfully. An email with refund amount has been sent to you",
          deleted: true,
          open: false
        });
        })
        .catch((err) => {
          console.log(err);
          this.setState({message:"Sorry! We were unable to delete your reservation. Try again later"});
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
          this.setState({message:"Sorry! We were unable to send you reservation details. Try again later"});
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
        return (<React.Fragment>
            <Button onClick={handleClickOpen} variant="contained"
              
              sx={{margin:"auto", mt: 3, mb: 2 ,backgroundColor:"#ee0000"}} >Delete</Button>
            <Button onClick={sendItinerary} variant="contained"  sx={{margin:"auto", mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}  >Email Itinerary</Button>
            <Button onClick={handleClickOpenUpdate} variant="contained"  sx={{margin:"auto", mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}>Update Reservation</Button>
            </React.Fragment>
        );
      }else{
        return (
            <button onClick={()=>{
              this.props.history.push("/reservations");
            }}>Back to my reservations</button>);
      }
    };
    return (
      <>
      <ReservationDetailsTable Reservation={Reservation}></ReservationDetailsTable>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop:"30px"
          }}
        >
          <Box
            component="span"
            border={2}
            borderRadius={10}
            borderLeft={2}
            borderRight={2}
            borderColor="#a9a9a9"
            sx={{ p: 5 }}
            style={{
              backgroundColor: "#ffffff",
              width: "40%",
            }}
          >
            <Stack style={{ margin: "2px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <label style={{ fontSize: "22px", fontWeight: "bold" }}>
                  Reservation Price : {Reservation.price} L.E
                </label>
                
              </div>
            </Stack>

            <hr />
            <ReservationCommon Reservation={Reservation}></ReservationCommon>
            
            <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {renderMainButtons(this.state.deleted)}
            </div>
            <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <label style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.message}</label>
            </div>
          </Box>
        </div>
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
