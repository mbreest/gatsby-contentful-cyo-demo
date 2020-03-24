import React from "react"
import { css } from "@emotion/core"
import Logo from "../components/logo"
import contentElementStyles from "./layout.module.css"
import Helmet from "react-helmet"
import favicon from '../images/favicon.ico'

import './layout.css';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
import { CustomHits } from './instantsearch';
import { Algolia } from 'styled-icons/fa-brands/Algolia'

import onClickOutside from "react-onclickoutside";

const algoliaClient = algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_API_KEY);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    } else {
      const newRequests = requests.map((request) => {
        // test for empty string and change request parameter: analytics
        if (!request.params.query || request.params.query.length === 0) {
          request.params.analytics = false;
        }
        return request;
      });
      return algoliaClient.search(newRequests);
    }    
  },
};

export default ({ mod, children }) => {           
  class Search extends React.Component {
    constructor(props) {
      super(props);      
  
      this.state = {
        hasInput: false,
        refresh: false,
      };
    }

    handleClickOutside = evt => {
      document.getElementsByClassName('ais-SearchBox-input')[0].value = "";      
      this.setState({
        hasInput: false,
      });
    };    

    render() {
      const { refresh, hasInput } = this.state;
      return (
       <div>
        <InstantSearch
          searchClient={searchClient}
          indexName="Products"
          refresh={refresh}
        >
        <Configure hitsPerPage={10} />

        {/* forcefeed className because component does not accept natively as prop */}
        <SearchBox
          className={contentElementStyles.searchbox}
          class="ais-SearchBox-input"
          submit={<></>}
          reset={<></>}
          translations={{
            placeholder: 'Search Products',          
          }}
          onKeyDown={(event) => {
            // if (event.keyCode === 13) { 
            //   const searchValue = document.getElementsByClassName('ais-SearchBox-input')[0].value;
            //   document.getElementsByClassName('ais-SearchBox-input')[0].value = "";      
            //   this.setState({
            //     hasInput: false,
            //   });
            //   navigate("/produkte/?search=" + searchValue) 
            // }
          }}
          onKeyUp={(event) => {
            this.setState({
              hasInput: event.currentTarget.value !== '',
            });            
          }}
          />

          <div className={!hasInput ? "input-empty" : "input-value"}>
            <div className="result">
              <CustomHits hitComponent={Hits} />    
            </div>            
            <div className="powered">
              Powered by{` `}
              <a href="https://www.algolia.com/?utm_source=react-instantsearch&utm_medium=website&utm_content=localhost&utm_campaign=poweredby">
                <Algolia size="1em" /> Algolia
              </a>
            </div>
          </div>
        </InstantSearch>   
       </div>   
      )
    }
  }

  var EnhancedSearch = onClickOutside(Search);

  return (        
        <div 
          css={css`
            margin: 0 auto;
            max-width: 1024px;           
          `}
        >       
            <Helmet>
              <link rel="icon" href={favicon} />
            </Helmet>            
            <div id="header" className={contentElementStyles.header + mod}>              
              <div className={contentElementStyles.searchContainer}>
                <Logo/>
                <EnhancedSearch/>
              </div>                            
            </div>                    
          {children}                  
        </div>
    )
}
