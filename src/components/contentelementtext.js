import React from "react"
import contentElementStyles from "./contentelementtext.module.css"

function ContentElementText({ html}) {  
  return (   
    <div className={contentElementStyles.text}>
      <div dangerouslySetInnerHTML={{ __html: html }} />  
    </div>    
  )
}
export default ContentElementText