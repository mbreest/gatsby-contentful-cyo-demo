import React from "react"
import Img from "gatsby-image";
import {Link } from 'gatsby';
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
            {highlightedPhoto && <div className={contentElementStyles.cephotoblockhighlighted}>
                <Link to={"/selbst-gestalten/?product=" + highlightedPhoto.productId + "&view=" + highlightedPhoto.viewId}>
                    <Img fluid={highlightedPhoto.image.fluid}/>
                </Link>
            </div>        
            }            
            <div className={contentElementStyles.cephotoblockbox}>
            {photos && (photos).map( (photo) => (
                <div>
                    <Link to={"/selbst-gestalten/?product=" + photo.productId + "&view=" + photo.viewId}>
                        <Img fluid={photo.image.fluid}/>
                    </Link>
                </div>
            ))}
            </div>            
        </div>        
    </div>
  )
}
export default ContentElementPhotoBlock