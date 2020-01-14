import React from "react"
import {designerlink} from "./designerlink"
import ActionButton from "../components/actionbutton"
import contentElementStyles from "./productimage.module.css"

function ProductImage({ title, id }) {  
  return (   
    <div className={contentElementStyles.productimage}>        
        <div className={contentElementStyles.image}>
            <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + id + ",width=450,height=450,backgroundColor=f2f2f2.jpg" } alt={title}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div className={contentElementStyles.title}>{title}</div>
          <ActionButton title="Selbst gestalten" link={designerlink({productTypeId: id})} full="yes" hidden={true}/> 
        </div>        
    </div>
  )
}
export default ProductImage