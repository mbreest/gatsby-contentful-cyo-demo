import React from "react"
import { Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorylist.module.css"

function ContentElementCategoryList({ highlight, data, locale }) {  
  const title = data.fields.title[locale];
  const categories = data.fields.categories[locale];
  
  let className = contentElementStyles.cecategorylist; 
  if (categories.length < 8) {
    className = contentElementStyles.cecategorylist3; 
  }
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div key="categories">    
        {(categories).map( (category) => {
          const categoryTitle = category.fields.category[locale].fields.name[locale];
          const categorySlug = category.fields.category[locale].fields.slug[locale];
          
          return (          
            <div key={categorySlug}>
                <Link to={"/" + categorySlug + "/"}>{categoryTitle}</Link>
            </div>
        )})}
        </div>
    </div>
  )
}
export default ContentElementCategoryList