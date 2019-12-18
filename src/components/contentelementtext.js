import React from "react"
function ContentElementText({ html}) {  
  return (   
    <div dangerouslySetInnerHTML={{ __html: html }} />  
  )
}
export default ContentElementText