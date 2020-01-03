import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
import Img from "gatsby-image";

export default (props) => {     
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
          {props.data.default.edges.map( (data) => {                        
              return (        
                <div key={data.node.id}
                      css={css`
                float: left; width:33%; height:420px; padding: 24px 12px 12px 0px;            
                `}>
                  <Link
                    to={ "/blog/" + data.node.slug }
                    css={css`
                      text-decoration: none;
                      color: inherit;
                    `}
                  >
                    <Img fluid={data.node.bannerImage.fluid}  />
                  </Link>
                  <Link
                    to={ "/blog/" + data.node.slug }
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
                        {data.node.title}{" "}                                       
                    </h3>
                  </Link>
                  <p>{data.node.published} | <Link to={"/blog/authors/" + data.node.author.short}>{data.node.author.name}</Link></p>
                    
                  <p>{data.node.content.childMarkdownRemark.excerpt} <Link
                    to={ "/blog/" + data.node.slug }            
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
          {props.data.more.edges.map( (data) => {            
              return (        
                <div key={data.node.id}
                      css={css`
                float: left; width:33%; height:420px; padding: 24px 12px 12px 0px;            
                `}>
                  <Link
                    to={ "/blog/" + data.node.slug }
                    css={css`
                      text-decoration: none;
                      color: inherit;
                    `}
                  >
                    <Img fluid={data.node.bannerImage.fluid}  />
                  </Link>
                  <Link
                    to={ "/blog/" + data.node.slug }
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
                        {data.node.title}{" "}                                       
                    </h3>
                  </Link>
                  <p>{data.node.published} | <Link to={"/blog/authors/" + data.node.author.short}>{data.node.author.name}</Link></p>
                    
                  <p>{data.node.content.childMarkdownRemark.excerpt} <Link
                    to={ "/blog/" + data.node.slug }            
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
    query pageQuery {
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