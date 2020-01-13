import React from 'react';
import {Link, graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementText from "../components/contentelementtext"
import ContentElementLinkGallery from "../components/contentelementlinkgallery"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"
import BlogText from "../components/blogtext"
import BlogCategories from "../components/blogcategories"

export default ({ data }) => {    
  const { title, slug, published, bannerImage, content, contentElements, author, categories, relatedBlogPosts } = data.contentfulBlogPost
  const { html, excerpt } = content.childMarkdownRemark 
  const { name, short } = author 
  return (
    <Layout type="blog" page={{name: title, slug: "/blog/" + slug + "/"}}>
      <SEO title={title} description={excerpt} />      
      <div>
        <div>
          <Img fluid={bannerImage.fluid}/>
        </div>
        <BlogHeader title={title}>       
          <p>{published} | <Link to={"/blog/autor/" + short + "/"}>{name}</Link></p>
          {categories && categories.length > 0 && <BlogCategories title="Kategorien" categories={categories}/>}
        </BlogHeader>
        
        <BlogText>
          <div dangerouslySetInnerHTML={{ __html: html }} />  
        </BlogText>        
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
      <BlogGrid title="Mehr für Dich" blogPosts={relatedBlogPosts}/>
    </Layout>
  )
}

export const query = graphql`
    query blogPostQuery($slug: String!){
        contentfulBlogPost(slug: {eq: $slug}) {
            title
            slug
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
                  title
                  image {
                    fluid(maxHeight: 400, maxWidth: 600, quality: 80, resizingBehavior: THUMB, cropFocus: CENTER) {
                      aspectRatio
                      sizes
                      src
                      srcSet
                      srcSetWebp
                    }
                  }
                  productId
                  viewId                                    
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
                fluid(maxHeight: 200, maxWidth: 350, quality: 80, resizingBehavior: THUMB, cropFocus: CENTER) {                  
                  aspectRatio
                  sizes
                  src
                  srcSet   
                  srcSetWebp
                }
              }
            }
            categories {
              name
              short
            }
        }
    }
`