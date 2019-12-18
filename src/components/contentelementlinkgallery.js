import React from "react"
import Img from "gatsby-image";
import { css } from "@emotion/core" 

function ContentElementLinkGallery({ links}) {  
  return (   
    <div>
        {(links).map( (link) => (
            <div key={link.id} css={css`
                float: left; width:33%; padding: 24px 24px 12px 0px;            
                `}>
                <a href={link.url} alt={link.title}>
                    <Img fluid={link.image.fluid} />
                </a>
            </div>
        ))}
    </div>
  )
}
export default ContentElementLinkGallery