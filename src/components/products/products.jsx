import logo from '../../logo.svg';
import '../../App.css';
import '../../teebay.css';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export const Products = () => {

    const navigate = useNavigate();
    

    const handleSubmit = (event) => {

        event.preventDefault();
        
        return axios({
            method: 'get',
            url: "http://localhost:8080/products",
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
    
    return (
       
        
        <header className="App-header">

            <img src={logo} className="App-logo" alt="logo" />
            <h2>
              TeeBay : Products
            </h2>
            <form action="" onSubmit={handleSubmit}>
                <button className="btn btn-success" type="submit">Show Products</button>
            </form>
        </header>
      
    )
}