import React from "react"
import contentElementStyles from "./blogtext.module.css"

function BlogText({ children }) {  
  return (   
    <div className={contentElementStyles.blogtext}>        
        {children}
    </div>
  )
}
export default BlogText