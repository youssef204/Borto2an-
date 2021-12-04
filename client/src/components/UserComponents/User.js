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
        this.props.history.push('/update_user');
    }
  

  render() {
    if(this.state.user)
    return (
      <body>
          First name: {this.state.user.firstName} <br/>
          Last name: {this.state.user.lastName} <br/>
          Email: {this.state.user.email} <br/>
          Passport number: {this.state.user.passportNumber} <br/>
          <button onClick={this.logout}>Log out</button>
          <button onClick={this.showReservations}>Show my reservations</button>
          <button onClick={this.updateData}>Update my data</button>
      </body>
    );
    else return <p/>;
  }
}

export default User;