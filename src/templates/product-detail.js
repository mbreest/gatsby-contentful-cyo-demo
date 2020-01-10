import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import ActionButton from "../components/actionbutton"

export default ({ data }) => {    
  const { name, slug, description, contentfulid, contentfulparent } = data.contentfulCatalogProduct

  var category = null;
  if (contentfulparent) {
    category = {slug: contentfulparent.slug, name: contentfulparent.name};
  }

  return (
    <Layout page={{slug: "detail/" + slug, name: name}} category={category}>
      <SEO title={name} description={description.childMarkdownRemark.html} />      
      <div css={css`
        background-color: #f2f2f2; display: flex;
        `}>        
        <div css={css`
        flex: 50%;
        `}>
            <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + contentfulid + ",width=450,height=450,backgroundColor=f2f2f2.jpg" } alt={data.contentfulCatalogProduct.name}/>
        </div>
        <div css={css`
        flex: 50%; margin: 1em;
        `}>
          <h1>{name}</h1>                          
          <ActionButton title="Selbst gestalten" link={"/selbst-gestalten/?productType=" + contentfulid} full="yes" hidden={true}/> 
        </div>        
      </div>

      <div css={css`
        clear: left;
        `}>
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />  
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
        contentfulparent {
          slug
          name
        }
      }
    }
`