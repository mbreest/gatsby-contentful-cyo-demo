import React from "react"
import contentElementStyles from "./productdetails.module.css"

function ProductDetails({ product }) {  
  let className = contentElementStyles.productdetails;  
  return (   
    <div className={className}>     
        <h1>{product.name}</h1>                             
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: product.description.childMarkdownRemark.html}} />  
    </div>
  )
}
export default ProductDetails