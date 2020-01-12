import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"

export default ({ data }) => {  
    return (
        <Layout type="blog">          
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
                    short: {
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
                    title
                    slug
                    published(formatString: "MMMM DD, YYYY")
                    bannerImage {
                        fluid(maxWidth: 600, quality: 80) {
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
                    author {
                        name
                        short
                    }
                    categories {
                      short
                    }
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
                    short: {
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
                    title
                    slug
                    published(formatString: "MMMM DD, YYYY")
                    bannerImage {
                        fluid(maxWidth: 600, quality: 80) {
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
                    author {
                        name
                        short
                    }
                    categories {
                      short
                    }
            }
        }
    }
`