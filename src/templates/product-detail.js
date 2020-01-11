import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductImage from "../components/productimage"
import ProductDetails from "../components/productdetails"

export default ({ data }) => {    
  const { name, slug, description, contentfulid, contentfulparent } = data.contentfulCatalogProduct

  var category = null;
  if (contentfulparent) {
    category = {slug: contentfulparent.slug, name: contentfulparent.name};
  }

  return (
    <Layout page={{slug: "detail/" + slug, name: name}} category={category}>
      <SEO title={name} description={description.childMarkdownRemark.html} />            
      <ProductImage title={name} id={contentfulid}/>      
      <ProductDetails title={name} text={description.childMarkdownRemark.html}/>      
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