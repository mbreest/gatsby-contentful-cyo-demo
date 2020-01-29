import React from "react"
import { graphql, Link } from 'gatsby';
import {imageServerUrl} from "./imageserver"
import contentElementStyles from "./productgrid.module.css"
import Img from "gatsby-image";

function ProductGrid({ products }) {  
  var count = 0;
  return (   
    <div className={contentElementStyles.productgrid}>            
      <h1>Produkte</h1>
      <div>
      {products.map( (product) => {                        
        const fluid = {
          aspectRatio: 1,
          src: imageServerUrl(product.contentfulid, product.defaultValues.view, product.defaultValues.color, 300, "f2f2f2"),
          srcSet: imageServerUrl(product.contentfulid, product.defaultValues.view, product.defaultValues.color, 300, "f2f2f2") + " 300w",
          sizes: "(max-width: 300px) 100vw, 300px"
        }
        return (        
          <div key={"pgitem" + count++}>            
            <Link to={ "/detail/" + product.slug + "/" }>
              <Img fluid={fluid} alt={product.name}/>                
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
