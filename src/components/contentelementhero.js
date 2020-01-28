import React from "react"
import Img from "gatsby-image";
import contentElementStyles from "./contentelementhero.module.css"
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import ActionButton from "./actionbutton";

function ContentElementHero({ title, subtitle, hero, action }) {  
    const designerPath = useDesignerData().short;
    let actionTitle = "";
    if (action && action.title) {
        actionTitle += action.title; 
    }    
    if (Array.isArray(hero) && hero.length > 0) {
        hero = hero[0];        
    }

    return (   
    <div className={contentElementStyles.cehero}>
        { hero && hero.fluid && <div>
            <Img fluid={hero.fluid}/>
        </div>}
        <div className={contentElementStyles.text}>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            <div>
                {action && <ActionButton title={actionTitle} link={ designerlink(designerPath, action) } hidden={true}/>}
            </div>        
        </div>
    </div>
  )
}
export default ContentElementHero