import React from "react";

export default function TemplateSelector({template,setTemplate}){

return(

<div>

<h3>Templates</h3>

<button onClick={()=>setTemplate("modern")}>
Modern
</button>

<button onClick={()=>setTemplate("minimal")}>
Minimal
</button>

<button onClick={()=>setTemplate("corporate")}>
Corporate
</button>
<div className="template-selector">

<button
className={`template-btn ${template==="modern"?"active":""}`}
onClick={()=>setTemplate("modern")}
>
Modern
</button>

<button
className={`template-btn ${template==="minimal"?"active":""}`}
onClick={()=>setTemplate("minimal")}
>
Minimal
</button>

<button
className={`template-btn ${template==="corporate"?"active":""}`}
onClick={()=>setTemplate("corporate")}
>
Corporate
</button>

<button
className={`template-btn ${template==="twocolumn"?"active":""}`}
onClick={()=>setTemplate("twocolumn")}
>
Two Column
</button>

</div>
</div>

)

}