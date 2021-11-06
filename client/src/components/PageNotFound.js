import React from 'react'
import { useHistory } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Flight() {

    const history = useHistory();

    const routeChange = () =>{ 
      let path = `/`; 
      history.push(path);
    }
  return (

    <div style={{display: 'flex', flexDirection : 'column' , justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <h2 style={{color : 'red' , fontSize : 170 , fontWeight : 'bold'}}  >Oops! </h2>
        <h2 style={{fontSize : 50 ,}}  >Error 404 </h2>
        <h2 style={{fontSize : 50}}>Page Not Found!</h2>
        <br/>
        <Button className = "btn btn-primary btn-lg border-5" onClick={routeChange}>Return to home page</Button>
    </div>

  )
}

export default Flight