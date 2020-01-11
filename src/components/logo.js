import React from "react"
import contentElementStyles from "./logo.module.css"
import { useStaticQuery, Link, graphql } from "gatsby"

function Logo() {   
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
        <div className={contentElementStyles.logo}>
            <Link to={`/`}>
                <img src="/images/logo.svg" alt={data.site.siteMetadata.title}/
            ></Link>   
        </div>        
  )
}
export default Logo

