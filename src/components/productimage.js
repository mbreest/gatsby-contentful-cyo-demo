import React from "react"
import contentElementStyles from "./productimage.module.css"
import { css } from "@emotion/core"
import ActionButton from "../components/actionbutton"

function ProductImage({ title, id }) {  
  return (   
    <div className={contentElementStyles.productimage}>        
        <div className={contentElementStyles.image}>
            <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + id + ",width=450,height=450,backgroundColor=f2f2f2.jpg" } alt={title}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div className={contentElementStyles.title}>{title}</div>
          <ActionButton title="Selbst gestalten" link={"/selbst-gestalten/?productType=" + id} full="yes" hidden={true}/> 
        </div>        
    </div>
  )
}
export default ProductImage