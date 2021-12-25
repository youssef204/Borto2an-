import React from 'react'
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";

function Flight({ flightNumber, fromAirport, toAirport, departureTime, arrivalTime, onShowDetails}) {
  
  return (
    // <>
    // <tr>
    //   <td> {flightNumber}</td>
    //   <td> {fromAirport}</td>
    //   <td>{toAirport}</td>
    //   <td>{departureTime.substring(0,10)+" at "+departureTime.substring(11,16)}</td>
    //   <td >{arrivalTime.substring(0,10)+" at "+arrivalTime.substring(11,16)}</td>
    // <td>
    //   <button  onClick = {()=>onShowDetails(flightNumber)} >
    //     Show all details
    //   </button >
    //   </td>
    // </tr>
    // </>
    <>
      <TableRow>
        <TableCell align="center">{flightNumber}</TableCell>
        <TableCell align="center">
          {fromAirport}
        </TableCell>
        <TableCell align="center">
          {toAirport}
        </TableCell>
        <TableCell align="center">
          {" "}
          {departureTime.substring(0,10)+" at "+departureTime.substring(11,16)}
        </TableCell>
        <TableCell align="center">
          {" "}
          {arrivalTime.substring(0,10)+" at "+arrivalTime.substring(11,16)}
        </TableCell>
        <TableCell align="center">
          {" "}
          <Button size="small" onClick={()=>onShowDetails(flightNumber)} sx={{ color: "#EE0000" }}>
            Show all details
          </Button>
        </TableCell>
      </TableRow>
    </>
  )
}

export default Flight
