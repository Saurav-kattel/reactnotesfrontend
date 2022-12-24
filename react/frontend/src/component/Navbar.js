import {Link } from "react-router-dom"
import Avatar from "react-avatar"
import {useRef, useState, useEffect} from "react"
import { 
  ThreeDotsVertical,
  XCircle
} from 'react-bootstrap-icons';
export default function Navbar({pathname}){
  const [user ,setUser] = useState({data: {name: " "}});
  const [showAvatar ,setShowAvatar] = useState(false);
  const ref = useRef();
const token = localStorage.getItem("token");
 
 useEffect(()=>{

const options ={
   method: "GET",
   headers:{
     "auth" : token
   }
 }

   const fetchUser = async () =>{
     if(token){
 let data = await  fetch("https://expressserver-khaki.vercel.app/api/user/getuser", options)
  let jsonD = await data.json();
  if(data.ok){
  setUser(jsonD);
  setShowAvatar(true);
  }
 }else {
     setUser({data: {name: " "}})
   }}
fetchUser();
 },[token])

  const handleClick= ()=>{
    if(ref.current.classList.contains("hidden")){
      ref.current.classList.add("block");
      ref.current.classList.remove("hidden");
    }else if(ref.current.classList.contains("block")){
ref.current.classList.add("hidden");
      ref.current.classList.remove("block");
  }
  }
  return(
    <>
 <div className="flex h-[8vh] bg-primary-blue items-center shadow-md justify-between overflow-hidden bg-gradient-to-r from-[#f2ef17] to-lime-600 ">



<h2 className=" bold font-serif text-2xl text-lime-500">MyNotes </h2>

<div onClick={handleClick}  className="text-3xl">
<ThreeDotsVertical className="text-[#f2ef17] text-4xl m-1"/>
</div>

  { <aside ref={ref} className="absolute right-0  top-0 w-[50vmin] h-[100%] bg-lime-600  rounded-l-md shadow-md transition-all
    duration-100 hidden z-40">
    



 <section className="flex  items-center justify-evenly mt-2 ">
      <div onClick={handleClick} > <XCircle className="text-[#f2ef17] text-3xl"/> </div>
      
{ (showAvatar) ? <div> <Avatar name={user.data.name}  size="30"  round = {true} className="float-right" /> </div> : <div> <Avatar name=" " className="float-right "  size="30"  round={true} /> </div> }


        </section>
  <div className='flex flex-col  w-[50vmin] items-center'>
  
 
  <div className="p-2 w-[35vmin] rounded-md "> 

     
    <h3 className="text-center bold text-2xl my-2  font-serif border-b-2 w-[35vmin] text-[#f2ef17]"> Navigaton </h3>
  
    <ul>
    <Link to="/"><li className=" p-2 hover:text-slate-500 uppercase hover:bg-[#f4cc69] text-[#f2ef17]" >home</li></Link>
    <Link to="/login"><li className=" p-2 text-[#f2ef17] uppercase hover:text-slate-500 hover:bg-[#f4cc69]" >login</li></Link>
        <Link to="/signup"><li className=" p-2 hover:text-slate-500 uppercase text-[#f2ef17]  hover:bg-[#f4cc69]" >signup</li></Link>
        
        <Link to="/notes"><li className=" p-2 hover:text-slate-500 text-[#f2ef17] uppercase hover:bg-[#f4cc69]" >notes</li></Link>
    </ul>
      </div>
    </div>
</aside> }
 </div> 
    </>
  )
}