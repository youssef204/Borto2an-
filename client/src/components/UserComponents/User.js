import React from 'react'
import { Component } from 'react';
import axios from 'axios';
import Stack from "@mui/material/Stack";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

  render() {
      if(!localStorage.getItem("user")){
          return this.props.history.push("/");
      }
    if(this.state.user)
    return (
        <>
        <br></br>
        <div class="profile-container" >
        <div class= "ProfileForm-container">
          <h2 style={{
              marginBottom : "20px",
              marginTop: "20px"
          }}>Personal Information </h2>
          <br></br>
          <Stack
                 spacing={2}
                 direction="row"
                 style={{
                     marginBottom:"8px"
                 }}>
                <div  style={{paddingLeft:"10px"}}>
                User Name:
                  <div>
                <input  className="profile-input" type="text"  value={this.state.user.userName} name = "userName" onChange={this.onChange}  />
                  </div>
                </div> 
                <div>
                Email:
                  <div>
                <input type="email" className="profile-input"  value={this.state.user.email}  name = "email" onChange={this.onChange}/>
                  </div>
                </div>
                <div>
                Passport Number:
                  <div>
                <input  className="profile-input" type="text"  value={this.state.user.passportNumber} name = "passportNumber" onChange={this.onChange}  />
                  </div>
                </div>
                </Stack>
          <Stack
           spacing={2}
           direction="row"
           style={{
               marginBottom:"8px",
               justifyContent : "space-around"
           }}>
               <div >
          First Name:
                <input className="profile-input"  type="text"  value={this.state.user.firstName}  name = "firstName" onChange={this.onChange} />
                </div>
            Last Name:
                <input   className="profile-input" type="text"  value={this.state.user.lastName} name = "lastName" onChange={this.onChange} />
                
                {this.state.user.isAdmin?<></>:
                <>passport Number:

                <input  className="profile-input" type="text"  value={this.state.user.passportNumber} name = "passportNumber" onChange={this.onChange}  />
                </>
                }
                
                Email:

                {/* <Stack
                 spacing={2}
                 direction="row"> */}
                <div style={{paddingLeft:"10px"}}>
                Home Address:
                  <div>
                <input type="text" className="profile-input"  value={this.state.user.homeAddress}  name = "homeAddress" onChange={this.onChange}/>
                  </div>
                </div>
                <div>
                Mobile Number:
                  <div>
                <input  className="profile-input" type="text"  value={this.state.user.telephoneNumber} name = "telephoneNumber" onChange={this.onChange}  />
                  </div>
                </div>
                <div>
                Country Code:
                  <div>
                <input  className="profile-input" type="text"  value={this.state.user.countryCode} name = "countryCode" onChange={this.onChange}  />
                  </div>
                </div> 
                </Stack>
                <br></br>
                <br></br>
        <Stack
        spacing={27}
        direction="row"
        style={{
            marginBottom : "10px"
        }}>
            <div>
          <button style={{width:"150%" , marginLeft:"30px"}} inline="true" onClick={this.logout}>Log out</button>
          </div>
          {this.state.user.isAdmin?<></>:
          <div>
          
          <button style={{width:"100%" , marginLeft:"0px"}} inline = "true" onClick={this.showReservations}>Show my reservations</button>
          </div>
          }
          </Stack>
          <Stack
        spacing={20}
        direction="row">
          <div >
          <button style={{width:"115%" , marginLeft:"30px"}}  onClick={this.updateData}>Update my data</button>
          </div>
          <div>
          <button  style={{width:"115%" , marginLeft:"0px"}} onClick={this.changePassword}>Change Password</button>
          </div>
          </Stack>

          </div>
          </div>
          <br></br>
          </>

    );
    else return <p/>;
  }
}

export default User;