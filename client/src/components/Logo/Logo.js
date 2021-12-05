import React from 'react';
import logo from './Logo.png';
import './Logo.css';
import {Link} from 'react-router-dom';

function Logo() {

  return (<Link to="/" exact>
          <img src={logo} className="logo" alt="Logo" width="25px" height="25px"/>
          </Link>);
}

export default Logo;