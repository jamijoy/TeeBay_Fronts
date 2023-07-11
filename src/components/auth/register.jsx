import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from "axios";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Register = (props) => {
    
    const navigate = useNavigate();
    
    const [values, setValues] = useState({
        name : '',
        email : '',
        password : ''
    })
    
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
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
                                data: { values },
                                xsrfHeaderName: "csrftoken",
                                responseType: 'json'
                              })
                                .then((axiosResponse) => {
                                    
                                    const data = JSON.parse(axiosResponse.request.response);
                                    let loginMessage = JSON.stringify(data.data.message);
                                    console.log('actionUser -::- '+ loginMessage);

                                if(data.data.message === "success"){
//                                    navigate('/home');
                                    console.log('registered successful -::- '+ loginMessage);
                                }else{
                                    alert('wrong submission..');
                                }
                                })
                                .catch((response) => {
                                  console.log(response.data);
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