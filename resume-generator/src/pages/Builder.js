import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"

import EducationSection from "../components/EducationSection"
import ExperienceSection from "../components/ExperienceSection"
import SkillTags from "../components/SkillTags"
import Languages from "../components/LanguagesSection"
import Projects from "../components/Projects"
import ResumePreview from "../components/ResumePreview"
import generatePDF from "../utils/pdfGenerator"
import CertificationSection from "../components/CertificationsSection"
import "../App.css"

export default function Builder(){

const navigate = useNavigate()

const userEmail = localStorage.getItem("userEmail")

const [template,setTemplate] = useState("modern")
const [savedResumes,setSavedResumes] = useState([])

const [data,setData] = useState({

name:"",
email:"",
phone:"",
location:"",
linkedin:"",
github:"",
portfolio:"",
summary:"",

skills:[],
certifications:[],
languages:[],
education:[],
experience:[],
projects:[]

})

/* LOAD SAVED RESUMES + SET EMAIL */

useEffect(()=>{

async function loadResumes(){

try{

const res = await fetch(`http://localhost:5000/get-resume?userId=${userEmail}`)

const result = await res.json()

if(Array.isArray(result)){
setSavedResumes(result)
}else{
setSavedResumes([])
}

}catch{

setSavedResumes([])

}

}

if(userEmail){

setData(prev => ({
...prev,
email:userEmail
}))

loadResumes()

}

},[userEmail])

/* LOAD RESUME INTO EDITOR */

function loadResume(resume){

setData({
...resume,
email:userEmail
})

}

/* SAVE RESUME */

async function saveResume(){

const resumeData={
...data,
userId:userEmail
}

try{

const res = await fetch("http://localhost:5000/save-resume",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(resumeData)

})

await res.text()

alert("Resume Saved Successfully")

// refresh saved resumes

const res2 = await fetch(`http://localhost:5000/get-resume?userId=${userEmail}`)
const result = await res2.json()

if(Array.isArray(result)){
setSavedResumes(result)
}

}catch{

alert("Error saving resume")

}

}

/* DOWNLOAD */

function downloadResume(){
generatePDF()
}

/* LOGOUT */

function logout(){

localStorage.removeItem("userEmail")

navigate("/")

}

return(

<div>

{/* HEADER */}

<div className="builder-header">

<h1>Resume Builder</h1>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

{/* MAIN BUILDER */}

<div className="container">

{/* LEFT FORM */}

<div className="form-section">

<input
placeholder="Name"
value={data.name}
onChange={(e)=>setData({...data,name:e.target.value})}
/>

<input
placeholder="Email"
value={data.email}
onChange={(e)=>setData({...data,email:e.target.value})}
/>

<input
placeholder="Phone"
value={data.phone}
onChange={(e)=>setData({...data,phone:e.target.value})}
/>

<input
placeholder="Location"
value={data.location}
onChange={(e)=>setData({...data,location:e.target.value})}
/>

<textarea
placeholder="Professional Summary"
value={data.summary}
onChange={(e)=>setData({...data,summary:e.target.value})}
/>

<SkillTags data={data} setData={setData}/>
<CertificationSection data={data} setData={setData}/>
<Languages data={data} setData={setData}/>
<EducationSection data={data} setData={setData}/>
<ExperienceSection data={data} setData={setData}/>
<Projects data={data} setData={setData}/>

<div className="builder-buttons">

<button className="download-btn" onClick={downloadResume}>
Download Resume
</button>

<button className="save-btn" onClick={saveResume}>
Save Resume
</button>

</div>

</div>

{/* RIGHT PREVIEW */}

<div className="preview-section">

<div className="template-selector">

<button onClick={()=>setTemplate("modern")}>Modern</button>

<button onClick={()=>setTemplate("minimal")}>Minimal</button>

<button onClick={()=>setTemplate("corporate")}>Corporate</button>

</div>

<ResumePreview data={data} template={template}/>

</div>

</div>

{/* SAVED RESUMES */}

<div style={{padding:"40px"}}>

<h2>Saved Resumes</h2>

{savedResumes.length===0 && <p>No saved resumes</p>}

{savedResumes.map((resume,i)=>(

<div
key={i}
style={{
border:"1px solid #ccc",
padding:"15px",
marginTop:"10px",
borderRadius:"6px",
cursor:"pointer"
}}
onClick={()=>loadResume(resume)}
>

<strong>{resume.name || "Untitled Resume"}</strong>

</div>

))}

</div>

</div>

)

}