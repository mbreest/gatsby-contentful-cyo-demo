import React from "react"
import { Link } from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigationicon.module.css"
import Img from "gatsby-image";

const fluid = require('../utils/cloudinary.js').getFluidImage

function ContentElementCategoryNavigation({ highlight, data, locale, topCategories }) {   
    const title = data.fields.title[locale];
    const highlightedCategories = data.fields.highlightedCategories ? data.fields.highlightedCategories[locale] : null;
    const categories = data.fields.categories ? data.fields.categories[locale] : topCategories;
    
    var count = 0;  
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
                var categoryTitle = category.fields.category && category.fields.category[locale].fields.name ? category.fields.category[locale].fields.name[locale] : null;
                var categorySlug = category.fields.category && category.fields.category[locale].fields.slug? category.fields.category[locale].fields.slug[locale] : null;
                var categoryImage = category.fields.image ? fluid({source: category.fields.image[locale].fields.image[locale][0], aspectRatio: 1, max: 600, breakpoints: [300, 600]}) : null;   
                var categoryImageTitle = category.fields.image && category.fields.image[locale].fields.title ? category.fields.image[locale].fields.title[locale] : null;
                var categoryImageDescription = category.fields.image && category.fields.image[locale].fields.description ? category.fields.image[locale].fields.description[locale] : null;

                return (
                <div  key={"pnitem" + (count++)} className={contentElementStyles.highlightedclass}>                    
                    <Link to={"/" + categorySlug + "/"}>
                        <div className={highlightedCategoryClassName}>
                            <div className={contentElementStyles.highlightedlink}>{categoryTitle}</div>
                            <div>
                                {categoryImage &&  <Img fluid={categoryImage} title={categoryImageTitle} alt={categoryImageDescription}/>}    
                            </div>                                
                        </div>                                                      
                    </Link>
                </div>
                )            
            })}    
            </div>
            <div key="categories">    
            {(categories).map( (category) => { 
                var categoryTitle = category.fields.category && category.fields.category[locale].fields.name ? category.fields.category[locale].fields.name[locale] : null;
                var categorySlug = category.fields.category && category.fields.category[locale].fields.slug? category.fields.category[locale].fields.slug[locale] : null;
                var categoryImage = category.fields.image ? fluid({source: category.fields.image[locale].fields.image[locale][0], aspectRatio: 1, max: 600, breakpoints: [300, 600]}) : null;   
                var categoryImageTitle = category.fields.image && category.fields.image[locale].fields.title ? category.fields.image[locale].fields.title[locale] : null;
                var categoryImageDescription = category.fields.image && category.fields.image[locale].fields.description ? category.fields.image[locale].fields.description[locale] : null;

                return (
                <div  key={"pnitem" + (count++)} className={contentElementStyles.defaultclass}>                    
                    <Link to={"/" + categorySlug + "/"}>
                        <div className={categoryClassName}>
                            {categoryImage &&  <Img fluid={categoryImage} title={categoryImageTitle} alt={categoryImageDescription}/>}    
                        </div>             
                        <div className={contentElementStyles.defaultlink}>{categoryTitle}</div>
                    </Link>
                </div>
                )            
            })}
            </div>
        </div>
    )  
  
}
export default ContentElementCategoryNavigation