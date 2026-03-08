import React,{useState} from "react"

export default function CertificationSection({data,setData}){

const [cert,setCert]=useState("")

function addCert(){

if(!cert.trim()) return

setData({
...data,
certifications:[...(data.certifications || []),cert]
})

setCert("")
}

function removeCert(index){

const updated=data.certifications.filter((_,i)=>i!==index)

setData({
...data,
certifications:updated
})

}

return(

<div className="card">

<h2>Certifications</h2>

<input
placeholder="Add certification"
value={cert}
onChange={(e)=>setCert(e.target.value)}
/>

<button className="add-btn" onClick={addCert}>
Add
</button>

<div style={{marginTop:"10px"}}>

{data.certifications?.map((c,i)=>(
<span key={i} className="tag" onClick={()=>removeCert(i)}>
{c}
</span>
))}

</div>

</div>

)

}