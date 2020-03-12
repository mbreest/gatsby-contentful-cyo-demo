import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"

export default ({ data }) => {    
  return (
    <Layout type="blog" page={{name: data.contentfulAuthor.name, slug: "/blog/autor/" + data.contentfulAuthor.slug + "/"}}>
      <SEO title={data.contentfulAuthor.name} description={data.contentfulAuthor.description.childMarkdownRemark.html} />
      <BlogHeader title={data.contentfulAuthor.name} text={data.contentfulAuthor.description.childMarkdownRemark.html}/>      
      <BlogGrid type="simple" title="Aktuelle Artikel" blogPosts={data.allContentfulBlogPost.nodes}/>      
    </Layout>
  )
}

export const query = graphql`
    query authorQuery($slug: String!){  
      contentfulAuthor(slug: {eq: $slug}, node_locale: {eq: "de"}) {              
        name
        slug
        description {
          childMarkdownRemark {
            html
          }
        }
      }
      allContentfulBlogPost(filter: {author: {slug: {eq: $slug}}, node_locale: {eq: "de"}}, sort: {fields: published, order: DESC}) {
        nodes {
          ...BlogPostFields_no_author
        }
      }         
    }
`