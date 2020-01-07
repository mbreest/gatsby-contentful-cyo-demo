import React from "react"
import {Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorylist.module.css"

function ContentElementCategoryList({ highlight, title, categories }) {  
  let className = contentElementStyles.cecategorylist; 
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div>    
        {(categories).map( (category) => (
            <div>
                <Link to={"/" + category.category.slug + "/"}>{category.title}</Link>
            </div>
        ))}
        </div>
    </div>
  )
}
export default ContentElementCategoryList