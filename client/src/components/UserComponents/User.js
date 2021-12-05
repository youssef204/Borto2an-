import React from 'react'
import { Component } from 'react';
import axios from 'axios';

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
            window.location.href="http://localhost:3000";
        })
        .catch(err => console.log(err));    
    };

    showReservations = () =>{
        this.props.history.push('/reservations');
    }

    updateData = () => {
        this.props.history.push({pathname:'/update_user',state:this.state.user});
    }
  

  render() {
    if(this.state.user)
    return (
        <div class="profile-container" >
        <div class= "ProfileForm-container">
          <h2>Personal Information </h2>
          <br></br>
          First Name:
                <input style={{left:0}} type="text"  value={this.state.user.firstName}  name = "firstName" onChange={this.onChange} />
            Last Name:
        
                <input type="text"  value={this.state.user.lastName} name = "lastName" onChange={this.onChange} />
                passport Number:

                <input type="text"  value={this.state.user.passportNumber} name = "passportNumber" onChange={this.onChange}  />
                Email:

                <input type="email"  value={this.state.user.email}  name = "email" onChange={this.onChange}/>
                <br></br>
                <br></br>

         <div>
          <button inline="true" onClick={this.logout}>Log out</button>
          <button inline = "true" onClick={this.showReservations}>Show my reservations</button>
          <button inline = "true" onClick={this.updateData}>Update my data</button>
          </div>


          </div>
          </div>

    );
    else return <p/>;
  }
}

export default User;