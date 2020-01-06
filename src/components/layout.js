import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"
import logo from "../images/logo.svg";
export default ({ children }) => {    
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
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
            <Link to={`/`}>
              <img src={logo} css={css`
              width: 200px;
              `} alt={data.site.siteMetadata.title}/>            
            </Link>   
            <ul style={{ listStyle: `none`, float: `right` }}>            
              <li style={{ display: `inline-block`, marginRight: `1rem` }}>
                <Link to="/selbst-gestalten/">Selbst Gestalten</Link>
              </li>
              <li style={{ display: `inline-block`, marginRight: `1rem` }}>
                <Link to="/produkte/">Produkte</Link>
              </li>
              <li style={{ display: `inline-block`, marginRight: `1rem` }}>
                <Link to="/blog/">News</Link>
              </li>
            </ul>
          </header>
          {children}        
        </div>
      )
}
