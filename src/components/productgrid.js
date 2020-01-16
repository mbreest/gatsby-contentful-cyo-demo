import React from "react"
import { graphql, Link } from 'gatsby';
import {imageServerUrl} from "./imageserver"
import contentElementStyles from "./productgrid.module.css"

function ProductGrid({ products }) {  
  var count = 0;
  return (   
    <div className={contentElementStyles.productgrid}>            
      <h1>Produkte</h1>
      <div>
      {products.map( (product) => {                        
        return (        
          <div key={"pgitem" + count++}>            
            <Link to={ "/detail/" + product.slug + "/" }>
              <img src={imageServerUrl(product.contentfulid, product.defaultValues.view, product.defaultValues.color, 300, "f2f2f2")} alt={product.name}/>                
              <p>{product.name}</p>
            </Link>                  
          </div>
        )              
      })}
      </div>
    </div>     
  )
}
export default ProductGrid

export const productGridFields = graphql`
  fragment ProductGridFields on ContentfulCatalogProduct {
    name                    
    slug
    contentfulid
    defaultValues {
      view
      color
    }    
  }
`
