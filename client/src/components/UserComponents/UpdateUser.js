import axios from "axios";
import React from "react";
import Stack from "@mui/material/Stack";
class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: false ,
    error : '' ,
      updated:  JSON.parse(localStorage.getItem('user')),
      _id: -1
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

  componentDidMount() {
    const userData = localStorage.getItem('user');
    this.setState({
      _id: JSON.parse(userData)._id
    });
  }
  onChange = (e) => {
    const newUpdate = { ...this.state.updated };
    const name = e.target.name;
    const value = e.target.value;
    newUpdate[name] = value;
    this.setState({ updated: newUpdate });
  };

  onSubmit = (e)  => {
    e.preventDefault();
    const update = this.state.updated;
    // if('password' in update && update['password']==='')
    delete update.password;
    delete update.isAdmin;
    delete update._id;
    const data = {
      _id: this.state._id,
      update: update
    };
    console.log(data);
    axios
      .put("http://localhost:8000/api/user", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {localStorage.setItem('user',JSON.stringify(res.data));
       this.setState({ showMessage: true ,
        error :"updated successfully"});
      window.dispatchEvent( new Event('storage') );
      this.props.history.push('/user');

     // alert("updated successfully")
    })
      .catch(err => {
        if(err.response){
          if(err.response.status === 422){
            this.setState({ showMessage: true ,
              error :"Please Fill all of the fields"});
      //    alert("Please Fill all of the fields");
          }
         else          
            if(err.response.status === 401){
            this.setState({ showMessage: true ,
            error : "Please enter a valid email format" });
       //   alert("Please enter a valid email format");
          }
          else if(err.response.status === 400){
            this.setState({ showMessage: true ,
              error :"Email must be unique"});
      //    alert("Email and User Name must be unique");
          }
        }
        }
        );
        
  };

  render() {
    return (
      <>
      <br></br> 
      <div class="profile-container" >
      <form className="ProfileForm-container" action="#" noValidate onSubmit={this.onSubmit}>
        <h2>Update Personal Information </h2>
        <br></br>
        {this.state.showMessage ? this.state.error === 'updated successfully' ? (
                <label id="signSuccessMessage">{this.state.error}</label>
              ) : <label id="signErrorMessage">{this.state.error}</label> : (
                <br/>
              )}
        First Name : 
              <input  className="profile-input" type="text"   name = "firstName" value = {this.state.updated.firstName} onChange={this.onChange} />   
        Last Name : 
              <input  className="profile-input" type="text"   value = {this.state.updated.lastName} name = "lastName" onChange={this.onChange} />
        {this.state.updated.isAdmin?<></>:
        <>
        Passport Number:
              <input  className="profile-input" type="text"  value = {this.state.updated.passportNumber} name = "passportNumber" onChange={this.onChange}  />
        </>
        }
        Email:
              <input  className="profile-input" type="email"  value = {this.state.updated.email}  name = "email" onChange={this.onChange}/>
        User Name:
              <input  className="profile-input" type="text" value = {this.state.updated.userName} name = "userName" onChange={this.onChange} />
        Home Address:
              <input  className="profile-input" type="text" value = {this.state.updated.homeAddress} name = "homeAddress" onChange={this.onChange} />
        Country Code:
              <input  className="profile-input" id="telephoneNumber" type="number" value = {this.state.updated.countryCode} name = "countryCode" onChange={this.onChange} />
        Mobile Number:
              <input  className="profile-input"id="telephoneNumber"  type="number" value = {this.state.updated.telephoneNumber} name = "telephoneNumber" onChange={this.onChange} />
        <button>Update Info</button>
        </form>
        </div>
        <br></br>
        </>
    );
  }
}

export default UpdateUser;