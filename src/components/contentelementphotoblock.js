import React from "react"
import Img from "gatsby-image";
import { navigate } from 'gatsby';
import contentElementStyles from "./contentelementphotoblock.module.css"

function ContentElementPhotoBlock({ title, highlight, highlightedPhoto, photos, alignRight, singleBlock }) {              
    var className = contentElementStyles.cephotoblock;
    if (highlight === "yes") {
        className += " highlight";
    }
    var direction = contentElementStyles.cephotoblockleft;
    if (alignRight) {
        direction = contentElementStyles.cephotoblockright;
    }  
    return (   
    <div className={className}>               
        {singleBlock && <h2>{title}</h2>}
        {!singleBlock && <h3>{title}</h3>}
        <div className={direction}>
            {highlightedPhoto && <div tabindex="0" role="button" className={contentElementStyles.cephotoblockhighlighted} onClick={() => {navigate("/selbst-gestalten/?product=" + highlightedPhoto.productId + "&view=" + highlightedPhoto.viewId)}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate("/selbst-gestalten/?product=" + highlightedPhoto.productId + "&view=" + highlightedPhoto.viewId)} }}>                
                <Img fluid={highlightedPhoto.image.fluid}/>
            </div>        
            }            
            <div className={contentElementStyles.cephotoblockbox}>
            {photos && (photos).map( (photo) => (
                <div tabindex="0" role="button" onClick={() => {navigate("/selbst-gestalten/?product=" + photo.productId + "&view=" + photo.viewId)}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate("/selbst-gestalten/?product=" + photo.productId + "&view=" + photo.viewId) } }}>                    
                    <Img fluid={photo.image.fluid}/>
                </div>
            ))}
            </div>            
        </div>        
    </div>
  )
}
export default ContentElementPhotoBlock