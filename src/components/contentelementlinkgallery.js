import React from "react"
import { navigate } from 'gatsby';
import Img from "gatsby-image";
import {designerlink} from "./designerlink"
import contentElementStyles from "./contentelementlinkgallery.module.css"

const fluid = require('../utils/cloudinary.js').getFluidImage

function ContentElementLinkGallery({ links, locale, designerPath}) {  
  if (links && links.length % 3 > 0) {
    links = links.slice()
    var x = (links.length - (links.length % 3) + 3) - links.length;
    for (var i = 0; i <= x; i++) {
      links.push({});
    }
  }
  
  var count = 0;
  return (   
    <div className={contentElementStyles.gallery}>
        {(links).map( (link) => {          
          if (link.fields && link.fields.image) {            
            return (
              <div key={"celg" + (count++)} tabIndex="0" role="button" onClick={() => {navigate(designerlink(designerPath, link, locale))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(designerPath, link, locale))} }}>                  
                  <Img fluid={fluid({source: link.fields.image[locale].fields.image[locale][0], max: 600, aspectRatio: 2, breakpoints: [600]})} title={link.fields.image[locale].fields.title[locale]}/>                  
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