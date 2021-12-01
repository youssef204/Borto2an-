import React, { Component } from "react";
import axios from "axios";  

 class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    console.log(this.state); 
    axios
      .post('http://localhost:8000/api/user/register',data)
      .then(res => {
        this.setState({
        })
        this.props.history.push("/login");
        alert("Registered successfully!!");
      })
      .catch(err => {
        alert("Enter Valid Data");
      });      
  };

    render() {
        return (
            <div className="outer">
            <div className="inner">
            <form noValidate onSubmit={this.onSubmit}>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name = "firstName" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name = "lastName" onChange={this.onChange} />
                </div>

                <div className="form-group">
                    <label>Passport Number</label>
                    <input type="text" className="form-control" placeholder="Enter Passport Number" name = "passportNumber" onChange={this.onChange}  />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  name = "email" onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name = "password" onChange={this.onChange} />
                </div>
                <br/>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
}
export default Register ; 