import React from "react"
import Img from "gatsby-image";
import { navigate } from 'gatsby';
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
              <div onClick={() => {navigate("/selbst-gestalten/?product=" + link.productId + "&view=" + link.viewId)}}>
                  <Img fluid={link.image.fluid} />                  
              </div>                                  
            )
          } else {
            return (
              <div></div>
            )
          }
          } 
        )}
    </div>
  )
}
export default ContentElementLinkGallery