import React,{useState} from "react";

export default function EducationSection({data,setData}){

const [edu,setEdu] = useState({
degree:"",
institution:"",
year:"",
gpa:""
})

function addEducation(){

setData({
...data,
education:[...data.education,edu]
})

setEdu({
degree:"",
institution:"",
year:"",
gpa:""
})

}

return(

<div>

<h3>Education</h3>

<input
placeholder="Degree"
value={edu.degree}
onChange={(e)=>setEdu({...edu,degree:e.target.value})}
/>

<input
placeholder="Institution"
value={edu.institution}
onChange={(e)=>setEdu({...edu,institution:e.target.value})}
/>

<input
placeholder="Year"
value={edu.year}
onChange={(e)=>setEdu({...edu,year:e.target.value})}
/>

<input
placeholder="GPA"
value={edu.gpa}
onChange={(e)=>setEdu({...edu,gpa:e.target.value})}
/>

<button className="section-btn" onClick={addEducation}>
Add Education
</button>
</div>

)

}