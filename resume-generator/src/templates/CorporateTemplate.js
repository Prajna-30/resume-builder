import React from "react";

export default function CorporateTemplate({data}){

return(

<div>

<h1 style={{textAlign:"center"}}>{data.name}</h1>

<p style={{textAlign:"center"}}>
{data.email} | {data.phone} | {data.location}
</p>

<hr/>

<h2>Professional Summary</h2>
<p>{data.summary}</p>

<h2>Education</h2>

{data.education.map((e,i)=>(
<div key={i}>
<strong>{e.degree}</strong>
<p>{e.institution}</p>
</div>
))}

<h2>Skills</h2>

<ul>
{data.skills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

<h2>Experience</h2>

{data.experience.map((e,i)=>(
<div key={i}>
<strong>{e.role}</strong>
<p>{e.company}</p>
<p>{e.desc}</p>
</div>
))}

<h2>Projects</h2>

{data.projects.map((p,i)=>(
<div key={i}>
<strong>{p.title}</strong>
<p>{p.description}</p>
</div>
))}

</div>

)

}