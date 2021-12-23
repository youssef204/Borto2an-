import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Component } from 'react';
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import axios from 'axios';
import Reservation from './Reservation';


class Reservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reservations: [],
            loading : true,
        }
    }

    componentDidMount() {
      setTimeout(() => {
        this.setState({
          loading : false
        });
      }, 1000);
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
    if(!this.state.loading){
    if(this.state.reservations.length!=0){
    return (
      <Card style={{backgroundColor:"rgb(0,0,0"}} >
      
        <h2 style={{color:"rgb(255,255,255)"}}>All Reservations</h2>
         
    <TableContainer style = {{marginTop:"10px"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell align="center"style={{fontWeight:"bold"}} >Price</TableCell>
            <TableCell align="center"  style={{fontWeight:"bold"}}>From &nbsp;</TableCell>
            <TableCell align="center"  style={{fontWeight:"bold"}}>At&nbsp;</TableCell>
            <TableCell align="center"  style={{fontWeight:"bold"}}>To&nbsp;</TableCell>
            <TableCell align="center"  style={{fontWeight:"bold"}}>At&nbsp;</TableCell>
            <TableCell align="center"  style={{fontWeight:"bold"}}>Show Details&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {reservationList}
        </TableBody>
      </Table>
    </TableContainer>
    </Card>)
  }
  else{
    return reservationList
  }
}
    
          
    else{ return (
      <>
      <Box
        sx={{ width: "80%", margin: "auto", marginTop: 5, marginBottom: 5 }}
      >
        <Skeleton className="skeleton" />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </>
    )
  }
}
}

export default Reservations;
