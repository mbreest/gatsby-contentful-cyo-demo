import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductImage from "../components/productimage"
import ProductDetails from "../components/productdetails"

export default ({ data }) => {      
  var category = null;
  if (data.contentfulCatalogProduct.contentfulparent) {
    category = {slug: data.contentfulCatalogProduct.contentfulparent.slug, name: data.contentfulCatalogProduct.contentfulparent.name};
  }

  return (
    <Layout page={{slug: "detail/" + data.contentfulCatalogProduct.slug, name: data.contentfulCatalogProduct.name}} category={category}>
      <SEO title={data.contentfulCatalogProduct.name} description={data.contentfulCatalogProduct.description.childMarkdownRemark.html} />            
      <ProductImage product={data.contentfulCatalogProduct}/>      
      <ProductDetails product={data.contentfulCatalogProduct}/>      
    </Layout>
  )
}

export const query = graphql`
    query catalogProductQuery($slug: String!){       
      contentfulCatalogProduct(slug: {eq: $slug}) {             
        name
        slug
        mainImage(size: 450, backgroundColor: "f2f2f2")
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