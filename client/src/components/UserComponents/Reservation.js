import React from 'react';
import {useHistory} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';



function Reservation({Reservation}) {

  const history = useHistory();

  function onClick(){history.push({pathname:"/reservation_details",state:Reservation});};
  
  return (
    <>

<TableRow>
              <TableCell align="center">{Reservation.price}</TableCell>
              <TableCell align="center">{Reservation.departureFlight.flightId.departure.airport}</TableCell>
              <TableCell align="center">{Reservation.departureFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.departureFlight.flightId.departure.time.substring(11,16)}</TableCell>
              <TableCell align="center"> {Reservation.returnFlight.flightId.departure.airport}</TableCell>
              <TableCell align="center"> {Reservation.returnFlight.flightId.departure.time.substring(0,10)+" at "+Reservation.returnFlight.flightId.departure.time.substring(11,16)}</TableCell>
              <TableCell align="center"> <Button size="small" onClick ={onClick} >
        Show all details  
      </Button > </TableCell>

            </TableRow>
    
    </>

  )
}

export default Reservation;
