import React from "react"
import contentElementStyles from "./blogcategories.module.css"
import {Link} from 'gatsby';

function BlogCategories({ title, categories }) {  
  var count = 0;
  return (   
    <div className={contentElementStyles.blogcategory}>        
        <span>Kategorien:</span>
        <ul>
        {(categories).map( (category) => { 
          var name = category.name;
          var link = "/blog/kategorie/" + category.short + "/";
          if (category.short === "create_blog") {
            name = "Alle";
            link = "/blog/";
          }
          return (              
            <li key={"bcitem" + count}><Link to={link}>{name}</Link></li>
          )
        })}        
        </ul>
    </div>
  )
}

export default BlogCategories