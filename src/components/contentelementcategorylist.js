import React from "react"
import {Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorylist.module.css"

function ContentElementCategoryList({ highlight, title, categories }) {  
  let className = contentElementStyles.cecategorylist; 
  if (categories.length < 8) {
    className = contentElementStyles.cecategorylist3; 
  }
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div key="categories">    
        {(categories).map( (category) => (
            <div key={category.category.slug}>
                <Link to={"/" + category.category.slug + "/"}>{category.title}</Link>
            </div>
        ))}
        </div>
    </div>
  )
}
export default ContentElementCategoryList