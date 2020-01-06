import React from 'react';
import {graphql, Link } from 'gatsby';
import Layout from "../components/layout-blog"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image";

export default ({ data }) => {  
    return (
        <Layout>
          <div>
            <div>
            <h1
              css={css`
                display: inline-block;              
              `}
            >
              Create Blog
            </h1>
            <p>Inspiration. Lifestyle. Weihnachtswahnsinn.</p>                    
            {data.default.edges.map( (entry) => {                        
                return (        
                  <div key={entry.node.id}
                        css={css`
                  float: left; width:33%; height:420px; padding: 24px 12px 12px 0px;            
                  `}>
                    <Link
                      to={ "/blog/" + entry.node.slug + "/"}
                      css={css`
                        text-decoration: none;
                        color: inherit;
                      `}
                    >
                      <Img fluid={entry.node.bannerImage.fluid}  />
                    </Link>
                    <Link
                      to={ "/blog/" + entry.node.slug + "/" }
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
                          {entry.node.title}{" "}                                       
                      </h3>
                    </Link>
                    <p>{entry.node.published} | <Link to={"/blog/autor/" + entry.node.author.short + "/"}>{entry.node.author.name}</Link></p>
                      
                    <p>{entry.node.content.childMarkdownRemark.excerpt} <Link
                      to={ "/blog/" + entry.node.slug + "/" }            
                    >
                      Weiterlesen
                    </Link></p>
                  </div>
                )              
            })}
            </div>
            
            <div css={css`
                        clear: left;                      
                      `}>
              <h1>Mehr Artikel</h1>
            {data.more.edges.map( (entry) => {            
                return (        
                  <div key={entry.node.id}
                        css={css`
                  float: left; width:33%; height:420px; padding: 24px 12px 12px 0px;            
                  `}>
                    <Link
                      to={ "/blog/" + entry.node.slug + "/" }
                      css={css`
                        text-decoration: none;
                        color: inherit;
                      `}
                    >
                      <Img fluid={entry.node.bannerImage.fluid}  />
                    </Link>
                    <Link
                      to={ "/blog/" + entry.node.slug + "/" }
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
                          {entry.node.title}{" "}                                       
                      </h3>
                    </Link>
                    <p>{entry.node.published} | <Link to={"/blog/autor/" + entry.node.author.short + "/"}>{entry.node.author.name}</Link></p>
                      
                    <p>{entry.node.content.childMarkdownRemark.excerpt} <Link
                      to={ "/blog/" + entry.node.slug }            
                    >
                      Weiterlesen
                    </Link></p>
                  </div>
                )
              })}
            </div>
          </div>
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
            blog_post: {
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
            edges {
                node {
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
        more: allContentfulBlogPost(
          filter: {
            node_locale: {
              eq: "de"
            }, 
            blog_post: {
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
            edges {
                node {
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
    }
`