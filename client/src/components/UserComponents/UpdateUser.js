import axios from "axios";
import React from "react";

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: {},
      _id: -1
    };
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

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      _id: this.state._id,
      update: this.state.updated,
    };
    axios
      .put("http://localhost:8000/api/user", data, {
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}

        })
      .then(res => {localStorage.setItem('user',JSON.stringify(res.data));window.location.href='/';alert("updated successfully")})
      .catch(err => alert("Update failed! Data Error!!"));
  };

  render() {
    return (
      
      <div class="update-container" >
      <div class="form-container UpdateForm-container">
      <form action="#" noValidate onSubmit={this.onSubmit}>
        <h1>Update Personal Information </h1>
              <input type="text"  placeholder="First name" name = "firstName" onChange={this.onChange} />
              <input type="text"  placeholder="Last name" name = "lastName" onChange={this.onChange} />
              <input type="text"  placeholder="Enter Passport Number" name = "passportNumber" onChange={this.onChange}  />
              <input type="email"  placeholder="Enter email"  name = "email" onChange={this.onChange}/>
              <input type="password"  placeholder="Enter password" name = "password" onChange={this.onChange} />
              <br></br>
  
        <button>Update Info</button>
        </form>
        </div>
        </div>
    );
  }
}

export default UpdateUser;
