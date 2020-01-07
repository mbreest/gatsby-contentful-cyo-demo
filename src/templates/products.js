import React from 'react';
import {graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Breadcrumb from "../components/breadcrumb"
import { rhythm } from "../utils/typography"

export default ({ data }) => {  
    var links = [{"url": "/", "title": "Home"}, {"url": "/produkte/", "title": "Produkte"}]
  return (
    <Layout>
        <SEO title="Produkte" description="Produkte" />
        <Breadcrumb links={links}/>
        <div>
          <div>
          <h1
            css={css`
              display: inline-block;              
            `}
          >
            Produkte
          </h1>     
          <div>
          {data.allContentfulCatalogProduct.edges.map( (data) => {                        
              return (        
                <div key={data.node.id}
                      css={css`
                float: left; width:33%; height:400px; padding: 24px 12px 12px 0px;            
                `}>
                  <Link
                    to={ "/detail/" + data.node.slug + "/" }
                    css={css`
                      text-decoration: none;
                      color: inherit;
                    `}
                  >
                    <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + data.node.contentfulid + ",width=300,height=300,backgroundColor=e8e8e8.jpg" } alt={data.node.name}/>                
                    <span
                        css={css`
                        margin-bottom: ${rhythm(1 / 4)};
                        `}
                    >
                        {data.node.name}                                   
                    </span>
                  </Link>                  
                </div>
              )              
          })}
          </div>     
          </div>              
        </div>
    </Layout>
  )
}

export const query = graphql`
    query allCatalogProductsQuery {
      allContentfulCatalogProduct (filter: {active: {eq: true}}, limit: 1000) {
        edges {
            node {
                name                    
                slug
                contentfulid
            }
        }
      }
    }
`