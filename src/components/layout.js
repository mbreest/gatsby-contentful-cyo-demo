import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import Breadcrumb from "../components/breadcrumb"
import Logo from "../components/logo"
import Menu from "../components/menu"
import contentElementStyles from "./layout.module.css"

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

  links.unshift({url: "/", title: "Gestalten"});
  
  menu.children.unshift({slug: "/selbst-gestalten/", name: "Jetzt Gestalten", children: []})
  menu.children.push({slug: "/produkte/", name: "Produkte", children: []})
  menu.children.push({slug: "/blog/", name: "News", children: []})
  
  var hideMenuClass = "";
  if (page && page.slug === "selbst-gestalten") {
    hideMenuClass = " mobilehide";
  }

  console.log(slug);

  return (        
        <div 
          css={css`
            margin: 0 auto;
            max-width: 1024px;
            padding: ${rhythm(0)};
            padding-top: ${rhythm(0)};
          `}
        >       
            <div className={contentElementStyles.header + " " + hideMenuClass}>
              <Logo/>
              <Menu type="main" menuItems={menu.children}/>                          
              {submenu && <Menu type="sub" menuItems={submenu.children}/> }            
            </div>                    
            {links.length > 1 && <Breadcrumb links={links} mod={hideMenuClass}/> }
          {children}                  
        </div>
    )
}
