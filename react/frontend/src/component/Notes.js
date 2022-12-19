import React, {
  useState
} from "react"

import {
  Save2,
  Check2Circle,
  Bug,
  ArrowRepeat
} from "react-bootstrap-icons"
export default function Notes() {
  const token = localStorage.getItem("token")
  const [title,
    setTitle] = useState("");
  const [tag,
    setTag] = useState("");
  const [done,
    setDone] = useState(false);
  const [loading,
    setLoading] = useState(false);
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
      setLoading(true)
      fetch("https://expressserver-khaki.vercel.app/api/note/save", options).then((response)=> {
        response.json().then((data)=> {

          if (response.ok) {

            setTimeout(function() {
              setLoading(false)}, 500);

            setDone(true)
            setTag("")
            setTitle("")
            setDescription("")
          }
        })
      }).catch(err=> {
        console.log(err)
        setLoading(false)
        setError(true)
      })

    }
    e.preventDefault();
  }
  return (
    <>
    <form onSubmit={handleSubmit} className="flex flex-col m-2 mt-4 p-2  items-center justify-center
      shadow-md h-[70vh] shadow-stone-600
      bg-img rounded-md ">
    <div className=" w-[90vw] h-[70vh]  flex flex-col gap-2 bg-opacity-10 m-2">
        <input type="text" className="rounded-lg text-2xl p-2 h-[8vh] m-1 outline-none font-sans bold w-[60vw]  bg-none border-solid "name="title" placeholder="Title" value={title} onChange={handleChange} />
    <input type="text" placeholder="Tag" className="p-2 m-1 outline-none h-[6vh] w-[60vw]" name="tag" value={tag} onChange={handleChange} />

 <textarea name="description" className="outline-none h-[30vh] w-[60vw] resizeNone resize-none p-2 m-1 " value={description} placeholder="Add your note content"onChange={handleChange}></textarea>    {(loading) ? <ArrowRepeat className="flex justify-center items-center text-4xl  z-40 animate-spin w-full" />: null}
   <button className="bg-blue-500 p-2  flex justify-center items-center rounded-lg  text-md text-slate-100 gap-2">save <Save2 className="text-md" /></button>
  { (done) ? <p className="text-green-500 text-lg flex items-center justify-center gap-1 font-serf  ">
 success <Check2Circle />
    </p>: null}


  { (error) ? <p className="text-red-500 font-serf text-lg  gap-2 flex justify-center items-center">
 some error occured try again! <Bug />
    </p>: null}
    <br />

</div>
</form> < />
)
}