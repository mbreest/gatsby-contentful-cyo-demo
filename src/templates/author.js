import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"

export default ({ data }) => {    
  return (
    <Layout type="blog" page={{name: data.contentfulAuthor.name, slug: "/blog/autor/" + data.contentfulAuthor.short + "/"}}>
      <SEO title={data.contentfulAuthor.name} description={data.contentfulAuthor.description.childMarkdownRemark.html} />
      <BlogHeader title={data.contentfulAuthor.name} text={data.contentfulAuthor.description.childMarkdownRemark.html}/>      
      <BlogGrid type="simple" title="Aktuelle Artikel" blogPosts={data.allContentfulBlogPost.nodes}/>      
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