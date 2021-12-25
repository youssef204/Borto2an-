import React, { Component } from "react";
import "./Guest.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import {Link} from "react-router-dom";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { showMessage: false ,
    error : '' };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSignIn = (e) => {
    this.props.history.push("/sign_in");
  };

  componentDidUpdate(prevProps) {
    if (this.state.showMessage) console.log("show message");
    if (this.state.showMessage && !prevProps.showMessage) {
      setTimeout(() => {
        this.setState({ showMessage: false });
        console.log("stop Showing message");
      }, 3000);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    console.log(this.state);
    axios
      .post("http://localhost:8000/api/user/register", data)
      .then((res) => {
        this.setState({});
        this.props.history.push("/sign_in");
      })
      .catch(err => {
        if(err.response){
          if(err.response.status === 401){
            this.setState({ showMessage: true ,
            error : "Please enter a valid email format" });
       //   alert("Please enter a valid email format");
          }
          else if(err.response.status === 402){
            this.setState({ showMessage: true ,
              error :"Please Fill all of the fields"});
      //    alert("Please Fill all of the fields");
          }
          else if(err.response.status === 500){
            this.setState({ showMessage: true ,
              error :"Email must be unique"});
      //    alert("Email and User Name must be unique");
          }
        }
        else{
          console.log("msh sh8alaaaa");
        }
      });      
  };

    render() {
      if(localStorage.getItem("user")){
        return this.props.history.push("/");
      }
        return (
            <>
            <br></br>
            <br></br>
            {/* <h2>Welcome to Borto2an Airline</h2> */}
<div class="container" id="container">
    <div class="form-container sign-up-container">
		<form action="#" noValidate onSubmit={this.onSubmit}>
			<h2 style={{marginTop:"40px"}}>Create Account</h2>
			{/* <div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
				<a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
			</div> */}
      {this.state.showMessage ? (
                <label id="signErrorMessage">{this.state.error}</label>
              ) : (
                <br/>
              )}
      <Stack
                      spacing={2}
                      direction="row">
                        <div>
            <input type="text"  placeholder="First name" name = "firstName" onChange={this.onChange} />
            </div>
            <div>
            <input type="text"  placeholder="Last name" name = "lastName" onChange={this.onChange} />
            </div>
            </Stack>
            <Stack
            spacing={2}
            direction="row">
              <div>
            <input type="text"  placeholder="Passport Number" name = "passportNumber" onChange={this.onChange}  />
            </div>
            <div>
              
            <input type="number" id="telephoneNumber"  placeholder="Mobile Number"  name = "telephoneNumber" onChange={this.onChange}/>
            </div>
            </Stack>
            <Stack
            spacing={2}
            direction="row">
              <div>
            <input type="text"  placeholder="Home Address" name = "homeAddress" onChange={this.onChange}  />
            </div>
            <div>
              
            <input type="number" id="telephoneNumber"  placeholder="Country Code"  name = "countryCode" onChange={this.onChange}/>
            </div>
            </Stack>
            <input type="email"  placeholder="Email"  name = "email" onChange={this.onChange}/>
            <input type="email"  placeholder="User Name"  name = "userName" onChange={this.onChange}/>
            <input type="password"  placeholder="Password" name = "password" onChange={this.onChange} />

              <button>Sign Up</button>
            </form>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button onClick={this.onSignIn} class="ghost" id="signIn">
                  Sign In
                </button>
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

export default SignUp;
