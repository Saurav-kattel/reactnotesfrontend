import { useState , useEffect} from "react"
import { Link} from "react-router-dom"
 
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
<div className="text-slate-50  bg-primary-blue h-[100vh] w-[10wvh] block overflow-y-scroll border-solid border-1 border-slate-200 p-2 rounder-sm">

<div className="flex  justify-center">
<h3 className="p-2  text-2xl font-serif bold  underline linline"> Notes: </h3>
    <Link to="/notes"><button className="h-[4vh] bg-buttton-blue rounded-md text-center p-1 m-2 text-slate-100 "> add Note +</button></Link>
    </div>
{

    
 (note) ? data.notes.map((elements, index)=>{
  return  <ul key={elements._id}>
    <li> {elements.title}</li>
    <li> {elements.tag} </li>
    <li> {elements.description} </li>
      <Link  to="/edit" state={{elements}}><button className="h-[4vh] bg-blue-600 rounded-md text-center p-1 m-2 text-slate-100 "> edit</button></Link>

    <button className="h-[4vh] bg-red-600 rounded-md text-center p-1 m-2 text-slate-100 " onClick={()=>{handleDelete(elements._id)}}> delete</button>
    </ul> 

  })
 : "<Loading....../>"
}
      {(deleteNote && !err) ? <p className="font-sans text-green-500 absolute top-13 left-20">successfully deleteted</p> : " "}
   
  {  (err) ? "error occurred try again" : " "}

</div>
</>
    )
}
export   default Home;