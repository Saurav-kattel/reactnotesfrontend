import React, {
  useState
} from "react"

import {
  Link,
  useLocation
} from "react-router-dom"

export default function Edit() {
  const location = useLocation();


  const states = {
    titles: location.state.elements.title,
    tags: location.state.elements.tag,
    descriptions: location.state.elements.description,
    _id: location.state.elements._id
  }

  const token = localStorage.getItem("token")
  const [title,
    setTitle] = useState(states.titles);
  const [tag,
    setTag] = useState(states.tags)
  const [done,
    setDone] = useState(false);
  const [error,
    setError] = useState(false);


  const [description,
    setDescription] = useState(states.descriptions);


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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth": token
      },
      body: JSON.stringify({
        title, tag, description
      })
    }
    if (token) {
      fetch("https://expressserver-khaki.vercel.app/api/note/update/"+states._id, options).then((response)=> {
        response.json().then((data)=> {
          if (response.ok) {
            setDone(true)
          }
        })
      }).catch(err=> {
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
  { (done) ? <p className="text-green-500 font-serf  ">
 success
</p>: " " }
  { (error) ? <p className="text-red-500 font-serf  ">
 Some error occured try again!
</p>: " "}
    <br />

</div>
    <Link to="/"><button className="p-1 h-[4vh] text-center bg-blue-500 rounded-md text-slate-50 font-sans">view notes-</button></Link>
</form> < />
)
}