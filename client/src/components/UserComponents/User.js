import React from 'react'
import { Component } from 'react';
import axios from 'axios';
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

const ImgUpload =({
  onChange,
  src
})=>
  <label htmlFor="photo-upload" className="custom-file-upload fas">
      <img for="photo-upload" src={src} style={{width:"auto",height:"150px" ,borderRadius: "50%"}}/>
    <input id="photo-upload" type="file" onChange={onChange}/>  
  </label>
const Profile =({
  onSubmit,
  src,
})=>
    <form onSubmit={onSubmit} style={{marginBottom:"15px"}}>
          <img for="photo-upload" src={src} style={{width:"auto",height:"150px" ,borderRadius: "50%" , borderColor:"rgb(0,0,0)"}}/>
        
      <Button type="submit" className="edit" 
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}>Edit Profile Picture</Button>
    </form>
     
      
const Edit =({
  onSubmit,
  children,
})=>
    <form onSubmit={onSubmit} style={{marginBottom:"15px"}}>
        {children}
      <Button type="submit" variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#ee0000"}}>Change your profile picture </Button>
    </form>

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          file: '',
      imagePreviewUrl: localStorage.getItem("profilepicUrl"),
      name:'',
      status:'',
      active: 'edit',
      user: {}
        }
    }

    componentDidMount() {
        this.setState({user:JSON.parse(localStorage.getItem('user'))});
    };

    logout = ()=>{
        
        axios
        .delete("http://localhost:8000/api/user/auth/logout", {
            headers:{"authorization":"Bearer "+localStorage.getItem("token")},
            data: {
                token: localStorage.getItem('refreshToken')
            }
        })
        .then(() =>{
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('flightSelectionData');
            localStorage.removeItem('reservationSummary');
            localStorage.removeItem('selectedSeats');
            localStorage.removeItem('searchResultData');
            localStorage.removeItem('path');
            window.dispatchEvent( new Event('storage') );
            this.props.history.push('/');
        })
        .catch(err => console.log(err));    
    };

    showReservations = () =>{
        this.props.history.push('/reservations');
    }

    updateData = () => {
        this.props.history.push({pathname:'/update_user',state:this.state.user});
    }
    changePassword = () => {
        this.props.history.push({pathname:'/change_password',state:this.state.user});
    }

    photoUpload = e =>{
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
        localStorage.setItem("profilepicUrl",reader.result);
      }
      reader.readAsDataURL(file);
    }

    handleSubmit= e =>{
      e.preventDefault();
      let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
      this.setState({
        active: activeP,
      })
    }
  render() {
    const {imagePreviewUrl, 
      name, 
      status, 
      active} = this.state;

      if(!localStorage.getItem("user")){
          return this.props.history.push("/");
      }
    if(this.state.user)
    return (
        <>
        <br></br>
          <h2 style={{
              marginBottom : "20px",
              marginTop: "20px"
          }}>Personal Information </h2>
          <br></br>
          {(active != 'edit')?(
            <Edit onSubmit={this.handleSubmit}>
              <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
            </Edit>
          ):(
            <Profile 
              onSubmit={this.handleSubmit} 
              src={imagePreviewUrl} 
              name={name} 
              status={status}/>)}

      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={10} sm={6}>
                <TextField
                type="text"  value={this.state.user.firstName} name = "firstName" onChange={this.onChange}
                  fullWidth
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"  value={this.state.user.lastName} name = "firstName" onChange={this.onChange}
                  fullWidth
                  label="Last Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"  value={this.state.user.email}  name = "email" onChange={this.onChange}
                  fullWidth
                  label="Email"
                  autoFocus
                />
              </Grid>

            {this.state.user.isAdmin?<></>:
             <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.passportNumber}  name = "passportNumber" onChange={this.onChange}
               fullWidth
               label="passportNumber"
               autoFocus
             />
           </Grid>
            
            }

            <Grid item xs={12}>
             <TextField
               type="text"  value={this.state.user.homeAddress}  name = "homeAddress" onChange={this.onChange}
               fullWidth
               label="Home Address"
               autoFocus
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.telephoneNumber} name = "telephoneNumber" onChange={this.onChange} 
               fullWidth
               label="Mobile Number"
               autoFocus
               readonly
             />
           </Grid>

           <Grid item xs={12}>
             <TextField
               type="number"  value={this.state.user.countryCode} name = "countryCode" onChange={this.onChange}
               fullWidth
               label="Country Code"
               autoFocus
               readonly
             />
           </Grid>

            </Grid>

            <Grid>

            <Button
            
              
              variant="contained"
              inline = {true}  

              sx={{display:"inline-block"
                ,padding:"5px 5px", mt: 3, mb: 2,mr:24 ,backgroundColor:"#ee0000"}}
              onClick = {this.changePassword}
            >
              Change Password
            </Button>

            <Button
          
          sx={{padding:"5px 5px", mt: 3, mb: 2,mr:27 ,backgroundColor:"#ee0000"}}
          variant="contained"
          onClick = {this.updateData}
        >
          Update my data 
        </Button>
        </Grid>
        <Grid>

            {this.state.user.isAdmin?<></>:
          
          <Button
          
          variant="contained"
          inline = {true}  
          sx={{
          padding:"5px 5px", mt: 3, mb: 2 ,mr:19,backgroundColor:"#ee0000"}}
          onClick = {this.showReservations}
        >
          Show my reservations
        </Button>          
          }




        </Grid>

        
        <Button
              
              variant="contained"
              sx={{padding:"5px 5px", mt: 3, mb: 2 ,ml:180 ,backgroundColor:"#ee0000"}}
              onClick = {this.logout}
            >
              Logout
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
   
    </>
  );
    
  }
}

export default User;