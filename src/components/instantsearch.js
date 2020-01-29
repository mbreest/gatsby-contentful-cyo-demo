import React from 'react';
import { connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { Highlight } from 'react-instantsearch-dom';
import Img from "gatsby-image";

const SearchBox = ({ currentRefinement, refine }) => (
  <div className="ais-SearchBox">
    <form noValidate action="" role="search" className="ais-SearchBox-form">
      <input
        className="ais-SearchBox-input"
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </form>
  </div>
);

export const CustomSearchBox = connectSearchBox(SearchBox);

// on page load do not display
const Hits = ({ hits }) => {  
  return (
  // if parent component set is type, render, otherwise hide
  <ul className="instantSearchResult">
    {hits.length < 1 ? <li>No search results found</li> : ''}
    {hits.map((hit) => {
      const fluid = {
        aspectRatio: 1,
        src: hit.imageUrl,
        srcSet: hit.imageUrl + " 300w",
        sizes: "(max-width: 300px) 100vw, 300px"
      }

      return (          
      <li key={hit.title}>
        <a href={"/detail/" + hit.slug}>
          <div style={{display: "flex"}}>
            <div>
              <Img style={{width: "80px", height: "80px" }} fluid={fluid} alt={hit.title}/>
            </div>
            <div>            
              <Highlight attribute="name" hit={hit} />            
            </div>          
          </div>
        </a>        
      </li>
    )
    })}
  </ul>
);
}

export const CustomHits = connectHits(Hits);