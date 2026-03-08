import React, { useState } from "react"

export default function SkillTags({ data, setData }) {

const [skill, setSkill] = useState("")

function addSkill(){

if(!skill.trim()) return

setData({
...data,
skills:[...data.skills, skill]
})

setSkill("")
}

function removeSkill(index){

const updated = data.skills.filter((_,i)=>i!==index)

setData({
...data,
skills:updated
})

}

return(

<div className="card">

<h2>Skills</h2>

<input
placeholder="Add skill"
value={skill}
onChange={(e)=>setSkill(e.target.value)}
/>

<button className="add-btn" onClick={addSkill}>
Add
</button>

<div style={{marginTop:"10px"}}>

{data.skills.map((s,i)=>(
<span key={i} className="tag" onClick={()=>removeSkill(i)}>
{s}
</span>
))}

</div>

</div>

)

}