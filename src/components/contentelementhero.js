import React from "react"
import Img from "gatsby-image";
import contentElementStyles from "./contentelementhero.module.css"
import {designerlink} from "./designerlink"
import ActionButton from "./actionbutton";

const fluid = require('../utils/cloudinary.js').getFluidImage

function ContentElementHero({data, locale, designerPath }) {  
    const title = data.fields.title ? data.fields.title[locale] : null;
    const subtitle = data.fields.subtitle ? data.fields.subtitle[locale] : null;
    const action = "action" in data.fields ? data.fields.action[locale] : null;      
    const actionTitle = action && action.fields.title ? action.fields.title[locale] : "";        
    const hero = data.fields.image ? fluid({source: data.fields.image[locale].fields.image[locale][0], max: 1200, aspectRatio: 2, breakpoints: [1200,800,400]}) : null;
    const heroTitle = data.fields.image ? data.fields.image[locale].fields.title[locale] : null;
            
    return (   
    <div className={contentElementStyles.cehero}>
        { hero && <div>
            <Img fluid={hero} title={heroTitle}/>
        </div>}
        <div className={contentElementStyles.text}>
            <h1>{title}</h1>
            {subtitle && <h2>{subtitle}</h2>}
            <div>
                {action && <ActionButton title={actionTitle} link={ designerlink(designerPath, action, locale) } hidden={true}/>}
            </div>        
        </div>
    </div>
  )
}
export default ContentElementHero