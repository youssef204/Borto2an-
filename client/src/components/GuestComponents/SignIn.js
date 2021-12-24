import React, { Component } from "react";
import "./Guest.css";
import axios from "axios";
import {Link} from "react-router-dom";

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      showMessage: false,
      error:''
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
    localStorage.setItem("profilepicUrl","profile.jpg")
    e.preventDefault();
    const data = this.state;
    axios
      .post('http://localhost:8000/api/user/auth/login',data)
      .then(res => {
        if(res.data.auth){
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("refreshToken",res.data.refreshToken);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            this.setState({email:"", password:"", loggedIn:true});
            if(JSON.parse(localStorage.getItem("user")).isAdmin)
            this.props.history.push('/');
            else {
            if(localStorage.getItem("path")){
            this.props.history.push(localStorage.getItem("path").substring(21));
            }
            else
            this.props.history.push('/');
            }}
        else {this.setState({ showMessage: true ,
        error : res.data.message});
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
			<h1>Sign in</h1>
      {this.state.showMessage ? (
                <label id="signErrorMessage">{this.state.error}</label>
              ) : (
                <br/>
              )}
            <input type="email"  placeholder="Enter email"  name = "email" onChange={this.onChange}/>
            <input type="password"  placeholder="Enter password" name = "password" onChange={this.onChange} />
			<Link to="/forgot_password">Forgot your password?</Link>
			<button>Sign In</button>
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

export default SignIn;
