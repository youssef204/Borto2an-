import React from 'react';


function Flight({ _id,name, economyRows, economyColumns, businessRows, businessColumns, firstClassRows, firstClassColumns, deleteModel}) {
  
  return (
    <>
    <tr style={{ background: "#dddddd" }}>
      <td style={{ padding: "15px" }}> {name}</td>
      <td style={{ padding: "15px" }}> {economyRows}</td>
      <td style={{ padding: "15px" }} >{economyColumns}</td>
      <td style={{ padding: "15px" }}>{businessRows}</td>
      <td style={{ padding: "15px" }} >{businessColumns}</td>
      <td style={{ padding: "15px" }}>{firstClassRows}</td>
      <td style={{ padding: "15px" }} >{firstClassColumns}</td>
    
      <button className="deleteModel" onClick = {()=>deleteModel(_id)} >
        Delete
      </button >
    </tr>
    </>

  )
}

export default Flight
