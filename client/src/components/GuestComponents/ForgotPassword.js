import React, { Component } from "react";
import "./Guest.css";
import axios from "axios";
import {Link} from "react-router-dom";

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
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

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    axios
      .post('http://localhost:8000/api/user/auth/reset', data)
      .then(res => {
        alert("A new Password was sent to your email, use it to login.");
        this.props.history.push("/sign_in");
      })
      .catch(e=>{alert("This email belongs to no user!");});
  };

  onClick = () => {
    this.props.history.push({ pathname: "/sign_up" });
  };

render() {
 if(localStorage.getItem("user")){
    return <p></p>;
  }

  return (
<>
<br/><br/>
<div class="container" id="container">
	<div class="form-container sign-in-container">
		<form action="#" noValidate onSubmit = {this.onSubmit}>
			<h1>Forgot your Password?</h1>
      {this.state.showMessage ? (
                <label id="signErrorMessage">{this.state.error}</label>
              ) : (
                <br/>
              )}
            <input type="email"  placeholder="Enter email"  name ="email" onChange={this.onChange}/>
			<button>Email New Password</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button onClick={this.onClick} class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created by <i class="fa fa-heart"></i> 
		<Link to="/">Borto2an Airline</Link>
	</p>
</footer>
</>
        )
    }
}

export default ForgotPassword;
