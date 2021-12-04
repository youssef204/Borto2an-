import React from "react";
import "./NavBar.css";
import Logo from '../Logo/Logo';
import {NavLink as Link, BrowserRouter as Router} from 'react-router-dom';

function NavigationBar({user=JSON.parse(localStorage.getItem("user"))}) {
  console.log(user);
  const userLabel = 
  (!user)?  
  <>
  <li style={{float:'right'}} className="NavBar">
        <Link to="/signup" exact className="NavBar">
          Sign up
        </Link>
      </li>
      
    
    
      <li style={{float:'right'}} className="NavBar">
        <Link to="/login" exact className="NavBar">
          Log in
        </Link>
      </li>
  </>
  :
  <>
  <li style={{float:'right'}} className="NavBar">
        <Link to="/user" exact className="NavBar">
          {user.firstName+" "+user.lastName}
        </Link>
      </li>
  </>;




  if(user&&user.isAdmin)
  return (
    <ul className="NavBar">

      <div className="logo"><Logo dim="25px"/></div>
      
      <div className="NavBar">Borto2an</div>
      
    
    
      <li className="NavBar">
        <Link to="/" exact className="NavBar">Search Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/all_flights" exact className="NavBar">All Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/create_flight" exact className="NavBar">Create Flight</Link>
      </li>

      <li className="NavBar">
        <Link to="/all_models" exact className="NavBar">All Flight Models</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/create_model" exact className="NavBar">Create Flight Model</Link>
      </li>
      
    
      {userLabel}
    
    
    </ul>
  );



  else if(user)
  return (
    <ul className="NavBar">

      <div className="logo"><Logo dim="25px"/></div>
      
      <div className="NavBar">Borto2an</div>
      
    
    
      <li className="NavBar">
        <Link to="/" exact className="NavBar">Search Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/available_flights" exact className="NavBar">Available Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/trip_summary" exact className="NavBar">Trip summary</Link>
      </li>
      
      <li className="NavBar">
        <Link to="/select_seats" exact className="NavBar">Select Seats</Link>
      </li>

      <li className="NavBar">
        <Link to="/reservation_details" exact className="NavBar">Reservation Details</Link>
      </li>
    
      {userLabel}
    
    
    </ul>
  );



  else 
  return (
    <ul className="NavBar">

      <div className="logo"><Logo dim="25px"/></div>
      
      <div className="NavBar">Borto2an</div>
      
    
    
     <li className="NavBar">
        <Link to="/" exact className="NavBar">Search Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/available_flights" exact className="NavBar">Available Flights</Link>
      </li>
      
    
    
      <li className="NavBar">
        <Link to="/trip_summary" exact className="NavBar">Trip summary</Link>
      </li>
      
    
      {userLabel}
    
    
    </ul>
  );
}

export default NavigationBar;
