import logo from '../../logo.svg';
import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Login = (props) => {

    const navigate = useNavigate();
    
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
                                    let loginMessage = JSON.stringify(data.data.message);
                                    console.log('actionUser -::- '+ loginMessage);

                                if(data.data.message === "success"){
//                                    navigate('/home');
                                    console.log('logged in -::- '+ loginMessage);
                                }else{
                                    alert('wrong credential..');
                                }
                                })
                                .catch((response) => {
                                  console.log(response.data);
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