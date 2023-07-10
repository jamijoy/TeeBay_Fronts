import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";


export const Register = (props) => {
    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email + ':' + pass);
    }
    
    return (
       
        
         <header className="App-header">

            <h2>
              TeeBay Registration
            </h2>
            <form onSubmit={handleSubmit}>
            <br/>
                <input value={name} onChange={ (e) => setName(e.target.value) } type="text" placeholder="Enter a name" id="name" name="name" />
            <br/>
                <input value={email} onChange={ (e) => setEmail(e.target.value) } type="email" placeholder="example@example.com" id="email" name="email" />
            <br/>
                <input value={pass} onChange={ (e) => setPass(e.target.value) } type="password" placeholder="****" id="password" name="password" />
            <br/>
                <button type="submit">Register</button>
            </form>
            <button
                className="App-link"
                onClick={() => props.onFormSwitch('login')}
                rel="noopener noreferrer"
              >
                 Already Registration ?
              </button>
            </header>
      
    )
}