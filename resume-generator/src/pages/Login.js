import React,{useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import "../auth.css"

export default function Login(){

const navigate = useNavigate()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleLogin(e){

e.preventDefault()

try{

const res = await fetch("http://localhost:5000/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})

})

const data = await res.text()

if(res.status===200){

localStorage.setItem("userEmail",email)

alert(data)

navigate("/builder")

}else{

alert(data)

}

}catch{

alert("Backend not running")

}

}

return(

<div className="auth-container">

<div className="auth-card">

<h2>Login</h2>

<form onSubmit={handleLogin}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Login
</button>

</form>

<p>
Don't have an account?
<Link to="/signup"> Sign up</Link>
</p>

</div>

</div>

)

}