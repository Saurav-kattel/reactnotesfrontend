import {Link } from "react-router-dom"
import Avatar from "react-avatar"
import {useRef, useState, useEffect} from "react"

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
 <div className="flex h-[8vh] bg-[whitesmoke] items-center shadow-md justify-between overflow-hidden ">

{ (showAvatar) ? <div> <Avatar name={user.data.name}  size="40"  round = {true} /> </div> : <div> <Avatar name=" "  size="40"  round={true} /> </div>}


<h2 className=" bold font-serif text-2xl ">MyNotes </h2>

<div onClick={handleClick}  className="text-3xl">
lets see
</div>

  { <aside ref={ref} className="absolute right-0  top-0 w-[50vmin] h-[100%] bg-slate-100  rounded-l-md shadow-md transition-all
    duration-100 hidden ">
    
  <div className='flex flex-col  w-[50vmin] items-center' >
  <div className="p-2 w-[35vmin] rounded-md "> 
    <span onClick={handleClick} >close </span><h3 className="text-center bold text-2xl font-serif border-b-2 w-[35vmin] "> Navigaton </h3>
  
    <ul>
    <Link to="/"><li className="hover:bg-slate-500 p-2 hover:text-slate-200 " >home</li></Link>
    <Link to="/login"><li className=" p-2 hover:bg-slate-500 hover:text-slate-200" >login</li></Link>
        <Link to="/signup"><li className=" p-2 hover:bg-slate-500 hover:text-slate-200" >signup</li></Link>
        
        <Link to="/notes"><li className=" p-2 hover:bg-slate-500 hover:text-slate-200" >notes</li></Link>
    </ul>
      </div>
    </div>
</aside> }
 </div> 
    </>
  )
}