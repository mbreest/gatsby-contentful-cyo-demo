import React, { useState }   from "react"
import {designerlink} from "./designerlink"
import {useDesignerData} from "./pagedata"
import {imageServerUrl} from "./imageserver"
import ActionButton from "../components/actionbutton"
import contentElementStyles from "./productimage.module.css"

function ProductImage({ product }) {  
  const designerPath = useDesignerData().short;  
  var count = 0;

  const backgroundColor = "f2f2f2";
  const [id] = useState(product.contentfulid);
  const [view, setView] = useState(product.defaultValues.view);  
  const [color, setColor] = useState(product.defaultValues.color);  

  return (   
    <div className={contentElementStyles.productimage}>        
        {product.available && <div className={contentElementStyles.viewImages}>
          <ul>
            {(product.views).map((viewId) => (
              <li><img src={imageServerUrl(id, viewId, color, 450, backgroundColor)} alt={product.name} onClick={() => {setView(viewId)}}/></li>
            ))}
          </ul>
        </div>}
        <div className={contentElementStyles.mainImage}>
            <img src={imageServerUrl(id, view, color, 450, backgroundColor)} alt={product.name}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div key="piname" className={contentElementStyles.title}>{product.name}</div>
          {!product.available && <div key="piavailable" className={contentElementStyles.available}>Dieses Produkt ist aktuell nicht verfügbar!</div>}
          {product.available && <div key="picolors" className={contentElementStyles.colors}>          
            <ul>
            {(product.colors).map((color) => (
              <li key={"picolor" + (count++)}><div style={{backgroundColor: color.hex}} onClick={() => {setColor(color.id)}}></div></li>
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
          <ActionButton title="Selbst gestalten" link={designerlink(designerPath, {productTypeId: product.contentfulid, appearanceId: color, viewId: view} )} full="yes" hidden={true}/> 
        </div>             
    </div>
  )
}
export default ProductImage