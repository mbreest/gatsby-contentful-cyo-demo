import React from "react"
import Img from "gatsby-image";
import contentElementStyles from "./contentelementhero.module.css"
import ActionButton from "./actionbutton";

function ContentElementHero({ title, subtitle, hero, action }) {  
    let actionTitle = "";
    if (action && action.title) {
        actionTitle += action.title; 
    }
    let link = "/selbst-gestalten/";
    if (action && action.product && action.product.contentfulid) {
        link += "?productType=" + action.product.contentfulid; 
    }
    
    return (   
    <div className={contentElementStyles.cehero}>
        { hero && <Img fluid={hero.fluid}/>}
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div>
            {action && <ActionButton title={actionTitle} link={link}/>}
        </div>        
    </div>
  )
}
export default ContentElementHero