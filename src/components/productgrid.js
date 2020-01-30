import React  from "react"
import { graphql, Link } from 'gatsby';
import {imageServerUrl} from "./imageserver"
import "./productgrid.css"
import Img from "gatsby-image";

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure, Highlight} from 'react-instantsearch-dom';
import { Algolia } from 'styled-icons/fa-brands/Algolia'
import qs from 'qs'

const searchClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_API_KEY);

const MyHit = ({ hit }) => {    
      const imageUrl = imageServerUrl(hit.objectID, hit.defaultView, hit.defaultColor, 300, "f2f2f2");
    
      const fluid = {
        aspectRatio: 1,
        src: imageUrl,
        srcSet: imageUrl + " 300w",
        sizes: "(max-width: 300px) 100vw, 300px"
      }

      return (          
        <Link to={ "/detail/" + hit.slug + "/" }>
          <Img fluid={fluid} alt={hit.name}/>                
          {hit._highlighResult && <Highlight attribute="name" hit={hit}/>}
          {!hit._highlighResult &&<span>{hit.name}</span>}
        </Link>                  
    )}  

function ProductGrid(location) {  
  const search = qs.parse(location.location.search.slice(1));
  const query = search.query ? search.query : "";  

  return (   
    <div className="productgrid">            
      <h1>Produkte</h1>          
      <InstantSearch searchClient={searchClient} 
        indexName="Products" >        
        <Configure hitsPerPage={500} />
        <SearchBox submit={<></>} reset={<></>} class="pi-searchBox" defaultRefinement={query} translations={{ placeholder: 'Search Products'}}/>              
        <Hits hitComponent={MyHit} class="pi-Hits"/>                    
        <div className="powered">
              Powered by{` `}
              <a href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby">
                <Algolia size="1em" /> Algolia
              </a>
            </div>
      </InstantSearch>        
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
