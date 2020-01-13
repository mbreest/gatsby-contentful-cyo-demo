import React from "react"
import {Link } from 'gatsby';
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Img from "gatsby-image";
import contentElementStyles from "./bloggrid.module.css"

function BlogGrid({ title, blogPosts, type }) {  
  var className = contentElementStyles.bloggrid;
  if (type === "simple") {
    var className = contentElementStyles.bloggridsimple;
  }

  if (contentElementStyles.bloggrid) {    
      if (blogPosts && blogPosts.length % 3 > 0) {
        var x = (blogPosts.length - (blogPosts.length % 3) + 3) - blogPosts.length;
        for (var i = 0; i <= x; i++) {
            blogPosts.push({});
        }
      }
  }
  if (blogPosts) {
    return (   
        <div className={className}>        
            {title && <h2>{title}</h2>}
            <div>
            {blogPosts && blogPosts.map( (entry) => {                        
                if (entry.slug) {            
                    return (        
                      <div>
                           <Link to={ "/blog/" + entry.slug + "/"}>
                          <Img fluid={entry.bannerImage.fluid}  />                    
                          <p className={contentElementStyles.headline}>{entry.title}{" "}</p>
                        </Link>
                        {entry.author && <p><span className={contentElementStyles.date}>{entry.published}</span> | <Link to={"/blog/autor/" + entry.author.short + "/"}>{entry.author.name}</Link></p>}
                        {!entry.author && <p><span className={contentElementStyles.date}>{entry.published}</span></p>}
                          
                        {entry.content && <p>{entry.content.childMarkdownRemark.excerpt} <Link
                          to={ "/blog/" + entry.slug + "/" }            
                        >
                          Weiterlesen
                        </Link></p>}                    
                      </div>
                    )
                } else {
                    return (<div></div>)
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