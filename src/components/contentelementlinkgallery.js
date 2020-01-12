import React from "react"
import Img from "gatsby-image";
import { css } from "@emotion/core" 
import contentElementStyles from "./contentelementlinkgallery.module.css"

function ContentElementLinkGallery({ links}) {  
  return (   
    <div className={contentElementStyles.gallery}>
        {(links).map( (link) => (
            <div key={link.id}>
                <a href={link.url} alt={link.title}>
                    <Img fluid={link.image.fluid} />
                </a>
            </div>
        ))}
    </div>
  )
}
export default ContentElementLinkGallery