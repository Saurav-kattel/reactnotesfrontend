import React, {
  useState
} from "react"


export default function Notes() {
  const token = localStorage.getItem("token")
  const [title,
    setTitle] = useState("");
  const [tag,
    setTag] = useState("");
  const [done,
    setDone] = useState(false);

  const [error,
    setError] = useState(false);
    
  const [description,
    setDescription] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "tag") {
      setTag(e.target.value)
    } else if (e.target.name === "title") {
      setTitle(e.target.value)
    } else if (e.target.name === "description") {
      setDescription(e.target.value)
    }
  }
  const handleSubmit = (e) => {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth": token
      },
      body: JSON.stringify({
        title, tag, description
      })
    }
    if (token) {
      fetch("https://expressserver-khaki.vercel.app/api/note/save", options).then((response)=> {
        response.json().then((data)=> {
          if (response.ok) {
            setDone(true)
            setTag("")
            setTitle("")
            setDescription("")
          }
        })
      }).catch(err=> {
        console.log(err)
        setError(true)
      })
    }
    e.preventDefault();
  }
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col m-2 p-2 items-center shadow-md h-[70vh] shadow-stone-600 ">
    <div className="border w-[90vw]">
    <label htmlFor="title">Title</label>
    <br />
    <input type="text" className="border-b-2 border-stone-300 outline-none p-2 border-solid "name="title" value={title} onChange={handleChange} />
    <br />
       <label htmlFor="tag">Tag</label>
       <br />
    <input type="text" name="tag" value={tag} onChange={handleChange} />
    <br />
       <label htmlFor="description">description</label>
       <br />
 <textarea name="description" className="outline-none h-[30vh] w-[60vw] resizeNone resize-none border-b-2 border-solid border-stone-300" value={description} onChange={handleChange}></textarea><br />
   <button>Save</button>
   
  { (done) ? <p className="text-green-500 font-serf  "> success </p> :  " " }
  
  
  { (error) ? <p className="text-red-500 font-serf  "> Some error occured</p> : " "}
</div>
</form> < />
)
}