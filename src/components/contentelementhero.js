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
    let queryParams = []
    if (action) {
        if (action.product && action.product.contentfulid) {
            queryParams.push( "productType=" + action.product.contentfulid);    
        }
        if (action.designSearch) {
            queryParams.push( "designSearch=" + action.designSearch);       
        }
        if (action.viewId) {
            queryParams.push( "view=" + action.viewId);       
        }
        if (action.appearanceId) {
            queryParams.push( "appearance=" + action.appearanceId);       
        }
    }
    let queryString = queryParams.join("&");
    if (queryString) {
        link += "?" + queryString;
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
                {action && <ActionButton title={actionTitle} link={link} hidden={true}/>}
            </div>        
        </div>
    </div>
  )
}
export default ContentElementHero