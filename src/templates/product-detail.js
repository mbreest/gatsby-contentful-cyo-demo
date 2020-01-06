import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Breadcrumb from "../components/breadcrumb"
import ActionButton from "../components/actionbutton"

export default ({ data }) => {  
  var links = [{"url": "/", "title": "Home"}, {"url": "/produkte/", "title": "Produkte"}, {"url": "/detail/" + data.contentfulProductType.slug + "/", "title": data.contentfulProductType.name}]
  return (
    <Layout>
      <SEO title={data.contentfulProductType.name} description={data.contentfulProductType.description.childMarkdownRemark.html} />
      <Breadcrumb links={links}/>
      <div css={css`
        background-color: #e8e8e8; display: flex;
        `}>        
        <div css={css`
        flex: 50%;
        `}>
            <img src={ "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + data.contentfulProductType.contentfulid + ",width=450,height=450,backgroundColor=e8e8e8.jpg" } alt={data.contentfulProductType.name}/>
        </div>
        <div css={css`
        flex: 50%; margin: 1em;
        `}>
          <h1>{data.contentfulProductType.name}</h1>                          
          <ActionButton title="Selbst gestalten" link={"/selbst-gestalten/?productType=" + data.contentfulProductType.contentfulid}/> 
        </div>        
      </div>

      <div css={css`
        clear: left;
        `}>
        <h2>Produktdetails</h2>
        <div dangerouslySetInnerHTML={{ __html: data.contentfulProductType.description.childMarkdownRemark.html }} />  
      </div>
    </Layout>
  )
}

export const query = graphql`
    query productTypeQuery($slug: String!){       
      contentfulProductType(slug: {eq: $slug}) {             
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