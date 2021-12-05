import React from 'react';


function Flight({ _id,name, economyRows, economyColumns, businessRows, businessColumns, firstClassRows, firstClassColumns, deleteModel}) {
  
  return (
    <>
    <tr>
      <td> {name}</td>
      <td > {economyRows}</td>
      <td  >{economyColumns}</td>
      <td >{businessRows}</td>
      <td >{businessColumns}</td>
      <td >{firstClassRows}</td>
      <td >{firstClassColumns}</td>
    <td>
      <button  onClick = {()=>deleteModel(_id)} >
        Delete
      </button >
      </td>
    </tr>
    </>

  )
}

export default Flight
