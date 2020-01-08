import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
export default ({ children }) => {
    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
            allContentfulBlogCategory(filter: {default: {eq: false}}, sort: {fields: index, order: ASC}) {
              edges {
                node {
                  name
                  short
                }
              }
            }
          }
        `
      )
    return (
        <div 
          css={css`
            margin: 0 auto;
            max-width: 1024px;
            padding: ${rhythm(2)};
            padding-top: ${rhythm(1.5)};
          `}
        >
          <header style={{ marginBottom: `1.5rem` }}>
            <Link to={`/blog/`}>
              <img src="/images/logo-blog.svg" css={css`
              width: 200px;
              `} alt={data.site.siteMetadata.title}/>            
            </Link>   
            
            <div style={{ width: `100%`, backgroundColor: `#f2f2f2`, paddingTop: `0.5em`}}>
              <ul style={{ listStyle: `none`, marginLeft: `0` }}>
              {(data.allContentfulBlogCategory.edges).map( (edge) => (        
              <li style={{ display: `inline-block`, marginLeft: `1rem`, textDecoration: `none` }}>
                <Link to={"/blog/kategorie/" + edge.node.short + "/"}>{edge.node.name}</Link>
              </li>
              ))}                          
              </ul>
            </div>
          </header>
          {children}        
        </div>
      )
}
