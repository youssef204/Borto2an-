import React from 'react'


function Flight({ flightNumber, fromAirport, toAirport, departureTime, arrivalTime, onShowDetails}) {
  
  return (
    <>
    <tr style={{ background: "#dddddd" }}>
      <td style={{ padding: "15px" }}> {flightNumber}</td>
      <td style={{ padding: "15px" }}> {fromAirport}</td>
      <td style={{ padding: "15px" }} >{toAirport}</td>
      <td style={{ padding: "15px" }}>{departureTime}</td>
      <td style={{ padding: "15px" }} >{arrivalTime}</td>
    
      <button className="showAllDetails" onClick = {()=>onShowDetails(flightNumber)} >
        Show All Details
      </button >
    </tr>
    </>

  )
}

export default Flight
