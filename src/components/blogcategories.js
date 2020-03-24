import React from "react"
import contentElementStyles from "./blogcategories.module.css"
import {Link} from 'gatsby';

function BlogCategories({ title, categories, locale }) {  
  var count = 0;
  return (   
    <div className={contentElementStyles.blogcategory}>        
        <span>Kategorien:</span>
        <ul>
        {(categories).map( (category) => { 
          var name = category.fields.name[locale];
          var link = "/blog/kategorie/" + category.fields.slug[locale] + "/";
          if (category.fields.slug[locale] === "create_blog") {
            name = "Alle";
            link = "/blog/";
          }
          return (              
            <li key={"bcitem" + (count++)}><Link to={link}>{name}</Link></li>
          )
        })}        
        </ul>
    </div>
  )
}

export default BlogCategories