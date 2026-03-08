import React,{useState} from "react"
import {useNavigate,Link} from "react-router-dom"
import "../auth.css"

export default function Signup(){

const navigate = useNavigate()

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleSignup(e){

e.preventDefault()

const res = await fetch("http://localhost:5000/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password
})

})

const data = await res.text()

alert(data)

navigate("/")

}

return(

<div className="auth-container">

<div className="auth-card">

<h2>Signup</h2>

<form onSubmit={handleSignup}>

<input
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
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
Signup
</button>

</form>

<p>

Already have an account?

<Link to="/"> Login</Link>

</p>

</div>

</div>

)

}