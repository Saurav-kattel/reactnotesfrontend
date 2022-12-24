import React, {
  useState
} from "react"
import {
  useNavigate
} from 'react-router-dom'
import {
  PersonCheck,
  ArrowRepeat
} from "react-bootstrap-icons"
const Login = () => {
  const navigate = useNavigate();
  const [errors,
    setErrors] = useState(false);
  const [loading,
    setLoading] = useState(false);
  const [email,
    setEmail] = useState("");
  const [password,
    setPassword] = useState("");
  const [login,
    setLogin] = useState(false)
  const handleSubmit = (e) => {
    const Options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    }
    setLoading(true)
    fetch("https://expressserver-khaki.vercel.app/api/user/login", Options).then((response)=> {

      response.json().then((data)=> {
        if (response.ok) {
          setLogin(true)
          setLoading(false)
          localStorage.setItem('token', data.token);
        } else {
          setErrors(true);
          setLoading(false)
        }
      })
    }).catch((err)=> {
      console.log(err)
      setErrors(true)
      setLoading(false)
    })
    e.preventDefault();
  }
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }
  const handleRedirect = ()=> {
    if (login) {
      navigate("/");
    }
  }

  return (
    <>
    <div className="flex justify-center items-center flex-col h-[80vh]">
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-2 m-2 gap-2 bg-blue-300 shadow-md rounded-md">
        <label htmlFor="email" className="uppercase font-sans font-bold text-center text-md"> email </label>

    <input type="email" required placeholder="example@gmail.com" id="email" value={email} name="email" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " />
      <label htmlFor="password" className="uppercase font-sans font-bold text-center"> password</label>

      <input type="password" id="password" required placeholder="*********" value={password} name="password" onChange={handleChange} className="w-[50vw] outline-none border-0 rounded-md p-1 " />
          {(loading) ? <ArrowRepeat className="flex justify-center  items-center text-4xl  z-40 animate-spin w-full" />: null}
      {errors ? <p className="text-red-500 underline italic z-30">
 error occured try again
    </p>: null }
    <button onClick={handleRedirect()} className="border-0 bg-blue-400 text-slate-100 rounded-md flex items-center justify-center gap-1 p-1 font-bold"> signIn <PersonCheck /></button>
  </form>
</div> < />
)
}

export default Login;