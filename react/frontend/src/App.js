import React ,{useEffect} from "react"
import Signup  from "./component/Signup"
import Login from "./component/Login"
import Home from "./component/Home"
import Navbar from "./component/Navbar"
import Notes from "./component/Notes"
import Edit from "./component/Edit"
import PreFile from "./component/PreFile"

import {
  Routes,
  Route,
  
} from 'react-router-dom'

function App() {
  const token = localStorage.getItem("token")
  useEffect(()=>{
    console.log("hiii")
  },[token])
  return (
    <>
<Navbar/>
    <Routes>
    <Route path="/" element={(token) ? <Home /> : <PreFile/>} /> 
    <Route path="/signup" element={<Signup/>} /> 
    <Route path="/login" element={<Login/>} />
    <Route path="/notes" element={(token) ? <Notes/> : <PreFile/>} />
    <Route path="/edit" element={<Edit/>} />
    </Routes>
 </>
  );
}

export default App;
