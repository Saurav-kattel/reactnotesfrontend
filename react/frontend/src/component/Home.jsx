import { useState , useEffect} from "react"
import { Link} from "react-router-dom"
 import { 
  Tags,
  Plus,
  PencilSquare,
  Trash3
} from 'react-bootstrap-icons';
const Home = () =>{
  let notes; 
  const [deleteNote, setDeleteNote] = useState(false)
  const [err, setErr] = useState(false)
  const [note, setNote] = useState(false)
  const [data, setData] = useState([(
    notes: { title: "", tag: "", description: " ", userId: "" }
  
 )])
  const token = localStorage.getItem("token");
  
useEffect(()=>{
  const fetchData =()=>{
 const options = {
   method: "GET",
   headers: {
     "auth": token
   }
 }
 

 fetch("https://expressserver-khaki.vercel.app/api/note/getnotes", options).then((response)=>{
   response.json().then((info)=>{
     if(response.ok){
     setData(info);
     setNote(true)
 }})
 }).catch((err)=>{
   throw new Error("error")
 })
  }
  fetchData();
},[token, note, deleteNote])

const handleDelete = (id) =>{

  const options = {
    method: "DELETE",
    headers:{
      "auth": token
    }
  }
  
  fetch("https://expressserver-khaki.vercel.app/api/note/delete/" + id, options).then((response)=>{
    response.json().then((data)=>{
      if(response.ok){
        setDeleteNote(true)
      }
      setTimeout(function() {
        setDeleteNote(false)
      },1000);
    })
  }).catch((err)=>{
    setErr (true)
  })
    }

  return (
<>
<div className="text-slate-50 h-[100vh] flex flex-col items-center border-solid border-1 border-slate-200 p-2 rounder-sm">

<div className=" border-solid border-[#f2ef17] rounded-md w-[90vw] h-[100vh] overflow-y-scroll  bg-blue-200 p-2 ">
<section className="flex items-center justify-evenly" >
<h3 className="p-2  text-xl font-serif bold  underline text-lime-600 w-[12vh]"> Notes: </h3>

<Link to="/notes"><button className="h-[4vh] rounded-md  p-1 text-center w-[5vw ] text-[#f2ef17] bg-blue-400 uppercase  flex items-center">add<Plus className="text-2xl"/></button></Link>
</section>
{

    
 (note) ? data.notes.map((elements, index)=>{
  return  <ul key={elements._id} className="w-[85vw] font-sans text-slate-700 border-solid border-slate-300 border-2 p-2 m-1 h-[40vh]">
    <li className="text-2xl bold  "> {elements.title}</li>
            <span className="rounded-lg flex items-center gap-2 ">{elements.tag} <Tags/></span>
    <li className="h-[25vh] border-slate-500 border-solid border-2"> 


    {elements.description} </li>
      <Link  to="/edit" state={{elements}}><button className=" bg-blue-400 rounded-md text-center p-1 m-2  uppercase  text-slate-100 "> <PencilSquare className="text-lg"/></button></Link>

    <button className=" bg-red-600 rounded-md text-center p-1 m-2 text-slate-100 " onClick={()=>{handleDelete(elements._id)}}> <Trash3/></button>
    </ul> 

  })
 : "<Loading....../>"
}
      {(deleteNote && !err) ? <p className="font-sans text-green-500 absolute top-13 left-20">successfully deleteted</p> : " "}
   
  {  (err) ? "error occurred try again" : " "}
    </div>
</div>
</>
    )
}
export   default Home;