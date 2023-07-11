import logo from '../../logo.svg';
import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {

    const navigate = useNavigate();
    
    
    return (
       
        
         <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
            <h5>
              TeeBay [404] : Sorry you have appeared to a none listed directory.
            </h5>
        </header>
      
    )
}