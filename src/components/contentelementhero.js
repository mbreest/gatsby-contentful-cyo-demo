import React from "react"
import Img from "gatsby-image";
import contentElementStyles from "./contentelementhero.module.css"
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import ActionButton from "./actionbutton";
import { graphql } from 'gatsby';

function ContentElementHero({ title, subtitle, image, action }) {  
    const designerPath = useDesignerData().slug;
    let actionTitle = "";
    if (action && action.title) {
        actionTitle += action.title; 
    }    
    if (image && Array.isArray(image.image) && image.image.length > 0) {
        image.image = image.image[0];        
    }

    return (   
    <div className={contentElementStyles.cehero}>
        { image && image.image && <div>
            <Img fluid={image.image.fluid} title={image.title} alt={image.description}/>
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

export const heroFields = graphql`
  fragment HeroFields on ContentfulHero {
    title
    subtitle    
    action {
      product {
        contentfulid
      }
      title            
      appearanceId
      viewId
      designSearch
    }    
    image {
      title
      description
      image {
        fluid(maxWidth: 1200, sizes: "400,800,1200", aspectRatio: 2) {
          aspectRatio
          src
          srcSet
          sizes
        } 
      }
    }               
    
  }
`