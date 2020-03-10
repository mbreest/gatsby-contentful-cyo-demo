import React from "react"
import { navigate } from 'gatsby';
import Img from "gatsby-image";
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import contentElementStyles from "./contentelementlinkgallery.module.css"
import { getFluidImage } from '../utils/cloudinary.js'

function ContentElementLinkGallery({ links, language}) {  
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
        {(links[language]).map( (link) => {
          
          if (link.fields.image1 && link.fields.image1[language]) {
            console.log(link.fields.image1[language].fields.image[language][0]);  
            return (
              <div key={"celg" + (count++)} tabIndex="0" role="button" onClick={() => {navigate(designerlink(designerPath, link.fields, language))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(designerPath, link.fields, language))} }}>                  
                  <Img fluid={getFluidImage({source: link.fields.image1[language].fields.image[language][0], max: 600, aspectRatio: 2, breakpoints: [600]})} />                  
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