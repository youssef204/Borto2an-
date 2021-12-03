import React from 'react';
import Reservation from './Reservation';
import { Component } from 'react';
import axios from 'axios';

class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:8000/api/reservations/", {
            headers:{"authorization":"Bearer "+localStorage.getItem("token")},
        })
        .then(res=>{
            this.setState({reservations:res.data})
        })
        .catch(err => console.log(err));
    };
   
  render() {
      let reservationList;
    if (this.state.reservations.length==0) {
      reservationList = <p>you have no reservations</p>;
    } else {
      reservationList = this.state.reservations.map((reservation) => <Reservation Reservation={reservation}/>);
    }
    if(this.state.reservations.length!=0)
    return (
      <body>
        <div>
        <table
            style={{
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <tr>
              <th>Price</th>

              <th>From</th>
              <th>At</th>

              <th>To</th>
              <th>At</th>
              
            </tr>
            {reservationList}
            </table>
        </div>
      </body>
    );
    else return reservationList;
  }
}

export default Reservations;
