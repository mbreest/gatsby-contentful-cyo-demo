import React from "react"
import { Link } from 'gatsby';
import contentElementStyles from "./productgrid.module.css"

function ProductGrid({ products }) {  
  return (   
    <div className={contentElementStyles.productgrid}>            
      <h1>Produkte</h1>
      <div>
      {products.map( (product) => {                        
        return (        
          <div>            
            <Link to={ "/detail/" + product.slug + "/" }>
              <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + product.contentfulid + ",width=300,height=300,backgroundColor=e8e8e8.jpg" } alt={product.name}/>                
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