import React from "react"
import { graphql, navigate } from 'gatsby';
import Img from "gatsby-image";
import { designerlink} from "./designerlink"
import contentElementStyles from "./contentelementlinkgallery.module.css"

function ContentElementLinkGallery({ links}) {  

  if (links && links.length % 3 > 0) {
    var x = (links.length - (links.length % 3) + 3) - links.length;
    for (var i = 0; i <= x; i++) {
      links.push({});
    }
  }
  
  return (   
    <div className={contentElementStyles.gallery}>
        {(links).map( (link) => {
          if (link.image) {            
            return (
              <div tabIndex="0" role="button" onClick={() => {navigate(designerlink(link))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(link))} }}>
                  <Img fluid={link.image.fluid} />                  
              </div>                                  
            )
          } else {
            return (
              <div/>
            )
          }
          } 
        )}
    </div>
  )
}
export default ContentElementLinkGallery

export const linkGalleryFields = graphql`
  fragment LinkGalleryFields on ContentfulContentElementLinkGallery {
    id
    name
    links {
      title
      image {
        fluid(maxHeight: 400, maxWidth: 600, quality: 80, resizingBehavior: THUMB, cropFocus: CENTER) {
          ...GatsbyContentfulFluid_withWebp_noBase64
        }
      }
      productId
      viewId                                    
    }
  }
`
