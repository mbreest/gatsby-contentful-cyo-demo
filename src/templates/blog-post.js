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
  var { title, slug, published, bannerImage, content, contentElements, author, categories, relatedBlogPosts } = data.contentfulBlogPost
  const { html, excerpt } = content.childMarkdownRemark 
  const { name, short } = author 

  if (Array.isArray(bannerImage) && bannerImage.length > 0) {
    bannerImage = bannerImage[0];        
  }

  var count = 0;
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
                  <ContentElementText key={"bpce" + (count++)} html={node.text.childMarkdownRemark.html }/>
                )
            case "ContentfulContentElementLinkGallery":
                return (
                  <ContentElementLinkGallery key={"bpce" + (count++)} links={node.links }/>                  
                )        
            default:
                return (
                  <div key={"bpce" + (count++)}/>              
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
        contentfulBlogPost(slug: {eq: $slug}, node_locale: {eq: "de"}) {
            title
            slug
            published(formatString: "MMMM DD, YYYY")          
            bannerImage {
              fluid(maxWidth: 1200, sizes: "400,800,1200") {
                aspectRatio
                src
                srcSet
                sizes
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
                ...LinkGalleryFields
                internal {
                  type
                }
              }
              ... on ContentfulContentElementText {
                ...TextFields
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
                fluid(maxWidth: 350, sizes: "350", crop: "thumb", gravity: "center") {                  
                  aspectRatio
                  src
                  srcSet
                  sizes
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
