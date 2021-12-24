import React, { useState } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Flight({ _id,name, economyRows, economyColumns, businessRows, businessColumns, firstClassRows, firstClassColumns, deleteModel}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <tr>
      <td> {name}</td>
      <td > {economyRows}</td>
      <td  >{economyColumns}</td>
      <td >{businessRows}</td>
      <td >{businessColumns}</td>
      <td >{firstClassRows}</td>
      <td >{firstClassColumns}</td>
    <td>
      <button  onClick = {handleClickOpen} >
        Delete
      </button >
      <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this Model ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once delete is clicked this model will be no longer available along side with all flights of that model !
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={()=>deleteModel(_id)} autoFocus>
              Delete
            </button>
          </DialogActions>
        </Dialog>
      </td>
    </tr>
    </>

  )
}

export default Flight
