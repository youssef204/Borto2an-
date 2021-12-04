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
      <div>

        <form noValidate onSubmit={this.onSubmit}>
                First Name:
                <div>
                  <input
                    type='text'
                    placeholder='First Name'
                    name='firstName'
                    onChange={this.onChange}
                  />
                </div>

                Last Name:
                <div>
                  <input
                    type='text'
                    placeholder='Last Name'
                    name='lastName'
                    onChange={this.onChange}
                  />
                </div>

                Email:
                <div>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    onChange={this.onChange}
                  />
                </div>

                Password:
                <div>
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    onChange={this.onChange}
                  />
                </div>


                Passport Number:
                <div>
                  <input
                    type='text'
                    placeholder='Passport Number'
                    name='passportNumber'
                    onChange={this.onChange}
                  />
                </div>



                <button>
                  Update
                </button>
              </form>
      </div>
    );
  }
}

export default UpdateUser;
