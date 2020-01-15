import React from "react"
import { graphql, navigate } from 'gatsby';
import Img from "gatsby-image";
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import contentElementStyles from "./contentelementlinkgallery.module.css"

function ContentElementLinkGallery({ links}) {  
  const designerPath = useDesignerData().short;

  if (links && links.length % 3 > 0) {
    var x = (links.length - (links.length % 3) + 3) - links.length;
    for (var i = 0; i <= x; i++) {
      links.push({});
    }
  }
  
  var count = 0;
  return (   
    <div className={contentElementStyles.gallery}>
        {(links).map( (link) => {
          if (link.image) {            
            return (
              <div key={"celg" + (count++)} tabIndex="0" role="button" onClick={() => {navigate(designerlink(designerPath, link))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(designerPath, link))} }}>
                  <Img fluid={link.image.fluid} />                  
              </div>                                  
            )
          } else {
            return (
              <div key={"celg" + (count++)} />
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
