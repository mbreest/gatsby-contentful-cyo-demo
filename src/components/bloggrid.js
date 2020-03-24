import React from "react"
import {Link} from "gatsby";
import Img from "gatsby-image";
import contentElementStyles from "./bloggrid.module.css"
const fluid = require('../utils/cloudinary.js').getFluidImage

function BlogGrid({ title, blogPosts, type, locale, imgOptions}) {    
  var className = contentElementStyles.bloggrid;
  if (type === "simple") {
    className = contentElementStyles.bloggridsimple;
  }

  if (contentElementStyles.bloggrid) {        
    if (blogPosts && blogPosts.length % 3 > 0) {
      blogPosts = blogPosts.slice()
      var x = (blogPosts.length - (blogPosts.length % 3) + 3) - blogPosts.length;
      for (var i = 0; i <= x; i++) {
          blogPosts.push({});
      }
    }
  }  

  imgOptions = imgOptions ? imgOptions : {max: 1200, aspectRatio: 2, breakpoints: [1200,800,400]}

  if (blogPosts) {
    var count = 0;
    return (   
        <div className={className}>        
            {title && <h2>{title}</h2>}
            <div>
            {blogPosts && blogPosts.map( (entry) => {
              if ("fields" in entry) {
                const title = entry.fields.title[locale];
                const slug = entry.fields.slug[locale];
                const hero = fluid(Object.assign({source: entry.fields.hero[locale].fields.image[locale][0]}, imgOptions));
                const heroTitle = entry.fields.hero[locale].fields.title[locale];
                const publishedDate = "published" in entry.fields ? new Date(Date.parse(entry.fields.published[locale])) : null;              
                const published = publishedDate ? `${publishedDate.getUTCDate()}.${publishedDate.getUTCMonth()+1}.${publishedDate.getUTCFullYear()}` : null;
                const description = "excerpt" in entry.fields ? entry.fields.excerpt[locale] : "";
                const authorName = "author" in entry.fields ? entry.fields.author[locale].fields.name[locale] : null;
                const authorSlug = "author" in entry.fields ? entry.fields.author[locale].fields.slug[locale] : null;
  
                return (        
                  <div key={"bpitem" + (count++)}>
                    <Link to={ "/blog/" + slug + "/"}>                          
                      <Img fluid={hero} title={heroTitle}/>                    
                      <p className={contentElementStyles.headline}>{title}{" "}</p>
                    </Link>
                    {authorName && <p><span className={contentElementStyles.date}>{published}</span> | <Link to={"/blog/autor/" + authorSlug + "/"}>{authorName}</Link></p>}
                    {!authorName && <p><span className={contentElementStyles.date}>{published}</span></p>}                    
                    {description && <p>{description} <Link to={ "/blog/" + slug + "/" }>Weiterlesen</Link></p>}                    
                  </div>
                )    
              } else {
                return (<div key={"bpitem" + (count++)}></div>)
              }
                          
            })}
            </div>
        </div>
      )
  } else {
      return (
          <div></div>
      );
  }
  
}
export default BlogGrid
