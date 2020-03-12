import React from "react"
import {graphql, Link} from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigation.module.css"
import Img from "gatsby-image";

function ContentElementCategoryNavigation({ highlight, title, useHero, useIcon, highlightedCategories, categories }) {   
  var count = 0;
  if (useHero) {
    let className = contentElementStyles.cecategorynavigationhero; 
    if (highlight === "yes") {
        className += " highlight";
    }
    
    return (      
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => { 
                var image = category.image;                
                if (Array.isArray(image.image) && image.image.length > 0) {
                    image.image = image.image[0];                    
                }

                return (
                <div key={"pnitem" + (count++)}>                    
                    <Link to={"/" + category.category.slug + "/"}>
                          {image && image.image && <Img fluid={image.image.fluid} title={image.title} alt={image.description}/>}    
                          <p>{category.title}</p>
                    </Link>
                </div>
                )  
            }          
            )}
            </div>
        </div>  
      )
  } else if (useIcon) {
        let className = contentElementStyles.cecategorynavigationicon; 
        if (highlight === "yes") {
            className += " highlight";
        }        

        let highlightedCategoryClassName = contentElementStyles.cecategorynavigationhighlightedcategory; 
        let categoryClassName = contentElementStyles.cecategorynavigationcategory; 
        return (
            <div className={className}>
                <h2>{title}</h2>
                <div key="highlightedCategories">
                {highlightedCategories && (highlightedCategories).map( (category) => { 
                    var image = category.image;
                    if (image && image.image && Array.isArray(image.image) && image.image.length > 0) {
                        image.image = image.image[0];                        
                    }

                    return (
                    <div  key={"pnitem" + (count++)} className={contentElementStyles.highlightedclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={highlightedCategoryClassName}>
                                <div className={contentElementStyles.highlightedlink}>{category.title}</div>
                                <div>
                                    {image && image.image && <Img fluid={image.image.fluid} title={image.title} alt={image.description}/>}    
                                </div>                                
                            </div>                                                      
                        </Link>
                    </div>
                    )            
                })}    
                </div>
                <div key="categories">    
                {(categories).map( (category) => { 
                    var image = category.image;
                    if (image && image.image && Array.isArray(image.image) && image.image.length > 0) {
                        image.image = image.image[0];                        
                    }

                    return (
                    <div  key={"pnitem" + (count++)} className={contentElementStyles.defaultclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={categoryClassName}>
                                {image && image.image && <Img fluid={image.image.fluid} title={image.title} alt={image.description}/>}    
                            </div>             
                            <div className={contentElementStyles.defaultlink}>{category.title}</div>
                        </Link>
                    </div>
                    )            
                })}
                </div>
            </div>
        )
  } else {
    let className = contentElementStyles.cecategorynavigation; 
    if (highlight === "yes") {
        className += " highlight";
    }    
    return (
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => {            
                var slug = null;
                var title = null;
                if (category.category) {
                    slug = category.category.slug;                    
                    title = category.title;
                } else {
                    slug = category.slug;
                    title = category.name;
                }                                
                return (
                <div key={"pnitem" + (count++)}>                    
                    <Link to={"/" + slug + "/"}>
                        <div>
                            {title}
                        </div>                          
                    </Link>
                </div>
                )      
            })}
            </div>
        </div>
    )
  }
  
}
export default ContentElementCategoryNavigation

export const categoryNavigationIconFields = graphql`
    fragment CategoryNavigationIconFields on ContentfulCategoryNavigationIcon {
        id
        title         
        generated       
        highlightedCategories {
            title
            image {
              title
              description
              image {
                fluid(maxWidth: 600, sizes: "300,600", aspectRatio: 1) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            category {
                name
                slug                                             
            }
        }
        categories {
            title
            image {
              title
              description
              image {
                fluid(maxWidth: 600, sizes: "300,600", aspectRatio: 1) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            category {
                name
                slug                               
            }
        }
        useIcon  
    }
`

export const categoryNavigationHeroFields = graphql`
    fragment CategoryNavigationHeroFields on ContentfulCategoryNavigationHero {
        id
        title                 
        categories {
            title
            image {
              title
              description
              image {
                fluid(maxWidth: 600, sizes: "300,600", aspectRatio: 2) {
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
            category {
                name
                slug                               
            }
        }
    }
`