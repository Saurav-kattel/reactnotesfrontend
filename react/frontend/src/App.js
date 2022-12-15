import React from "react"
import Signup  from "./component/Signup"
import Login from "./component/Login"
import Home from "./component/Home"
import Navbar from "./component/Navbar"
import Notes from "./component/Notes"

import {
  Routes,
  Route
  
} from 'react-router-dom'

function App() {
  return (
    <>
<Navbar pathname={{prevPath: window.location.pathname}}/>
    <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/signup" element={<Signup/>} /> 
    <Route path="/login" element={<Login/>} />
    <Route path="/notes" element={<Notes/>} />
    
    </Routes>
 </>
  );
}

export default App;
