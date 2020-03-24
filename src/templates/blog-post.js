import React from 'react';
import {Link } from 'gatsby';
import Img from "gatsby-image";
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementLinkGallery from "../components/contentelementlinkgallery"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"
import BlogText from "../components/blogtext"
import BlogCategories from "../components/blogcategories"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"

import { BLOCKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const fluid = require('../utils/cloudinary.js').getFluidImage

var count = 0;

export default ({ pageContext: { blogPost, locale, designerPath, menu, submenu, breadcrumb } }) => { 
  const title = blogPost.fields.title[locale];
  const slug = blogPost.fields.slug[locale];
  const publishedDate = new Date(Date.parse(blogPost.fields.published[locale]));              
  const published = `${publishedDate.getUTCDate()}.${publishedDate.getUTCMonth()+1}.${publishedDate.getUTCFullYear()}`;
  const hero = fluid({source: blogPost.fields.hero[locale].fields.image[locale][0], max: 1200, aspectRatio: 2, breakpoints: [1200,800,400]})
  const heroTitle = blogPost.fields.hero[locale].fields.title[locale];
  const content = blogPost.fields.content[locale]
  const authorName = blogPost.fields.author[locale] ? blogPost.fields.author[locale].fields.name[locale] : null;
  const authorSlug = blogPost.fields.author[locale] ? blogPost.fields.author[locale].fields.slug[locale] : null;
  const categories = blogPost.fields.categories[locale];
  const relatedBlogPosts = blogPost.fields.relatedBlogPosts ? blogPost.fields.relatedBlogPosts[locale] : null;

  const options = {
    renderNode: {    
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {     
        switch (node.data.target.sys.contentType.sys.id) {
          case "linkGallery":
            return <ContentElementLinkGallery key={"bpce" + (count++)} links={node.data.target.fields.links[locale] } locale={locale} designerPath={designerPath}/>                  
          case "image":
            let imgTitle = node.data.target.fields.title[locale]
            let imgDesc = "description" in node.data.target.fields && locale in node.data.target.fields.description ? node.data.target.fields.description[locale] : "";            
            let img = node.data.target.fields.image[locale][0];
            return <Img fluid={fluid({source: img, max: 1200, breakpoints: [400,800,1200]})} title={imgTitle} alt={imgDesc}/>
          case "video":
            let videoTitle = node.data.target.fields.title[locale];
            let videoSrc = node.data.target.fields.video[locale];
            if (videoSrc.startsWith("https://youtu.be")) {            
              return <iframe title={videoTitle} width="100%" height="400" src={"https://www.youtube.com/embed/" + videoSrc.split("/").pop()} frameBorder="0" allowFullScreen></iframe>          
            } else {
              return <></>
            }       
          default:
            return <></>
        }     
      }
    }
  };

  const relatedBlogImgOptions = {
    max: 350, 
    aspectRatio: 2, 
    breakpoints: [350],
    crop: "thumb",
    gravity: "center"
  }

  return (
    <Layout type="blog" page={{name: title, slug: "/blog/" + slug + "/"}}>
      <SEO title={title} description={""} />      
      <Menu type="main" menuItems={menu}/>                          
      {submenu && <Menu type="sub" menuItems={submenu}/> }            
      <Breadcrumb links={breadcrumb}/>
      <div>
        <div>
          <Img fluid={hero} title={heroTitle}/>
        </div>
        <BlogHeader title={title}>       
          <p>{published} | <Link to={"/blog/autor/" + authorSlug + "/"}>{authorName}</Link></p>
          {categories && categories.length > 0 && <BlogCategories title="Kategorien" categories={categories} locale={locale}/>}
        </BlogHeader>
                
        {content && <BlogText>{documentToReactComponents(content, options)}</BlogText>}                       
      </div>
      <BlogGrid title="Mehr für Dich" blogPosts={relatedBlogPosts} locale={locale} imgOptions={relatedBlogImgOptions}/>
    </Layout>
  )
}
