import React from "react";
import axios from "axios";
import { TextField , Grid} from "@mui/material";

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
        <br></br>
        <div className="createFlight-container">
              <form className=" UpdateForm-container" noValidate onSubmit={this.onSubmit}>
              <h2>Create New Model </h2>
              <br></br>

                {/* Model Name:
                <div>
                  <input
                    type='text'
                    placeholder='Airbus 1192'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='text'
                    placeholder='Model Name'
                    name='name'
                    onChange={this.onChange}
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* Economy Rows:
                <div>
                  <input
                    type='number'
                    name='economyRows'
                    value={this.state.economyRows}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='economyRows'
                    onChange={this.onChange}
                    placeholder="No. economy rows"
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* Economy Columns:
                <div>
                  <input
                    type='number'
                    name='economyColumns'
                    value={this.state.economyColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='economyColumns'
                    onChange={this.onChange}
                    placeholder="No. economy columns"
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* Business Rows:
                <div>
                  <input
                    type='number'
                    name='businessRows'
                    value={this.state.businessRows}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='businessRows'
                    onChange={this.onChange}
                    placeholder="No. business rows"
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* Business Columns:
                <div>
                  <input
                    type='number'
                    name='businessColumns'
                    value={this.state.businessColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='businessColumns'
                    onChange={this.onChange}
                    placeholder="No. business columns"
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* First Class Rows:
                <div>
                  <input
                    type='number'
                    name='firstClassRows'
                    value={this.state.firstClassRows}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='firstClassRows'
                    onChange={this.onChange}
                    placeholder="No. first class rows"
                    fullWidth
                  />
                 </Grid>
                 <br/>
                {/* First Class Columns:
                <div>
                  <input
                    type='number'
                    name='firstClassColumns'
                    value={this.state.firstClassColumns}
                    onChange={this.onChange}
                  />
                </div> */}
                <Grid item xs={12}>
                  <TextField
                    type='number'
                    name='firstClassColumns'
                    onChange={this.onChange}
                    placeholder="No. first class columns"
                    fullWidth
                  />
                 </Grid>
                 <br/>

                <button>
                  Create
                </button>
              </form>
              </div>
              <br></br>
          </>
    );
    }
}
 
export default CreateModel;