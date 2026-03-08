import React from "react";

export default function MinimalTemplate({data}){

return(

<div>

<h1>{data.name}</h1>

<p>{data.email} | {data.phone}</p>

<h2>Experience</h2>

{data.experience.map((e,i)=>(
<div key={i}>
<strong>{e.company}</strong>
<p>{e.role}</p>
<p>{e.desc}</p>
</div>
))}

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

</div>

)

}