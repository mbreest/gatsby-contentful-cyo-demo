import React from "react"
import {Link} from 'gatsby';
import {imageServerUrl} from "./imageserver"
import contentElementStyles from "./contentelementproductlist.module.css"
import Img from "gatsby-image";
import ActionButton from "./actionbutton"

function ContentElementProductList({ highlight, data, locale, topProducts }) {  
  const title = data.fields.title[locale];
  const actionButton = data.fields.actionButton ? data.fields.actionButton[locale] : null;
  const products = data.fields.products ? data.fields.products[locale] : topProducts;  

  if (actionButton) {
    var actionTitle = actionButton.fields.title[locale];
    var actionLink = "/produkte/";
    if (actionButton.fields.query) {
      actionLink += "?query=" + actionButton.fields.query[locale];
    }
  }

  var className = contentElementStyles.ceproductlist;  
  if (highlight === "yes") {
      className += " highlight";
  }
  var count = 0;

  return (   
    <div className={className}>
        <h2>{title}</h2>
        <div>
          <ul>    
          {products && (products).map( (product) => {
            const name = product.fields.name[locale];
            const slug = product.fields.slug[locale];
            const ptId = product.fields.productTypeId[locale];
            const viewId = product.fields.defaultValues[locale].view;
            const colorId = product.fields.defaultValues[locale].color;
            const url = imageServerUrl(ptId, viewId, colorId, 150, "f2f2f2");
            const image = {
              aspectRatio: 1,
              src: url,
              srcSet: url + " 150w",
              sizes: "(max-width: 150px) 100vw, 150px"
            }

            return (
              <li key={"cepliitem" + (count++)}>
                <Link to={"/detail/" + slug + "/"}>
                <Img fluid={image}  alt={name}/>
                <p>{name}</p>
                </Link>
              </li>
            )
          })}
          </ul>
        </div>
        {actionButton && <div><ActionButton title={actionTitle} link={actionLink} hidden={true}/></div>}
    </div>
  )
}
export default ContentElementProductList