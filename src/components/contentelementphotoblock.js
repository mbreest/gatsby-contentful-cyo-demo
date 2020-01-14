import React from "react"
import Img from "gatsby-image";
import { graphql, navigate } from 'gatsby';
import { designerlink } from './designerlink'
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
            {highlightedPhoto && <div tabIndex="0" role="button" className={contentElementStyles.cephotoblockhighlighted} onClick={() => {navigate(designerlink(highlightedPhoto))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(highlightedPhoto))} }}>                
                <Img fluid={highlightedPhoto.image.fluid}/>
            </div>        
            }            
            <div className={contentElementStyles.cephotoblockbox}>
            {photos && (photos).map( (photo) => (
                <div tabIndex="0" role="button" onClick={() => {navigate(designerlink(photo))}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { navigate(designerlink(photo)) } }}>                    
                    <Img fluid={photo.image.fluid}/>
                </div>
            ))}
            </div>            
        </div>        
    </div>
  )
}
export default ContentElementPhotoBlock

export const photoBlockFields = graphql`
  fragment PhotoBlockFields on ContentfulContentElementPhotoBlock {
    id
    title
    alignRight
    highlightedPhoto {
        image {
            fluid(maxWidth: 500, quality: 80) {
                ...GatsbyContentfulFluid_withWebp_noBase64
            }
        }
        title
        viewId
        productId
    }
    photos {
        title
        image {
            fluid(maxWidth: 300, quality: 80) {
                ...GatsbyContentfulFluid_withWebp_noBase64
            }
        }
        productId
        viewId
    }
  }
`