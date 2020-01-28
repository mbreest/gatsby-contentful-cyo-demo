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
                var hero = category.category.hero;
                if (Array.isArray(hero) && hero.length > 0) {
                    hero = hero[0];
                }

                return (
                <div key={"pnitem" + (count++)}>                    
                    <Link to={"/" + category.category.slug + "/"}>
                          {hero && <Img fluid={hero.fluid}/>}    
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
                {highlightedCategories && (highlightedCategories).map( (category) => { return (
                    <div  key={"pnitem" + (count++)} className={contentElementStyles.highlightedclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={highlightedCategoryClassName}>
                                <div className={contentElementStyles.highlightedlink}>{category.title}</div>
                                <div>
                                    {category.category.iconLarge && <Img fluid={category.category.iconLarge.fluid}/>}                                    
                                </div>                                
                            </div>                                                      
                        </Link>
                    </div>
                    )            
                })}    
                </div>
                <div key="categories">    
                {(categories).map( (category) => { return (
                    <div  key={"pnitem" + (count++)} className={contentElementStyles.defaultclass}>                    
                        <Link to={"/" + category.category.slug + "/"}>
                            <div className={categoryClassName}>
                                {category.category.icon && <Img fluid={category.category.icon.fluid}/>}                                
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

export const categoryNavigationFields = graphql`
    fragment CategoryNavigationFields on ContentfulContentElementCategoryNavigation {
        id
        title         
        generated       
        highlightedCategories {
            title
            category {
                name
                slug               
                hero {
                    fluid(maxWidth: 500, sizes: "250,500") {
                        aspectRatio
                        src
                        srcSet
                        sizes
                    }                    
                }
                iconLarge {
                    title
                    fluid(maxWidth: 500, quality: 80) {
                        ...GatsbyContentfulFluid_withWebp_noBase64
                    }
                }
            }
        }
        categories {
            title
            category {
                name
                slug                
                hero {
                    fluid(maxWidth: 500, sizes: "250,500") {
                        aspectRatio
                        src
                        srcSet
                        sizes
                    }                    
                }
                icon {
                    title
                    fluid(maxWidth: 300, quality: 80) {
                        ...GatsbyContentfulFluid_withWebp_noBase64
                    }
                }
            }
        }
        useHero
        useIcon  
    }
`