import '../../App.css';
import '../../teebay.css';

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
    
export const Products = () => {
   
const [products, setProducts] = useState({});
const [page, setPage] = useState(1);
const countPerPage = 10;

const navigate = useNavigate();
const cookies = new Cookies();
const [token, setToken] = useState(null);

if (!cookies.get("token")) {
    navigate('/');
}else{
    console.log('Cookie >> Token >>  '+ cookies.get("token"));
}
 
function logoutUser(){                  
    /*
     *  TODO: Need to handle in different architecture 
     * 
     */
    setToken(null);
    cookies.remove("token");
    navigate('/');
}
                    
  function buyProduct(id){                  
    /*
     *  TODO: Axios will be shift under /action folder 
     * 
     */
    axios.get(`http://localhost:8080/buyProduct/`+id)
            .then(axiosResponse => {
                    console.log('Product Buy -::-  Area');
                    const data = JSON.parse(axiosResponse.request.response);
                    let responseMessage = JSON.stringify(data.message);
                    console.log('Product Buy -::- '+ responseMessage);

                    if(data.message === "success"){
                        alert('Buy Successful..');
                        const localToken = localStorage.getItem("token");
                        console.log(localToken);
                        getProductList();
                    }else{
                        alert('Buy Declined..');
                    }
        }).catch(err => {
            setProducts({});
        });
  }
 
const columns = [
  {
    name: 'Product Name',
    selector: 'name',
    sortable: true
  },
  {
    name: 'Category',
    selector: 'category',
    sortable: false
  },
  {
    name: 'Current Stock',
    selector: 'quantity',
    sortable: false
  },
  {
    name: 'User Services',
    cell: row => <button className="btn btn-info" onClick={(e) => buyProduct(row.id)}>Buy Product</button>,
  }
];
 
            
/*
 *  TODO: Axios will be shift under /action folder 
 * 
 */
                    
  const getProductList = () => {
    axios.get(`http://localhost:8080/products`).then(res => {
        console.log('.............XX......XX.................');
        console.log(res.data);
      setProducts(res.data);
    }).catch(err => {
      setProducts({});
    });
  }
 
  useEffect(() => {
      
    getProductList();
    
    
  }, [page]);
 
  return (
    <div className="App">
      <h3>TeeBay : List of products</h3>
      <button className="btn btn-danger" onClick={(e) => logoutUser()} >Log Out</button>
      <DataTable
        title="Products"
        columns={columns}
        data={products.products}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={products.total}
        paginationPerPage={countPerPage}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        onChangePage={page => setPage(page)}
      />
    </div>
  );
    
}