//import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { Routes,  Route} from "react-router-dom";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";
import { Products } from "./components/products/products";
import { AddProductForm } from "./components/products/add_product";
import { NotFound } from "./components/common/not_found";
import { MantineProvider } from '@mantine/core';

function App() {
    
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
        
        <Routes>
          <Route exact path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}/>
          <Route exact path="/login" element={<Register />}/>
          <Route exact path="/products" element={<Products />}/>
          <Route exact path="/add-product" element={<AddProductForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
    </MantineProvider>
  );
}

export default App;
