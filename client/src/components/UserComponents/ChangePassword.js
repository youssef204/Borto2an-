import axios from "axios";
import React from "react";
import { Component } from 'react';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button" 
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false ,
      error : '' ,
      updated:  JSON.parse(localStorage.getItem('user')),
      _id: -1
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.showMessage) console.log("show message");
    if (this.state.showMessage && !prevProps.showMessage) {
      setTimeout(() => {
        this.setState({ showMessage: false });
        console.log("stop Showing message");
      }, 3000);
    }
  }
  componentDidMount() {
    const userData = localStorage.getItem('user');
    this.setState({
      _id: JSON.parse(userData)._id
    });
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.updated.oldPassword || !this.state.updated.newPassword || !this.state.updated.newPasswordConfirm){
      this.setState({ showMessage: true ,
        error :"Please Fill all of the fields"});
        return;
    }
    // if(this.state.updated.oldPassword !== this.state.updated.password){
    //   this.setState({ showMessage: true ,
    //     error :"Wrong Password!"});
    //     return;
    // }
    if(this.state.updated.newPassword !== this.state.updated.newPasswordConfirm){
      this.setState({ showMessage: true ,
        error :"Confirmation Password must match the New Password"});
        return;
    }
    const savedPassword = this.state.updated.newPassword;
    // if('password' in update && update['password']==='')
    const data = {
      _id: this.state._id,
      update : {
         password : savedPassword,
         oldPassword : this.state.updated.oldPassword
      }
    };
    //console.log(data);
    axios
      .put("http://localhost:8000/api/user/password", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {this.setState({ showMessage: true ,
        error :"updated successfully"})
        localStorage.setItem('user',JSON.stringify(res.data));this.props.history.push('/user');
      window.dispatchEvent( new Event('storage') );
      ;
   //   alert("updated successfully")
  })
      .catch(err => {
          if(err.response){
          if(err.response.status === 401){
            this.setState({ showMessage: true ,
              error :"Wrong Password!"});
       //   alert("Wrong Password!")
          }
          else{
            this.setState({ showMessage: true ,
              error :"Update failed! Data Error!!"});
        // alert("Update failed! Data Error!!")
          }
          }
         console.log(err);
      });
  };

  render() {
    // const handleClickOpen = () => {
    //     this.setState({ open: true });
    //   };
    //   const handleClose = () => {
    //     this.setState({ open: false });
    //   };
    return (
      <div>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Box component="form" sx={{ mt: 3 }}  noValidate onSubmit={this.onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                type="password"   name = "oldPassword"  onChange={this.onChange}
                  fullWidth
                  label="Old Password"
                  autoFocus
                  required
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  type="password"   name = "newPassword" onChange={this.onChange}
                  fullWidth
                  label="New Password"
                  autoFocus
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"   name = "newPasswordConfirm" onChange={this.onChange}
                  fullWidth
                  label="Confirm Password"
                  autoFocus
                  required
                />
              </Grid>

              <Button
              type = "submit"
              variant="contained"
              
              sx={{margin:"auto", mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}
            
            >
              Update Password
            </Button>

           
            
            </Grid>
              
          </Box>
          </Box>
      </Container>
    </ThemeProvider>
    </div>
    );
  }
}

export default ChangePassword;
