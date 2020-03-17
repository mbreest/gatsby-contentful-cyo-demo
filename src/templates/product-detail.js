import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductImage from "../components/productimage"
import ProductDetails from "../components/productdetails"

export default ({ data }) => {      
  var category = null;
  if (data.contentfulCatalogProduct.category) {
    category = {slug: data.contentfulCatalogProduct.category.slug, name: data.contentfulCatalogProduct.category.name};
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
      contentfulCatalogProduct(slug: {eq: $slug}, node_locale: {eq: "de"}) {             
        name
        slug
        views
        defaultValues {
          view
          color
        }
        sizes {
          name
        }
        colors {
          name
          hex
          id
        }
        available
        description {
          childMarkdownRemark {
            html
          }
        }
        productTypeId
        category {
          slug
          name
        }
      }
    }
`