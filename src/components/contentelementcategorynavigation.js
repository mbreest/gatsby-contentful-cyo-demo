import React from "react"
import {Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigation.module.css"
import Img from "gatsby-image";

function ContentElementCategoryNavigation({ highlight, title, useHero, useIcon, highlightedCategories, categories }) {  
  if (useHero) {
    let className = contentElementStyles.cecategorynavigationhero; 
    if (highlight === "yes") {
        className += " highlight";
    }
    return (      
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => (
                <div key={category.category.slug}>                    
                    <Link to={"/" + category.category.slug + "/"}>
                          {category.category.hero && <Img fluid={category.category.hero.fluid}/>}    
                          <p>{category.title}</p>
                    </Link>
                </div>
                )            
            )}
            </div>
        </div>  
      )
  } else if (useIcon) {
        let className = contentElementStyles.cecategorynavigationicon; 
        if (highlight === "yes") {
            className += " highlight";
        }        

        let highlightedCategoryClassName = contentElementStyles.cecategorynavigationhighlightedcategory; 
        let categoryClassName = contentElementStyles.cecategorynavigationcategory; 
        return (
            <div className={className}>
                <h2>{title}</h2>
                <div key="highlightedCategories">
                {highlightedCategories && (highlightedCategories).map( (category) => { return (
                    <div className={contentElementStyles.highlightedclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={highlightedCategoryClassName}>
                                <div className={contentElementStyles.highlightedlink}>{category.title}</div>
                                <div>
                                    {category.category.iconLarge && <Img fluid={category.category.iconLarge.fluid}/>}                                    
                                </div>                                
                            </div>                                                      
                        </Link>
                    </div>
                    )            
                })}    
                </div>
                <div key="categories">    
                {(categories).map( (category) => { return (
                    <div className={contentElementStyles.defaultclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={categoryClassName}>
                                {category.category.icon && <Img fluid={category.category.icon.fluid}/>}                                
                            </div>             
                            <div className={contentElementStyles.defaultlink}>{category.title}</div>
                        </Link>
                    </div>
                    )            
                })}
                </div>
            </div>
        )
  } else {
    let className = contentElementStyles.cecategorynavigation; 
    if (highlight === "yes") {
        className += " highlight";
    }    
    return (
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => {            
                var slug = null;
                var title = null;
                if (category.category) {
                    slug = category.category.slug;                    
                    title = category.title;
                } else {
                    slug = category.slug;
                    title = category.name;
                }                                
                return (
                <div key={slug}>                    
                    <Link to={"/" + slug + "/"}>
                        <div>
                            {title}
                        </div>                          
                    </Link>
                </div>
                )      
            })}
            </div>
        </div>
    )
  }
  
}
export default ContentElementCategoryNavigation