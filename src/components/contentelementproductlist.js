import React from "react"
import {Link, graphql} from 'gatsby';
import {imageServerUrl} from "./imageserver"
import contentElementStyles from "./contentelementproductlist.module.css"

function ContentElementProductList({ highlight, title, products }) {  
  let className = contentElementStyles.ceproductlist;  
  if (highlight === "yes") {
      className += " highlight";
  }
  var count = 0;
  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div>
          <ul>    
          {products && (products).map( (product) => (
            <li key={"cepliitem" + (count++)}>
                <Link to={"/detail/" + product.slug + "/"}>
                <img src={imageServerUrl(product.contentfulid, product.defaultValues.view, product.defaultValues.color, 150, "f2f2f2")}  alt={product.name}/>
                <p>{product.name}</p>
                </Link>
            </li>
          ))}
          </ul>
        </div>
    </div>
  )
}
export default ContentElementProductList

export const productListFields = graphql`
  fragment ProductListFields on ContentfulContentElementProductList {
    products {
      ...ProductListProductFields
    }
    title
    generated
  }
`

export const productListProductFields = graphql`
  fragment ProductListProductFields on ContentfulCatalogProduct {    
    name
    slug
    contentfulid
    defaultValues{
      view
      color
    }
  }
`