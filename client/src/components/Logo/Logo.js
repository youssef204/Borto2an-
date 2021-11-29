import React from 'react';
import logo from './Logo.png';
import './Logo.css';
import {Link} from 'react-router-dom';

function Logo({dim}) {

  return (<Link to="/" exact>
          <img src={logo} className="logo" alt="Logo" width={dim} height={dim}/>
          </Link>);
}

export default Logo;