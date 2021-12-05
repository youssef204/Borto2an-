import React from "react";
import axios from "axios";

class CreateModel extends React.Component {
    constructor(){
        super();
        this.state = {
            name:'',
            economyRows:0,
            economyColumns:0,
            businessRows:0,
            businessColumns:0,
            firstClassRows:0,
            firstClassColumns:0

        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      economyRows: this.state.economyRows,
      economyColumns: this.state.economyColumns,
      businessRows: this.state.businessRows,
      businessColumns: this.state.businessColumns,
      firstClassRows: this.state.firstClassRows,
      firstClassColumns: this.state.firstClassColumns
    }; 
    axios
      .post('http://localhost:8000/api/airplaneModel', data,{
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
      .then(res => {
        this.setState({
            name:'',
            economyRows:0,
            economyColumns:0,
            businessRows:0,
            businessColumns:0,
            firstClassRows:0,
            firstClassColumns:0
        })
        this.props.history.push("/all_models");
        alert("Flight Model created successfully!!");
      })
      .catch(err => {
        alert("Enter Valid Data");
      });      
  };

    render() { 
        return (<>
        <div className="createFlight-container">
              <form className=" UpdateForm-container" noValidate onSubmit={this.onSubmit}>
              <h2>Create New Model </h2>
              <br></br>

                Model Name:
                <div>
                  <input
                    type='text'
                    placeholder='Airbus 1192'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                Economy Rows:
                <div>
                  <input
                    type='number'
                    name='economyRows'
                    value={this.state.economyRows}
                    onChange={this.onChange}
                  />
                </div>
                Economy Columns:
                <div>
                  <input
                    type='number'
                    name='economyColumns'
                    value={this.state.economyColumns}
                    onChange={this.onChange}
                  />
                </div>
                Business Rows:
                <div>
                  <input
                    type='number'
                    name='businessRows'
                    value={this.state.businessRows}
                    onChange={this.onChange}
                  />
                </div>
                Business Columns:
                <div>
                  <input
                    type='number'
                    name='businessColumns'
                    value={this.state.businessColumns}
                    onChange={this.onChange}
                  />
                </div>
                First Class Rows:
                <div>
                  <input
                    type='number'
                    name='firstClassRows'
                    value={this.state.firstClassRows}
                    onChange={this.onChange}
                  />
                </div>
                First Class Columns:
                <div>
                  <input
                    type='number'
                    name='firstClassColumns'
                    value={this.state.firstClassColumns}
                    onChange={this.onChange}
                  />
                </div>

                <button>
                  Create
                </button>
              </form>
              </div>
          </>
    );
    }
}
 
export default CreateModel;