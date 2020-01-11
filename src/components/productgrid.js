import React from "react"
import { Link } from 'gatsby';
import contentElementStyles from "./productgrid.module.css"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

function ProductGrid({ products }) {  
  return (   
    <div className={contentElementStyles.productgrid}>            
      <h1>Produkte</h1>
      <div>
      {products.map( (data) => {                        
        return (        
          <div>            
            <Link to={ "/detail/" + data.node.slug + "/" }>
              <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + data.node.contentfulid + ",width=300,height=300,backgroundColor=e8e8e8.jpg" } alt={data.node.name}/>                
              <p>{data.node.name}</p>
            </Link>                  
          </div>
        )              
      })}
      </div>
    </div>     
  )
}
export default ProductGrid