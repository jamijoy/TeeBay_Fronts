//import logo from './logo.svg';
//import './App.css';
import React, { useState } from "react";
import { Routes,  Route} from "react-router-dom";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/register";

function App() {
    
    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }
    
  return (
    <div className="App">
        
        <Routes>
          <Route exact path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}/>
          
        </Routes>
    </div>
  );
}

export default App;
