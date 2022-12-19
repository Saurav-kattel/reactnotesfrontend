import React, {
  useState
} from "react"
import {
  useNavigate
} from 'react-router-dom'
import {
  PersonPlus,
  XLg
} from 'react-bootstrap-icons';

import Spinner from "./Spinner"

const Signup = () => {
  const navigate = useNavigate();
  const [signup,
    setSignup] = useState(false);
  const [show,
    setShow] = useState(true);
  const [loading,
    setLoading] = useState(false);
  const [name,
    setName] = useState("");
  const [errors,
    setErrors] = useState(false);
  const [email,
    setEmail] = useState("");
  const [password,
    setPassword] = useState("");

  const [confirmPassword,
    setComfirmPassword] = useState("");

  const handleSubmit = (e) => {
    const Options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password
      })
    }

    fetch("https://expressserver-khaki.vercel.app/api/user/signup", Options).then((response)=> {
      response.json().then((data)=> {

        if (response.ok) {
          setSignup(true);
          localStorage.setItem('token', (data.token));
          localStorage.getItem('token');
        } else {
          setLoading(false);
          setErrors(true);
          setName("")
          setPassword("")
          setEmail("")
          setComfirmPassword("")
        }
      })
    })
    .catch((err)=> {
      console.log(err)})
    e.preventDefault();
  }
  const handleChange = (e)=> {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setComfirmPassword(e.target.value);
    }
  }
  const handleRedirect = ()=> {
    if (signup) {
      setTimeout(function() {
        setLoading(true);
        navigate("/");
      }, 100);

    }
  }
  return(
    <>
    {

      <div className="bg-signup flex   flex-col h-[100vh] bg-no-repeat bg-cover items-center bg-h-full mt-3 border-slate-500 p-1 text-center m-0 resize-none">

  <div className=" flex bg-blue-200 justify-center rounded-md flex-col gap-3  items-center h-[65vh] w-[80vw] text-slate-700">
  
    <h2 className="font-bold text-2xl uppercase underline font-sans  m-1">Sign-up</h2>
    
 <form onSubmit={handleSubmit} className="flex flex-col items-center gap-1 font-sans ">
 
      <label htmlFor="name">Name</label>
      <input required type="text" value={name} name="name" id="name" onChange={handleChange} placeholder="your name" className="w-[50vw] outline-none border-0 rounded-md p-1 " />
      
      <label htmlFor="email"> Email</label> 
      <input type="email" required placeholder="example@gmail.com"value={email} name="email" onChange={handleChange} id="email" className="w-[50vw] outline-none border-0 rounded-md p-1 " /> 
      
      <label htmlFor="password"> password </label> 
      <input type="password" required placeholder="*********" id="password" value={password} name="password" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " />
       
            <label htmlFor="confirmPassword"> Confirm password </label> 
      <input type="password" required placeholder="*********" value={confirmPassword} name="confirmPassword" id="confirmPassword" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1  " /> 
      
      
      {(loading) ? <Spinner />: " "}
      {(errors && (!loading)) ? <p className="text-red-500 underline italic">
 error occured try again
</p>: ' ' }
      {(password !== confirmPassword) ? <p className="text-red-500 underline italic">
 please confirm your password
</p>: <button onClick={handleRedirect()} className="border-0 bg-blue-400 text-slate-100 rounded-md text-center flex justify-center mt-2 p-2 items-center gap-1"> signup <PersonPlus /></button> }
</form>
</div>
{
(((name && email && password && confirmPassword)!== "")  &&(show))? <div className="w-[70vw] h-[13vh]  overflow-y-scroll rounded-md p-2 m-2 font-serif text-left   bg-slate-100 border-solid border-1 border-slate-500"> <XLg onClick={()=>{
setShow(false)}}className="float-right"/> <p className="text-red-700 lighter">By clicking the signup button your account will be created and we will use your following Email  to contact you and your Name will be your username... Thank  you!</p></div>: null}
</div>
} < />
)
}


export default Signup;