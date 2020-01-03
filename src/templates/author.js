import React from 'react';
import {Link, graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"

export default ({ data }) => {    
  return (
    <Layout>
      <SEO title={data.contentfulAuthor.name} description={data.contentfulAuthor.description.childMarkdownRemark.html} />
      <div>
        <h1>{data.contentfulAuthor.name}</h1>                
        <div dangerouslySetInnerHTML={{ __html: data.contentfulAuthor.description.childMarkdownRemark.html }} />  
      </div>
      <h2>Aktuelle Artikel</h2>
      {(data.allContentfulBlogPost.nodes || []).map( (data) => (        
            <div key={data.id}>
              <Link
                to={ "/blog/" + data.slug }
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >                
                <h3
                    css={css`
                    margin-bottom: ${rhythm(1 / 4)};
                    `}
                >
                    {data.title}{" "}                                       
                </h3>
              </Link>  
              <p>{data.published}</p>
              <Link
                to={ "/blog/" + data.slug }
                css={css`
                  text-decoration: none;
                  color: inherit;
                `}
              >              
                <Img fluid={data.bannerImage.fluid} />
              </Link>              
              
              <p>{data.content.childMarkdownRemark.excerpt} <Link
                to={ "/blog/" + data.slug }            
              >
                Weiterlesen
              </Link></p>
              
            </div>
          ))}
    </Layout>
  )
}

export const query = graphql`
    query authorQuery($short: String!){  
      contentfulAuthor(short: {eq: $short}) {              
        name
        short
        description {
          childMarkdownRemark {
            html
          }
        }
      }
      allContentfulBlogPost(filter: {author: {short: {eq: $short}}}, sort: {fields: published, order: DESC}) {
        nodes {
          slug
          title
          published(formatString: "MMMM DD, YYYY")
          bannerImage {
            fluid(maxWidth: 1200, quality: 80) {
              aspectRatio
              sizes
              src
              srcSet
              srcSetWebp
            }
          }
          content {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }         
    }
`