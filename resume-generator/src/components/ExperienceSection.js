import React,{useState} from "react"

export default function Projects({data,setData}){

const [project,setProject]=useState({
title:"",
link:"",
description:"",
tech:""
})

function addProject(){

if(!project.title) return

setData({
...data,
projects:[...data.projects,project]
})

setProject({
title:"",
link:"",
description:"",
tech:""
})

}

return(

<div className="card">

<h2>Projects</h2>

<input
placeholder="Project Title"
value={project.title}
onChange={(e)=>setProject({...project,title:e.target.value})}
/>

<input
placeholder="Project Link"
value={project.link}
onChange={(e)=>setProject({...project,link:e.target.value})}
/>

<textarea
placeholder="Description"
value={project.description}
onChange={(e)=>setProject({...project,description:e.target.value})}
/>

<input
placeholder="Tech Stack"
value={project.tech}
onChange={(e)=>setProject({...project,tech:e.target.value})}
/>

<button className="section-btn" onClick={addProject}>
Add Project
</button>

</div>

)

}