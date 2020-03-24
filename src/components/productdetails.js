import React from "react"
import contentElementStyles from "./productdetails.module.css"

function ProductDetails({ product, locale }) {  
  const name = product.fields.name[locale];  
  const description = product.fields.description[locale]

  const className = contentElementStyles.productdetails;  
  return (   
    <div className={className}>     
        <h1>{name}</h1>                             
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: description}} />  
    </div>
  )
}
export default ProductDetails