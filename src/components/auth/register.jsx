import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";
import Cookies from "universal-cookie";
import { isExpired, decodeToken } from "react-jwt";
import jwt from "jwt-decode";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Register = (props) => {
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const [token, setToken] = useState(null);
    
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })
    
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        setErrors(Validation(values));
        
        if(errors.name==="" && errors.email==="" && errors.password===""){
            
            
            /*
             *  TODO: Axios will be shift under /action folder 
             * 
             */

            return axios({
                method: 'post',
                url: "http://localhost:8080/register",
                data: values,
                xsrfHeaderName: "csrftoken",
                responseType: 'json'
              })
                .then((axiosResponse) => {

                    const data = JSON.parse(axiosResponse.request.response);

                    if(data.message === "success"){
                        
                        // Printing response
                        console.log('registered in -::- '+ data.access_token);

                         // specify token from laravel given access token
                        const splited_token = data.access_token.split("|");
                        const decoded_token = decodeToken(splited_token[1]);
                        const isMyTokenExpired = isExpired(splited_token[1]);
                        
                        // token and cookie storing
                        setToken(splited_token[1]);                        
                        localStorage.setItem("token", splited_token[1]);
                        cookies.set("token", splited_token[1], { maxAge: 86400 });
                        
                        // set root URL to login if user logout in future and moving the user to products page
                        props.onFormSwitch('login');
                        navigate('/products');

                    }else{
                        alert('Cannot Register.. ');
                    }
                })
                .catch((response) => {
                    console.log(response.message);
                    alert('Wrong Credential.. '+ response.message);
                });

        }
    }
    
    return (
       
        
         <header className="App-header">

            <h2>
              TeeBay Registration
            </h2>
            <form action="" onSubmit={handleSubmit}>
            <br/>
                <input type="text" className="form-control rounded-0" onChange={handleInput} placeholder="Enter a name" id="name" name="name" />
            <br/>{errors.name && <small className="text-danger">{errors.name}</small>}
                <input type="email" className="form-control rounded-0" onChange={handleInput} placeholder="example@example.com" id="email" name="email" />
            <br/>{errors.email && <small className="text-danger">{errors.email}</small>}
                <input type="password" className="form-control rounded-0" onChange={handleInput} placeholder="****" id="password" name="password" />
            <br/>{errors.password && <small className="text-danger">{errors.password}</small>}
                <button className="btn btn-success" type="submit">Register</button>
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