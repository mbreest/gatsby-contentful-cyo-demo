import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql  } from "gatsby"
import Breadcrumb from "../components/breadcrumb"
import Logo from "../components/logo"
import Menu from "../components/menu"
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

export default ({ slug, category, page, children, type }) => {    
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulCatalogCategory(limit: 1000, filter: {node_locale: {eq: "de"}}, sort: {fields: index, order: ASC}) {
          nodes {
            category {        
              slug
            }
            name
            slug
          }
        }
        allContentfulBlogCategory(filter: {default: {eq: false}, node_locale: {eq: "de"}}, sort: {fields: index, order: ASC}) {
          edges {
            node {
              name
              slug
            }
          }
        }
        designer: contentfulPage(key: {eq: "designer"}, node_locale: {eq: "de"}) {
          slug    
          name
        }
        products: contentfulPage(key: {eq: "products"}, node_locale: {eq: "de"}) {
          slug    
          name
        }
        blog: contentfulPage(key: {eq: "blog"}, node_locale: {eq: "de"}) {
          slug    
          name
        }
      }
    `
  )

  function detectHome(nodes) {
    for (var i in nodes) {
      var node = nodes[i];
      if (node.slug === '-') {
        node.children = [];
        return {name: node.name, slug: node.slug, children: []};
      }
    }
    return null;  
  }
  
  function addMenuItems(current, nodes, lookup) {
    for (var i in nodes) {
      var node = nodes[i];
      if (node.category && node.category.slug === current.slug) {
        var n = {name: node.name, slug: node.slug, children: [], parent: current}
        lookup["" + n.slug] = n;
        current.children.push(n);
        addMenuItems(n, nodes, lookup);
      }
    }
  }

  function createMenu(nodes) {    
    var root = detectHome(nodes);
    var lookup = {};
    lookup["" + root.slug] = root;
    addMenuItems(root, nodes, lookup);
    return [root, lookup];
  }
  
  var [menu, lookup] = createMenu(data.allContentfulCatalogCategory.nodes)

  menu.children.unshift({slug: data.designer.slug, name: data.designer.name, children: []})
  menu.children.push({slug: data.products.slug, name: data.products.name, children: []})
  menu.children.push({slug: data.blog.slug, name: data.blog.name, children: []})
  
  function createSubmenu(menu, lookup) {
    if (slug) {
      var current = lookup[slug];    
      if (current.parent) {
        while (current.parent.slug !== "-") {
            current = current.parent;
        }
        var secondLevelCategory = current.slug;
        for (var i in menu.children) {
          var node = menu.children[i];
          if (node.slug === secondLevelCategory) {
            return node;
          }
        }
      } 
    } 
    return null;
  }
  
  var submenu = null;
  var links = null;
  if (type === "blog") {   
    submenu = {children: data.allContentfulBlogCategory.edges.map( (edge) => ({name: edge.node.name, slug: "blog/kategorie/" + edge.node.slug}))};     
    submenu.children.unshift({name: "Alle", slug: "blog"})

    links = [];
    if (page) {
      links.unshift({url: page.slug, title: page.name});
    }    
    links.unshift({url: "blog", title: "News"})
    links.unshift({url: "", title: "Gestalten"});
    
  } else {
    submenu = createSubmenu(menu, lookup);
  
    links = [];    
    if (page) {
      links.unshift({url: page.slug, title: page.name});
    }
  
    if (category) {
      var node = lookup[category.slug];
      if (node) {
        while (node.parent) {
          links.unshift({url: node.slug, title: node.name});
          node = node.parent;
        }            
      }    
    }
  
    links.unshift({url: "", title: "Gestalten"});
  }

  
  var hideMenuClass = "";
  if (page && page.slug === "selbst-gestalten") {
    hideMenuClass = " mobilehide";
  }

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
            <div id="header" className={contentElementStyles.header + " " + hideMenuClass}>              
              <div className={contentElementStyles.searchContainer}>
                <Logo/>
                <EnhancedSearch/>
              </div>              
              <Menu type="main" menuItems={menu.children}/>                          
              {submenu && <Menu type="sub" menuItems={submenu.children}/> }            
            </div>                    
            {links && links.length > 1 && <Breadcrumb links={links} mod={hideMenuClass}/> }
          {children}                  
        </div>
    )
}
