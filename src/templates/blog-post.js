import React from 'react';
import {Link, graphql } from 'gatsby';
import Img from "gatsby-image";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementLinkGallery from "../components/contentelementlinkgallery"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"
import BlogText from "../components/blogtext"
import BlogCategories from "../components/blogcategories"

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import { getFluidImage } from '../utils/cloudinary.js'

var count = 0;

const options = {
  renderNode: {    
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {     
      let language = "de"
      switch (node.data.target.sys.contentType.sys.id) {
        case "linkGallery":
          return <ContentElementLinkGallery key={"bpce" + (count++)} links={node.data.target.fields.links } language={language}/>                  
        case "image":
          let desc = "";
          if (node.data.target.fields.description) {
            desc = node.data.target.fields.description[language];
          }          
          return <Img fluid={getFluidImage({source: node.data.target.fields.image[language][0], max: 1200, breakpoints: [400,800,1200]})} title={node.data.target.fields.title[language]} alt={desc}/>
        case "video":
          let src = node.data.target.fields.video[language];
          if (src.startsWith("https://youtu.be")) {            
            return <iframe title={node.data.target.fields.title[language]} width="100%" height="400" src={"https://www.youtube.com/embed/" + src.split("/").pop()} frameborder="0" allowfullscreen></iframe>          
          } else {
            return <></>
          }       
        default:
          return <></>
      }     
    }
  }
};

export default ({ data }) => {    
  var { title, slug, published, bannerImage, content, author, categories, relatedBlogPosts } = data.contentfulBlogPost
  const { name, short } = author 

  if (Array.isArray(bannerImage) && bannerImage.length > 0) {
    bannerImage = bannerImage[0];        
  }
  
  return (
    <Layout type="blog" page={{name: title, slug: "/blog/" + slug + "/"}}>
      <SEO title={title} description={""} />      
      <div>
        <div>
          <Img fluid={bannerImage.fluid}/>
        </div>
        <BlogHeader title={title}>       
          <p>{published} | <Link to={"/blog/autor/" + short + "/"}>{name}</Link></p>
          {categories && categories.length > 0 && <BlogCategories title="Kategorien" categories={categories}/>}
        </BlogHeader>
                
        {content && content.json && <BlogText>{documentToReactComponents(content.json, options)}</BlogText>}                       
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
              fluid(maxWidth: 1200, sizes: "400,800,1200", aspectRatio: 2) {
                aspectRatio
                src
                srcSet
                sizes
              } 
            }          
            content {
              json
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
                fluid(maxWidth: 350, sizes: "350", crop: "thumb", gravity: "center", aspectRatio: 2) {                  
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
