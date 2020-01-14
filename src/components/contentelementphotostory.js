import React from "react"
import { graphql } from 'gatsby';
import ContentElementPhotoBlock from "../components/contentelementphotoblock"
import contentElementStyles from "./contentelementphotostory.module.css"

function ContentElementPhotoStory({ title, highlight, photoBlocks}) {              
    var className = contentElementStyles.cephotostory;
    if (highlight === "yes") {
        className += " highlight";
    }   
    return (   
    <div className={className}>               
        {<h2>{title}</h2>}        
        {photoBlocks && (photoBlocks).map( (photoBlock) => (
            <ContentElementPhotoBlock highlight="no" title={photoBlock.title} highlightedPhoto={photoBlock.highlightedPhoto} photos={photoBlock.photos} alignRight={photoBlock.alignRight} singleBlock={false}/>
        ))}
    </div>
  )
}
export default ContentElementPhotoStory


export const photoStoryFields = graphql`
  fragment PhotoStoryFields on ContentfulContentElementPhotoStory {
    title
    photoBlocks {
      ...PhotoBlockFields
    } 
  }
`