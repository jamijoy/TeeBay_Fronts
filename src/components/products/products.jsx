import '../../App.css';
import '../../teebay.css';

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';



    

export const Products = () => {
    
    
const [products, setProducts] = useState({});
const [page, setPage] = useState(1);
const countPerPage = 10;
 
 

                    
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
      <button className="btn btn-danger">Log Out</button>
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