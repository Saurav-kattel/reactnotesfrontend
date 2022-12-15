import React, {
  useState
} from "react"
import {
  useNavigate
} from 'react-router-dom'
import Spinner from "./Spinner"

const Signup = () => {
  const navigate = useNavigate();
  const [signup,
    setSignup] = useState(false);
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
          localStorage.setItem('token',(data.token));
          localStorage.getItem('token');
        } else {
          setLoading(false);
          setErrors(true);
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

      <div className="bg-signup flex   flex-col h-[100vh] bg-no-repeat bg-cover items-center bg-h-full  border-slate-500 p-1 text-center m-0">
  <h2 className="font-bold text-2xl uppercase underline font-serif m-1">Sign-up</h2>
  <div className=" flex ">
 <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label><br />
      <input required type="text" value={name} name="name" onChange={handleChange} placeholder="your name" className="w-[50vw] outline-none border-0 rounded-md p-1 " /><br />
      <label htmlFor="email"> Email</label><br />
      <input type="email" required placeholder="example@gmail.com"value={email} name="email" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " /><br />
      <label htmlFor="password"> password </label><br />
      <input type="password" required placeholder="*********" value={password} name="password" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " />
      <br />
            <label htmlFor="confirm password"> Confirm password </label><br />
      <input type="password" required placeholder="*********" value={confirmPassword} name="confirmPassword" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " /><br />
      {(loading) ? <Spinner />: " "}
      {(errors && (!loading)) ? <p className="text-red-500 underline italic">
 error occured try again
</p>: ' ' }
      {(password !== confirmPassword) ? <p className="text-red-500 underline italic">
 please confirm your password
</p>: <button onClick={handleRedirect()} className={`border-0 bg-blue-400 p-2 text-slate-100 m-2 rounded-md `}> sign-up</button> }
</form>
</div>
</div>
} < />
)
}


export default Signup;