import React from "react"
import {Link } from 'gatsby';
import contentElementStyles from "./contentelementproductlist.module.css"

function ContentElementProductList({ highlight, title, products }) {  
  let className = contentElementStyles.ceproductlist;
  let backgroundColor = "";
  if (highlight === "yes") {
      className += " highlight";
      backgroundColor = ",backgroundColor=f2f2f2";
  }
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div>    
        {(products).map( (product) => (
            <div>
                <Link to={"/detail/" + product.slug + "/"}>
                <img src={"https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + product.contentfulid + ",width=150,height=150" + backgroundColor + ".jpg"}  alt={product.name}/>
                <p>{product.name}</p>
                </Link>
            </div>
        ))}
        </div>
    </div>
  )
}
export default ContentElementProductList