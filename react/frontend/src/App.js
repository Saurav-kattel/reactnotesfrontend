import React from "react"
import Signup  from "./component/Signup"
import Login from "./component/Login"
import Home from "./component/Home"
import Navbar from "./component/Navbar"
import Notes from "./component/Notes"
import Edit from "./component/Edit"

import {
  Routes,
  Route,
  
} from 'react-router-dom'

function App() {
  
  return (
    <>
<Navbar/>
    <Routes>
    <Route path="/" element={<Home />} /> 
    <Route path="/signup" element={<Signup/>} /> 
    <Route path="/login" element={<Login/>} />
    <Route path="/notes" element={<Notes/>} />
    <Route path="/edit" element={<Edit/>} />
    </Routes>
 </>
  );
}

export default App;
