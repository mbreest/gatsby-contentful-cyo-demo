import React, { useState }   from "react"
import {designerlink} from "./designerlink"
import {imageServerUrl} from "./imageserver"
import ActionButton from "../components/actionbutton"
import contentElementStyles from "./productimage.module.css"

function ProductImage({ product, locale, designerPath}) {  
  const name = product.fields.name[locale];
  const ptId = product.fields.productTypeId[locale];  
  const available = product.fields.available[locale];  
  const viewId = available ? product.fields.defaultValues[locale].view : null;
  const colorId = available ? product.fields.defaultValues[locale].color : null;
  const views = available ? product.fields.views[locale] : null;
  const colors = available ? product.fields.colors[locale] : null;
  const sizes = available ? product.fields.sizes[locale] : null;
  
  var count = 0;
  var viewCount = 0;

  const backgroundColor = "f2f2f2";
  const [id] = useState(ptId);
  const [view, setView] = useState(viewId);  
  const [color, setColor] = useState(colorId);  

  return (   
    <div className={contentElementStyles.productimage}>        
        {available && <div className={contentElementStyles.viewImages}>
          <ul>
            {(views).map((viewId) => (
              <li key={"piview" + (viewCount++)}><div tabIndex="0" role="button" onClick={() => {setView(viewId)}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { setView(viewId)} }}><img src={imageServerUrl(id, viewId, color, 450, backgroundColor)} alt={name}/></div></li>
            ))}     
          </ul>
        </div>}
        <div className={contentElementStyles.mainImage}>
            <img src={imageServerUrl(id, view, color, 450, backgroundColor)} alt={name}/>
        </div>
        <div className={contentElementStyles.buttons}>
          <div key="piname" className={contentElementStyles.title}>{name}</div>
          {!available && <div key="piavailable" className={contentElementStyles.available}>Dieses Produkt ist aktuell nicht verfügbar!</div>}
          {available && <div key="picolors" className={contentElementStyles.colors}>          
            <ul>
            {(colors).map((color) => (
              <li key={"picolor" + (count++)}><div tabIndex="0" role="button" style={{backgroundColor: color.hex}} onClick={() => {setColor(color.id)}} onKeyDown={(e) => {if (e.keyCode === 13 || e.keyCode === 32) { setColor(color.id) } }}></div></li>
              ))}
            </ul>
          </div>}
          {available && <div key="pisizes" className={contentElementStyles.sizes}>          
            <ul>
            {(sizes).map((size) => (
              <li key={"pisize" + (count++)}><div>{size.name}</div></li>
              ))}
            </ul>
          </div>}
          <ActionButton title="Selbst gestalten" link={designerlink(designerPath, { productTypeId: ptId, appearanceId: color, viewId: view }, locale )} full="yes" hidden={true}/> 
        </div>             
    </div>
  )
}
export default ProductImage