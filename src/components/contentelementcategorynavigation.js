import React from "react"
import { Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigation.module.css"

function ContentElementCategoryNavigation({ highlight, data, locale, topCategories}) {   
    const title = data.fields.title[locale];
    const categories = data.fields.categories ? data.fields.categories[locale] : topCategories;
 
    var count = 0;
    var className = contentElementStyles.cecategorynavigation; 
    if (highlight === "yes") {
        className += " highlight";
    }    
    return (
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => {     
                var categoryTitle = category.fields.name ? category.fields.name[locale] : category.fields.title[locale];
                var categorySlug = category.fields.slug ? category.fields.slug[locale] : category.fields.category[locale].fields.slug[locale];                
                                                         
                return (
                <div key={"pnitem" + (count++)}>                    
                    <Link to={"/" + categorySlug + "/"}>
                        <div>
                            {categoryTitle}
                        </div>                          
                    </Link>
                </div>
                )      
            })}
            </div>
        </div>
    )
  
}
export default ContentElementCategoryNavigation