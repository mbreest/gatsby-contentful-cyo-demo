import React from "react"
import Img from "gatsby-image";
import contentElementStyles from "./contentelementhero.module.css"
import { designerlink } from "./designerlink"
import ActionButton from "./actionbutton";

function ContentElementHero({ title, subtitle, hero, action }) {  
    let actionTitle = "";
    if (action && action.title) {
        actionTitle += action.title; 
    }    
    
    return (   
    <div className={contentElementStyles.cehero}>
        { hero && <div>
            <Img fluid={hero.fluid}/>
        </div>}
        <div className={contentElementStyles.text}>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            <div>
                {action && <ActionButton title={actionTitle} link={ designerlink(action) } hidden={true}/>}
            </div>        
        </div>
    </div>
  )
}
export default ContentElementHero