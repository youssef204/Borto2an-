import React, { Component } from "react";
import "./Guest.css";
import axios from "axios";

export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { showMessage: false };
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
      .catch((err) => {
        this.setState({ showMessage: true });
      });
  };

  render() {
    if (localStorage.getItem("user")) {
      return this.props.history.push("/");
    }
    return (
      <>
        <br></br>
        <h2>Welcome to Borto2an Airline</h2>
        <div class="container" id="container">
          <div class="form-container sign-up-container">
            <form action="#" noValidate onSubmit={this.onSubmit}>
              <h1>Create Account</h1>
              <div class="social-container">
                <a href="#" class="social">
                  <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-google-plus-g"></i>
                </a>
                <a href="#" class="social">
                  <i class="fab fa-linkedin-in"></i>
                </a>
              </div>
              {this.state.showMessage ? (
                <label id="signErrorMessage">*Invalid data</label>
              ) : (
                <br />
              )}
              <input
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={this.onChange}
              />
              <input
                type="text"
                placeholder="Last name"
                name="lastName"
                onChange={this.onChange}
              />
              <input
                type="text"
                placeholder="Enter Passport Number"
                name="passportNumber"
                onChange={this.onChange}
              />
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={this.onChange}
              />
              <input
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={this.onChange}
              />

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
            <a>Borto2an Airline</a>
          </p>
        </footer>
      </>
    );
  }
}

export default SignUp;
