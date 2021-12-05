import React, { useState } from "react";
import "./NavBar.css";
import Logo from '../Logo/Logo';
import {NavLink as Link} from 'react-router-dom';

function NavigationBar({user=JSON.parse(localStorage.getItem("user"))}) {

  const [search,setSearch] = useState(0);
  const [flightSelection,setFlightSelection] = useState(0);
  const [reservation,setReservation] = useState(0);

  React.useEffect(() => {
    async function init(){
      const data = await localStorage.getItem('searchResultData');
      setSearch(JSON.parse(data));
    }
    init();
  },[]);

  React.useEffect(() => {
    async function init(){
      const data = await localStorage.getItem('flightSelectionData');
      setFlightSelection(JSON.parse(data));
    }
    init();
  },[]);

  React.useEffect(() => {
    async function init(){
      const data = await localStorage.getItem('reservationSummary');
      setReservation(JSON.parse(data));
    }
    init();
  },[]);

  const resetJourney = ()=>{
    window.location.href="/";
    localStorage.removeItem("searchResultData");
    localStorage.removeItem("flightSelectionData");
    localStorage.removeItem("reservationSummary");
  }

  const userLabel = 
  (!user)?  
  <>
  <li style={{float:'right'}} className="NavBar">
        <Link to="/sign_up" exact className="NavBar">
          Sign up
        </Link>
      </li>
      
    
    
      <li style={{float:'right'}} className="NavBar">
        <Link to="/sign_in" exact className="NavBar">
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

      <Logo/>
      
      <li className="NavBar"><a className="NavBar" href='/'>Borto2an</a></li>
      
    
    
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



  else
  return (
    <ul className="NavBar">

      <Logo/>
      
      <li className="NavBar"><a className="NavBar" href='/'>Borto2an</a></li>
      
    
    
      <li className="NavBar">
        <Link to="/" onClick={resetJourney} exact className="NavBar">Search Flights</Link>
      </li>
      
    
    {(search)?(
      <li className="NavBar">
        
        <Link to="/flight_selection" exact className="NavBar">Flight Selection</Link>
        
      </li>):<></>
    }

    { (flightSelection) ?
      <li className="NavBar">
        <Link to="/select_seats" exact className="NavBar">Select Seats</Link>
      </li>:<></>
      }

      {(reservation)?
        
        <li className="NavBar">
        <Link to="/reservation_details" exact className="NavBar">Reservation Details</Link>
      </li>:<></>
      
      }
    
      {userLabel}
    
    
    </ul>
  );

}

export default NavigationBar;
