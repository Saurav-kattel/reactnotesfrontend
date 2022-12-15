import React , {useState} from "react"
import {useNavigate} from 'react-router-dom'

const Login = () =>{
  const navigate = useNavigate();
   const [errors, setErrors] = useState(false);
  const [email,
    setEmail] = useState("");
  const [password,
    setPassword] = useState("");
const [login, setLogin] = useState(false)
  const handleSubmit = (e) => {
 const Options = {
   method: "POST",
   headers:{
     "Content-Type": "application/json"
   },
   body: JSON.stringify({email,password})
 }
 
 fetch("https://expressserver-khaki.vercel.app/api/user/login",Options).then((response)=>{
   console.log(response)
  response.json().then((data)=>{
    if(response.ok){
     setLogin(true)
    localStorage.setItem('token', data.token);
    }else{
      setErrors(true);
}
  })
 }).catch((err)=>{console.log(err)})
    e.preventDefault();
  }
  const handleChange = (e) =>{
  if(e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }
  const handleRedirect =()=>{
    if(login){
      navigate("/");
    }
  }

  return (
    <>
<form onSubmit={handleSubmit}>
<label htmlFor="email "> email </label><br/>
    <input type="email" required  placeholder="example@gmail.com"value={email} name="email" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " /><br/>
      <label htmlFor="password"> password </label>
      <input type="password" required placeholder="*********" value={password} name="password" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 "  />
      {errors ? <p className="text-red-500 underline italic"> error occured try again </p> : ' ' }
<button onClick={handleRedirect()} className={`border-0 bg-blue-400 p-2 text-slate-100 m-2 rounded-md `}> sign-up</button> 
</form>
    </>
    )
}

export default Login;