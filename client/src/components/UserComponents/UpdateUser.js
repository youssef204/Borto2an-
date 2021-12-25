import axios from "axios";
import React from "react";
import { Component } from 'react';
import Stack from "@mui/material/Stack";
import Button from "../Button"
import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
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

class UpdateUser extends React.Component {
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

  onCancel = (e) => {
    this.props.history.push('/user');
  };

  onSubmit = (e)  => {
    e.preventDefault();
    const update = this.state.updated;
    // if('password' in update && update['password']==='')
    delete update.password;
    delete update.isAdmin;
    delete update._id;
    const data = {
      _id: this.state._id,
      update: update
    };
    console.log(data);
    axios
      .put("http://localhost:8000/api/user", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {localStorage.setItem('user',JSON.stringify(res.data));
       this.setState({ showMessage: true ,
        error :"updated successfully"});
      window.dispatchEvent( new Event('storage') );
      this.props.history.push('/user');

     // alert("updated successfully")
    })
      .catch(err => {
        if(err.response){
          if(err.response.status === 422){
            this.setState({ showMessage: true ,
              error :"Please Fill all of the fields"});
      //    alert("Please Fill all of the fields");
          }
         else          
            if(err.response.status === 401){
            this.setState({ showMessage: true ,
            error : "Please enter a valid email format" });
       //   alert("Please enter a valid email format");
          }
          else if(err.response.status === 400){
            this.setState({ showMessage: true ,
              error :"Email must be unique"});
      //    alert("Email and User Name must be unique");
          }
        }
        }
        );
        
  };

  render() {
    return (
      <>
      <div className="list " style={{
  paddingBottom : "100px",
  width : "50%",
  marginTop : "50px"
}}>
        <div className="settings" style={{
          justifyContent : "center",
          alignContent : "center",
          alignItems : "center"
        }}>
      <div
          className="TripTitleDiv"
          style={{
            height: "130px",
            marginBottom: "-20px",
            paddingBottom: "50px",
          }}
        >
            <div class="TripTitleText">Update Personal Information</div>
          <img class="Trip-bg" src="personal.jpg" style={{ 
            left : "420px",
            opacity : "0.5"
          }} />
        </div>  
        </div> 
    

                <Box
                        component="span"
                        border={2}
                        borderRadius={4}
                        borderLeft={1}
                        borderRight={1}
                        borderColor="#a9a9a9"
          sx={{
            marginBottom:-10,
            marginTop: -5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          style={{
            backgroundColor: "rgba(255, 255, 255, 1)",
          }}
        >
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
      <Box component="form" sx={{ mt: 3 }}  noValidate>
      {this.state.showMessage ? this.state.error === 'updated successfully' ? (
                <label id="signSuccessMessage" style={{fontWeight : "bold"}}>{this.state.error}</label>
              ) : <label id="signErrorMessage">{this.state.error}</label> : (
                <br/>
              )}
              <br/>
            <Grid container spacing={2}>
              
            <Grid item xs={10} sm={6}>
                <TextField
                type="text"  value={this.state.updated.firstName} name = "firstName" onChange={this.onChange}
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"  value={this.state.updated.lastName} name = "lastName" onChange={this.onChange}
                  fullWidth
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"  value={this.state.updated.email}  name = "email" onChange={this.onChange}
                  fullWidth
                  label="Email"
                  autoFocus
                />
              </Grid>

             <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.updated.passportNumber}  name = "passportNumber" onChange={this.onChange}
               fullWidth
               label="passportNumber"
               autoFocus
             />
           </Grid>
            
            

            <Grid item xs={12}>
             <TextField
               type="text"  value={this.state.updated.homeAddress}  name = "homeAddress" onChange={this.onChange}
               fullWidth
               label="Home Address"
               autoFocus
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.updated.telephoneNumber} name = "telephoneNumber" onChange={this.onChange} 
               fullWidth
               label="Mobile Number"
               autoFocus
               readonly
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.updated.countryCode} name = "countryCode" onChange={this.onChange}
               fullWidth
               label="Country Code"
               autoFocus
               readonly
             />
           </Grid>

            </Grid>
            <Stack direction="row" spacing={5} style={{
              marginTop : "10px",
              marginBottom : "10px"
            }}>
              <Button
              index={1}
              width="80px"
              onClick={this.onSubmit}
              label = "Update"
            >
            </Button> 
            <Button
             index={1}
             width="80px"
             onClick={this.onCancel}
             label = "Cancel"
            >
            </Button>
            </Stack>

          
              
          </Box>
          </Box>
      </Container>
    </ThemeProvider>
    </Box>
    </div>
        </>
    );
  }
}

export default UpdateUser;