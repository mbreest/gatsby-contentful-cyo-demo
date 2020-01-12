import React from "react"
import contentElementStyles from "./blogheader.module.css"

function BlogHeader({ title, text, children }) {  
  return (   
    <div className={contentElementStyles.blogheader}>        
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: text }} />  
        <div>
            {children}
        </div>        
    </div>
  )
}
export default BlogHeader