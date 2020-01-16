import React from "react"
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import ActionButton from "../components/actionbutton"
import contentElementStyles from "./productimage.module.css"

function ProductImage({ product }) {  
  const designerPath = useDesignerData().short;  
  var count = 0;
  return (   
    <div className={contentElementStyles.productimage}>        
        {product.available && <div className={contentElementStyles.viewImages}>
          <ul>
            {(product.viewImages).map((image) => (
              <li><img src={image} alt={product.name}/></li>
            ))}
          </ul>
        </div>}
        <div className={contentElementStyles.mainImage}>
            <img src={product.mainImage} alt={product.name}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div key="piname" className={contentElementStyles.title}>{product.name}</div>
          {!product.available && <div key="piavailable" className={contentElementStyles.available}>Dieses Produkt ist aktuell nicht verfügbar!</div>}
          {product.available && <div key="picolors" className={contentElementStyles.colors}>          
            <ul>
            {(product.colors).map((color) => (
              <li key={"picolor" + (count++)}><div style={{backgroundColor: color.hex}}></div></li>
              ))}
            </ul>
          </div>}
          {product.available && <div key="pisizes" className={contentElementStyles.sizes}>          
            <ul>
            {(product.sizes).map((size) => (
              <li key={"pisize" + (count++)}><div>{size.name}</div></li>
              ))}
            </ul>
          </div>}
          <ActionButton title="Selbst gestalten" link={designerlink(designerPath, {productTypeId: product.contentfulid})} full="yes" hidden={true}/> 
        </div>             
    </div>
  )
}
export default ProductImage