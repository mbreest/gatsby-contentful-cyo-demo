import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"

export default ({ data }) => {  
  console.log(data.allContentfulBlogPost.nodes);
  return (
    <Layout type="blog" page={{name: data.contentfulBlogCategory.name, slug: "/blog/kategorie/" + data.contentfulBlogCategory.short + "/" }}>
      <SEO title={data.contentfulBlogCategory.name} description={data.contentfulBlogCategory.description.childMarkdownRemark.html} />
      <BlogHeader title={data.contentfulBlogCategory.name} text={data.contentfulBlogCategory.description.childMarkdownRemark.html}/>            
      <BlogGrid type="simple" title="Aktuelle Artikel" blogPosts={data.allContentfulBlogPost.nodes}/>                  
    </Layout>
  )
}

export const query = graphql`
    query blogCategoryQuery($short: String!){       
      contentfulBlogCategory(short: {eq: $short}) {             
        name
        short
        description {
          childMarkdownRemark {
            html
          }
        }
      }
      allContentfulBlogPost(filter: {blogpost: {elemMatch: {categories: {elemMatch: {short: {eq: $short}}}}}}, sort: {fields: published, order: DESC}) {
        nodes {
          ...BlogPostFields 
        }
      }   
    }
`