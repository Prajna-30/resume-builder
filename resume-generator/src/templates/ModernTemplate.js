import React from "react";

export default function ModernTemplate({data}){

return(

<div>

<h1>{data.name}</h1>

<p>{data.email} | {data.phone} | {data.location}</p>

<h2>Professional Summary</h2>
<p>{data.summary}</p>

<h2>Skills</h2>
<ul>
{data.skills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

<h2>Languages</h2>

<ul>
{data.languages.map((l,i)=>(
<li key={i}>{l}</li>
))}
</ul>

<h2>Education</h2>

{data.education.map((e,i)=>(
<div key={i}>
<strong>{e.degree}</strong>
<p>{e.institution}</p>
<p>{e.year}</p>
</div>
))}

<h2>Work Experience</h2>

{data.experience.map((e,i)=>(
<div key={i}>
<strong>{e.role} — {e.company}</strong>
<p>{e.start} - {e.end}</p>
<p>{e.desc}</p>
</div>
))}

<h2>Projects</h2>

{data.projects.map((p,i)=>(
<div key={i}>
<strong>{p.title}</strong>
<p>{p.description}</p>
<p>{p.tech}</p>
</div>
))}

</div>

)

}