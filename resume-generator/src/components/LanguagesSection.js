import React,{useState} from "react"

export default function Languages({data,setData}){

const [lang,setLang]=useState("")

function addLanguage(){

if(!lang.trim()) return

setData({
...data,
languages:[...data.languages,lang]
})

setLang("")
}

function removeLanguage(index){

const updated=data.languages.filter((_,i)=>i!==index)

setData({
...data,
languages:updated
})

}

return(

<div className="card">

<h2>Languages</h2>

<input
placeholder="Add language"
value={lang}
onChange={(e)=>setLang(e.target.value)}
/>

<button className="add-btn" onClick={addLanguage}>
Add
</button>

<div style={{marginTop:"10px"}}>

{data.languages.map((l,i)=>(
<span key={i} className="tag" onClick={()=>removeLanguage(i)}>
{l}
</span>
))}

</div>

</div>

)

}