import React from "react"
import ContentElementPhotoBlock from "../components/contentelementphotoblock"
import contentElementStyles from "./contentelementphotostory.module.css"

function ContentElementPhotoStory({ data, locale, highlight, designerPath}) {                
  const title = data.fields.title[locale];
  const photoBlocks = data.fields.photoBlocks[locale];
  
  var className = contentElementStyles.cephotostory;
  if (highlight === "yes") {
    className += " highlight";
  }   
  var count = 0;
  return (   
    <div className={className}>               
        {<h2>{title}</h2>}        
        {photoBlocks && (photoBlocks).map( (photoBlock) => (
            <ContentElementPhotoBlock key={"psitem" + (count++)} highlight="no" singleBlock={false} data={photoBlock} locale={locale} designerPath={designerPath}/>
        ))}
    </div>
  )
}
export default ContentElementPhotoStory