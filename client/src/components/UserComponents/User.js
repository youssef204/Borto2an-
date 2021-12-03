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

    onClick = ()=>{
        
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
  

  render() {
    if(this.state.user)
    return (
      <body>
          First name: {this.state.user.firstName} <br/>
          Last name: {this.state.user.lastName} <br/>
          Email: {this.state.user.email} <br/>
          Passport number: {this.state.user.passportNumber} <br/>
          <button onClick={this.onClick}>Log out</button>
      </body>
    );
    else return <p/>;
  }
}

export default User;