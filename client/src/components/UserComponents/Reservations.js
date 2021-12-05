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
      <section>
      <div class="tbl-header">
        <table>
              <th>Price</th>

              <th>From</th>
              <th>At</th>

              <th>To</th>
              <th>At</th>
              <th> Show Details</th>
              </table>
              <div class="tbl-content">
  <table cellpadding="0" cellspacing="0" border="0">

            {reservationList}
            </table>
        </div>
        </div>
      </section>
    );
    else return reservationList;
  }
}

export default Reservations;
