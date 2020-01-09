import React from "react"
import {Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigation.module.css"
import Img from "gatsby-image";

function ContentElementCategoryNavigation({ highlight, title, useHero, categories }) {  
  let className = contentElementStyles.cecategorynavigation; 
  if (highlight === "yes") {
      className += " highlight";
  }
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div key="categories">    
        {(categories).map( (category) => {
            return (
                <div key={category.category.slug}>                    
                    <Link to={"/" + category.category.slug + "/"}>
                        {useHero && <Img fluid={category.category.hero.fluid}/>}    
                        {category.title}
                    </Link>
                </div>
            )
        } )}
        </div>
    </div>
  )
}
export default ContentElementCategoryNavigation