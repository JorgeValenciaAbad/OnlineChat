import React from "react";
import Cover from "./Cover"
import Register from "./register"
import Login from "./Login"
import {
     BrowserRouter as Router, 
     Routes,
     Route
    } from "react-router-dom";

function App(){
    return( <>
        <Router>
            <Routes>
                <Route path="/" element={<Cover/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>  
            </Routes>
                           
        </Router>
    </>)
}
export default App