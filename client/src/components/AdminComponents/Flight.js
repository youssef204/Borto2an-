import React from 'react'


function Flight({ flightNumber, fromAirport, toAirport, departureTime, arrivalTime, onShowDetails}) {
  
  return (
    <>
    <tr>
      <td> {flightNumber}</td>
      <td> {fromAirport}</td>
      <td>{toAirport}</td>
      <td>{departureTime.substring(0,10)+" at "+departureTime.substring(11,16)}</td>
      <td >{arrivalTime.substring(0,10)+" at "+arrivalTime.substring(11,16)}</td>
    <td>
      <button  onClick = {()=>onShowDetails(flightNumber)} >
        Show all details
      </button >
      </td>
    </tr>
    </>

  )
}

export default Flight
