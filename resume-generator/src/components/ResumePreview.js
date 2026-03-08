import React from "react"

import ModernTemplate from "../templates/ModernTemplate"
import MinimalTemplate from "../templates/MinimalTemplate"
import CorporateTemplate from "../templates/CorporateTemplate"

export default function ResumePreview({data,template}){

return(

<div className="resume-paper-wrapper">

<div id="resume-preview" className="resume-paper">

{template==="modern" && <ModernTemplate data={data}/>}

{template==="minimal" && <MinimalTemplate data={data}/>}

{template==="corporate" && <CorporateTemplate data={data}/>}

</div>

</div>

)

}