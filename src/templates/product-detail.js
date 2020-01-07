import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Breadcrumb from "../components/breadcrumb"
import ActionButton from "../components/actionbutton"

export default ({ data }) => {  
  var links = [{"url": "/", "title": "Home"}, {"url": "/produkte/", "title": "Produkte"}, {"url": "/detail/" + data.contentfulCatalogProduct.slug + "/", "title": data.contentfulCatalogProduct.name}]
  return (
    <Layout>
      <SEO title={data.contentfulCatalogProduct.name} description={data.contentfulCatalogProduct.description.childMarkdownRemark.html} />
      <Breadcrumb links={links}/>
      <div css={css`
        background-color: #f2f2f2; display: flex;
        `}>        
        <div css={css`
        flex: 50%;
        `}>
            <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + data.contentfulCatalogProduct.contentfulid + ",width=450,height=450,backgroundColor=f2f2f2.jpg" } alt={data.contentfulCatalogProduct.name}/>
        </div>
        <div css={css`
        flex: 50%; margin: 1em;
        `}>
          <h1>{data.contentfulCatalogProduct.name}</h1>                          
          <ActionButton title="Selbst gestalten" link={"/selbst-gestalten/?productType=" + data.contentfulCatalogProduct.contentfulid} full="yes"/> 
        </div>        
      </div>

      <div css={css`
        clear: left;
        `}>
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: data.contentfulCatalogProduct.description.childMarkdownRemark.html }} />  
      </div>
    </Layout>
  )
}

export const query = graphql`
    query catalogProductQuery($slug: String!){       
      contentfulCatalogProduct(slug: {eq: $slug}) {             
        name
        slug
        description {
          childMarkdownRemark {
            html
          }
        }
        contentfulid
      }
    }
`