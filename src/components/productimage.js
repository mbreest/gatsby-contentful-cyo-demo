import React from "react"
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import ActionButton from "../components/actionbutton"
import contentElementStyles from "./productimage.module.css"

function ProductImage({ product }) {  
  const designerPath = useDesignerData().short;
  return (   
    <div className={contentElementStyles.productimage}>        
        <div className={contentElementStyles.image}>
            <img src={product.mainImage} alt={product.name}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div className={contentElementStyles.title}>{product.name}</div>
          <ActionButton title="Selbst gestalten" link={designerlink(designerPath, {productTypeId: product.contentfulid})} full="yes" hidden={true}/> 
        </div>        
    </div>
  )
}
export default ProductImage