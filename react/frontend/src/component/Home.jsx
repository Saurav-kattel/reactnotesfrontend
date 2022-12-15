import { useState , useEffect} from "react"
const Home = () =>{
  let notes; 
  const [deleteNote, setDeleteNote] = useState(false)
  const [err, setErr] = useState(false)
  const [note, setNote] = useState(false)
  const [data, setData] = useState([(
    notes: { title: "", tag: "", description: " ", userId: "" }
  
 )])
  const token = localStorage.getItem("token");
  
 //;https://expressserver-khaki.vercel.app/api/note/getallnotes

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
     setData(info);
     setNote(true)
   })
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
    })
  }).catch((err)=>{
    setErr (true)
  })
    }

  return (
<>
<div className="bg-slate-50 h-[100vh] w-full">
<h3 className="p-2 text-center text-3xl font-serif bold  underline"> Notes: </h3>
{
 (note) ? data.notes.map((elements, index)=>{
    return <ul key={elements._id}>
    <li> {elements.title}</li>
    <li> {elements.tag} </li>
    <li> {elements.description} </li>
    <button onClick={()=>{handleDelete(elements._id)}}> delete</button>
    </ul> 
  })
 : <p> loading</p>
}
    {(deleteNote && !err)? <p className="font-sans text-green-500 ">successfully deleteted</p>: " "
    }
    {(err) ? "error occurred try again" : " "}
</div>
</>
    )
}
export   default Home;