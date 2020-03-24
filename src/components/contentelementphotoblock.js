import React from "react"
import Img from "gatsby-image";
import { navigate } from 'gatsby';
import {designerlink} from "./designerlink"
import contentElementStyles from "./contentelementphotoblock.module.css"

const fluid = require('../utils/cloudinary.js').getFluidImage

function ContentElementPhotoBlock({ data, locale, highlight, singleBlock, designerPath }) {              
    const title = data.fields.title[locale];
    const alignRight = data.fields.alignRight[locale];
    const highlightedPhoto = data.fields.highlightedPhoto[locale];
    const photos = data.fields.photos[locale];      

    var className = contentElementStyles.cephotoblock;
    if (highlight === "yes") {
        className += " highlight";
    }
    var direction = contentElementStyles.cephotoblockleft;
    if (alignRight) {
        direction = contentElementStyles.cephotoblockright;
    }  
    var count = 0;

    const highlightedTitle = highlightedPhoto && highlightedPhoto.fields.image[locale].fields.title ? highlightedPhoto.fields.image[locale].fields.title[locale] : ""
    const highlightedDescription = highlightedPhoto && highlightedPhoto.fields.image[locale].fields.description ? highlightedPhoto.fields.image[locale].fields.description[locale] : ""

    return (   
    <div className={className}>               
        {singleBlock && <h2>{title}</h2>}
        {!singleBlock && <h3>{title}</h3>}
        <div className={direction}>
            {highlightedPhoto && 
                <div key={"pbitem" + (count++)} tabIndex="0" role="button" className={contentElementStyles.cephotoblockhighlighted} onClick={() => {navigate(designerlink(designerPath, highlightedPhoto, locale))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(designerPath, highlightedPhoto, locale))} }}>                
                  <Img fluid={fluid({source: highlightedPhoto.fields.image[locale].fields.image[locale][0], max: 500, aspectRatio: 1, breakpoints: [500]})} title={highlightedTitle} alt={highlightedDescription}/>
                </div>              
            }            
            <div className={contentElementStyles.cephotoblockbox}>
            {photos && (photos).map( (photo) => {
              const photoTitle = photo.fields.image[locale].fields.title ? photo.fields.image[locale].fields.title[locale] : ""
              const photoDescription = photo.fields.image[locale].fields.description ? photo.fields.image[locale].fields.description[locale] : ""
              return (
                <div key={"pbitem" + (count++)} tabIndex="0" role="button" onClick={() => {navigate(designerlink(designerPath, photo, locale))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(designerPath, photo, locale)) } }}>                    
                    <Img fluid={fluid({source: photo.fields.image[locale].fields.image[locale][0], max: 300, aspectRatio: 1, breakpoints: [300]})} title={photoTitle} alt={photoDescription}/>
                </div>
              )
            })}
            </div>            
        </div>        
    </div>
  )
}
export default ContentElementPhotoBlock