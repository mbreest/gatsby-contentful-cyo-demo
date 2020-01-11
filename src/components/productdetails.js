import React from "react"
import contentElementStyles from "./productdetails.module.css"
import { css } from "@emotion/core"

function ProductDetails({ highlight, title, text }) {  
  let className = contentElementStyles.productdetails;  
  return (   
    <div className={className}>     
        <h1>{title}</h1>                             
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: text }} />  
    </div>
  )
}
export default ProductDetails