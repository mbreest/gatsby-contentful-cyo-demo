import React from "react"
import {Link} from 'gatsby';
import contentElementStyles from "./contentelementcategorynavigationhero.module.css"
import Img from "gatsby-image";

const fluid = require('../utils/cloudinary.js').getFluidImage

function ContentElementCategoryNavigationHero({ highlight, data, locale}) {   
    const title = data.fields.title ? data.fields.title[locale] : null;
    const categories = data.fields.categories ? data.fields.categories[locale] : null;

    var count = 0;
  
    var className = contentElementStyles.cecategorynavigationhero; 
    if (highlight === "yes") {
        className += " highlight";
    }

    return (      
        <div className={className}>
            <h2>{title}</h2>
            <div key="categories">    
            {(categories).map( (category) => { 
                const categoryTitle = category.fields.category[locale].fields.name[locale];
                const categorySlug = category.fields.category[locale].fields.slug[locale];
                
                const categoryImg = category.fields.image ? fluid({source: category.fields.image[locale].fields.image[locale][0], aspectRatio: 2, max: 600, breakpoints: [300, 600]}) : null;               
                const categoryImgTitle = category.fields.image && category.fields.image[locale].fields.title ? category.fields.image[locale].fields.title[locale] : null;
                const categoryImgDescription = category.fields.image && category.fields.image[locale].fields.description ? category.fields.image[locale].fields.description[locale] : null;

                return (
                    <div key={"pnitem" + (count++)}>                    
                        <Link to={"/" + categorySlug + "/"}>
                            {categoryImg && <Img fluid={categoryImg} title={categoryImgTitle} alt={categoryImgDescription}/>}    
                            <p>{categoryTitle}</p>
                        </Link>
                    </div>
                )  
            }          
            )}
            </div>
        </div>  
    )  
}
export default ContentElementCategoryNavigationHero