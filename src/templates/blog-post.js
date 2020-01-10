import React from 'react';
import {Link, graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from "../components/layout-blog"
import SEO from "../components/seo"
import { css } from "@emotion/core" 
import ContentElementText from "../components/contentelementtext"
import ContentElementLinkGallery from "../components/contentelementlinkgallery"

export default ({ data }) => {    
  const { title, published, bannerImage, content, contentElements, author, relatedBlogPosts } = data.contentfulBlogPost
  const { html, excerpt } = content.childMarkdownRemark 
  const { name, short } = author 
  return (
    <Layout>
      <SEO title={title} description={excerpt} />
      <div>
        <h1>{title}</h1>
        <p>{published} | <Link to={"/blog/autor/" + short + "/"}>{name}</Link></p>
        <div>
          <Img fluid={bannerImage.fluid} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />  
        {(contentElements || []).map( (node) => {
          switch (node.internal.type) {
            case "ContentfulContentElementText":
                return (
                  <ContentElementText html={node.text.childMarkdownRemark.html }/>
                )
            case "ContentfulContentElementLinkGallery":
                return (
                  <ContentElementLinkGallery links={node.links }/>                  
                )
            default:
                return (
                  <div/>              
                )            
          }          
        }        
        )}      
      </div>
      <div css={css`
        clear: left;            
        `}>
        <h1>Mehr für Dich</h1>
        {(relatedBlogPosts || []).map( (node) => (        
            <div key={node.id} css={css`
            float: left; width:300px; padding: 24px 12px 12px 0px;            
            `}>
              <Link
                to={ "/blog/" + node.slug + "/" }                
              >                
                <Img fluid={node.bannerImage.fluid} />
                <p>{node.title}</p>
              </Link>              
            </div>
          ))}
      </div>

    </Layout>
  )
}

export const query = graphql`
    query blogPostQuery($slug: String!){
        contentfulBlogPost(slug: {eq: $slug}) {
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
                    html
                    excerpt
                }
            }
            contentElements {
              ... on ContentfulContentElementLinkGallery {
                id
                name
                links {
                  image {
                    fluid(maxHeight: 200, maxWidth: 300, quality: 80, resizingBehavior: THUMB, cropFocus: CENTER) {
                      aspectRatio
                      sizes
                      src
                      srcSet
                      srcSetWebp
                    }
                    title
                  }
                  url
                  title
                }
                internal {
                  type
                }
              }
              ... on ContentfulContentElementText {
                id
                name
                text {
                  childMarkdownRemark {
                    html
                  }
                }
                internal {
                  type
                }
              }
            }
            author {
              name
              short
            }
            relatedBlogPosts {
              id
              slug
              title
              bannerImage {
                fluid(maxHeight: 200, maxWidth: 300, quality: 80, resizingBehavior: THUMB, cropFocus: CENTER) {                  
                  aspectRatio
                  sizes
                  src
                  srcSet   
                  srcSetWebp
                }
              }
            }
        }
    }
`