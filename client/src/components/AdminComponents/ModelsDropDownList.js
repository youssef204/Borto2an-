import React from 'react'
import axios from 'axios';
import { Component } from 'react';

class AllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: []
        }
    }

    getAllModels = () =>{
        axios
            .get('http://localhost:8000/api/airplaneModel/showAllModels')
            .then(res => {
                this.setState(
                    {
                        models: res.data
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
    };

    componentDidMount() {
        this.getAllModels();         
    };
  

  render() {
    let modellist;
    const models = this.state.models;
    if (!models) {
      modellist = <option value="0">no models found</option>;
    } else {
      modellist = models.map((model) => (
        <option
        value={model._id}>
          {model.name}
        </option>
      ));
    }

    return (
        <select name={this.props.name} onChange={this.props.onChange}>
          <option>Select airplane model</option>
            {modellist}
        </select>
    );
  }
}

export default AllFlights;