import logo from '../../logo.svg';
import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Login = (props) => {

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const [token, setToken] = useState(null);
    const [values, setValues] = useState({
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
        
        if(errors.email==="" && errors.password===""){
            
            
            /*
             *  TODO: Axios will be shift under /action folder 
             * 
             */

            return axios({
                method: 'post',
                url: "http://localhost:8080/login",
                data: values,
                xsrfHeaderName: "csrftoken",
                responseType: 'json'
              })
                .then((axiosResponse) => {
                    
                    const data = JSON.parse(axiosResponse.request.response);
//                    let loginMessage = JSON.stringify(data.message);
//                    console.log('actionUser -::- ');

                    if(data.message === "success"){
                        console.log('logged in -::- '+ data.user_details.name);
                        console.log('logged in -::- '+ data.user_details.email);
                        
                        const splited_token = data.access_token.split("|");
//                      const decoded_token = jwt(splited_token[1]);
                        setToken(splited_token[1]);
                        cookies.set("jwt_authorization", splited_token[1], {
                            expires: new Date(splited_token[1].exp * 1000)
                        });
                        navigate('/products');
                        
                    }else{
                        alert('wrong credential..');
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

            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              TeeBay 
            </h2>
            <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input type="email" className="form-control rounded-0" onChange={handleInput} placeholder="example@example.com" id="email" name="email" />
                <br/> {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-3">
                <input type="password" className="form-control rounded-0" onChange={handleInput} placeholder="****" id="password" name="password" />
                <br/> {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
                <button className="btn btn-success" type="submit">Log In</button>
            </form>
            <button
                className="App-link" onClick={() => props.onFormSwitch('register')} >New Registration</button>
            </header>
      
    )
}