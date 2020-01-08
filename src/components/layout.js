import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Breadcrumb from "../components/breadcrumb"
export default ({ slug, category, page, children }) => {    
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allContentfulCatalogCategory(limit: 1000, filter: {}, sort: {fields: index, order: ASC}) {
          nodes {
            contentfulparent {        
              slug
            }
            name
            slug
          }
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
      if (node.contentfulparent && node.contentfulparent.slug === current.slug) {
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

  var submenu = createSubmenu(menu, lookup);
  
  var links = [];    
  if (page) {
    links.unshift({url: "/" + page.slug + "/", title: page.name});
  }

  if (category) {
    var node = lookup[category.slug];
    if (node) {
      while (node.parent) {
        links.unshift({url: "/" + node.slug + "/", title: node.name});
        node = node.parent;
      }            
    }    
  }

  links.unshift({url: "/", title: "Home"});

  return (
        <div 
          css={css`
            margin: 0 auto;
            max-width: 1024px;
            padding: ${rhythm(2)};
            padding-top: ${rhythm(1.5)};
          `}
        >
          <header>
            <Link to={`/`}>
              <img src="/images/logo.svg" css={css`
              width: 300px;
              `} alt={data.site.siteMetadata.title}/>            
            </Link>   
            <div style={{ width: `100%`, backgroundColor: `#f2f2f2`, margin: `0`, padding: `0.5em`}}>
              <ul style={{ listStyle: `none`, margin: `0` }}>            
                <li style={{ display: `inline-block`, marginRight: `1em` }}>
                  <Link to="/selbst-gestalten/">Jetzt Gestalten</Link>
                </li>
                {(menu.children).map( (menuItem) => {
                  return(
                    <li key={menuItem.slug} style={{ display: `inline-block`, marginRight: `1em` }}>
                      <Link to={"/" + menuItem.slug + "/"}>{menuItem.name}</Link>
                    </li>  
                  ) 
                })}
                <li style={{ display: `inline-block`, marginRight: `1em` }}>
                  <Link to="/produkte/">Produkte</Link>
                </li>
                <li style={{ display: `inline-block`, marginRight: `1em` }}>
                  <Link to="/blog/">News</Link>
                </li>
              </ul>
              </div>
              {submenu && <div style={{ width: `100%`, backgroundColor: `#fcfcfc`, margin: `0`, padding: `0.5em`}}>
              <ul style={{ listStyle: `none`, margin: `0` }}>          
                {(submenu.children).map( (menuItem) => {  
                  return(
                    <li key={menuItem.slug} style={{ display: `inline-block`, marginRight: `1em` }}>
                      <Link to={"/" + menuItem.slug + "/"}>{menuItem.name}</Link>
                    </li>  
                  )
                })}
              </ul>
              </div>
              }
            
          </header>
            {links.length > 0 && <Breadcrumb links={links}/> }
          {children}                  
        </div>
    )
}
