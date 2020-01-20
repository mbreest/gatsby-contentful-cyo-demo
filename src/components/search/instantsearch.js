import React from 'react';
import { connectSearchBox, connectHits } from 'react-instantsearch-dom';
import { Highlight } from 'react-instantsearch-dom';

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
const Hits = ({ hits }) => (
  // if parent component set is type, render, otherwise hide
  <ul className="instantSearchResult">
    {hits.length < 1 ? <li>No search results found</li> : ''}
    {hits.map((hit) => (          
      <li key={hit.title}>
        <a href={"/detail/" + hit.slug}>
          <Highlight attribute="name" hit={hit} />
        </a>
      </li>
    ))}
  </ul>
);

export const CustomHits = connectHits(Hits);