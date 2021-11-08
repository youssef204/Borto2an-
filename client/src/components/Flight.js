import React from 'react'


function Flight({ flightNumber, from, to, seatsAvailable, flightDate ,onShowDetails, cabin}) {
  
  return (
    <>
    <tr style={{ background: "#dddddd" }}>
      <td style={{ padding: "15px" }}> {flightNumber}</td>
      <td style={{ padding: "15px" }}> {from}</td>
      <td style={{ padding: "15px" }} >{to}</td>
      <td style={{ padding: "15px" }}>{seatsAvailable}</td>
      <td style={{ padding: "15px" }} >{flightDate}</td>
      <td style={{ padding: "15px" }} >{cabin}</td>
    
      <button className="showAllDetails" onClick = {()=>onShowDetails(flightNumber)} >
        Show All Details
      </button >
    </tr>
    </>

  )
}

export default Flight
