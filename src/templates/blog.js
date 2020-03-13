import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"

export default ({ data }) => {  
    return (
        <Layout type="blog" page={{name: "Blog", slug: "/blog/"}}>          
          <BlogHeader title="Create Blog" text="Inspiration. Lifestyle. Weihnachtswahnsinn."/>              
          <BlogGrid blogPosts={data.default.nodes}/>            
          <BlogGrid title="Mehr Artikel" blogPosts={data.more.nodes}/>           
        </Layout>
      )
}

export const query = graphql`
    query blogPageQuery {
        default: allContentfulBlogPost(
          filter: {
            node_locale: {
              eq: "de"
            }, 
            blogpost: {
              elemMatch: {
                categories: {
                  elemMatch: {
                    slug: {
                      eq: "create_blog"
                    }
                  }
                }
              }
            }
          },
          sort: {
            fields: published, 
            order: DESC
          },
          limit: 3,
        ) {
            totalCount
            nodes {
              ...BlogPostFields  
            }
        }
        more: allContentfulBlogPost(
          filter: {
            node_locale: {
              eq: "de"
            }, 
            blogpost: {
              elemMatch: {
                categories: {
                  elemMatch: {
                    slug: {
                      ne: "create_blog"
                    }
                  }
                }
              }
            }
          },
          sort: {
            fields: published, 
            order: DESC
          },
        ) {
            totalCount
            nodes {
              ...BlogPostFields 
            }
        }
    }
`

export const blogPostFields = graphql`
  fragment BlogPostFields on ContentfulBlogPost {
    title
    slug
    published(formatString: "MMMM DD, YYYY")
    hero {
      title
      description  
      image {        
        fluid(maxWidth: 1200, sizes: "400,800,1200", aspectRatio: 2) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
       
    }
    content {
      excerpt(maxLength: 200)
    }
    author {
      name
      slug
    }
    categories {
      slug
    }
  }
`

export const blogPostFieldsNoAuthor = graphql`
  fragment BlogPostFields_no_author on ContentfulBlogPost {
    title
    slug
    published(formatString: "MMMM DD, YYYY")
    hero {
      title
      description
      image {        
        fluid(maxWidth: 1200, sizes: "400,800,1200", aspectRatio: 2) {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
       
    }
    content {
      excerpt(maxLength: 200)
    }   
    categories {
      slug
    }
  }
`
