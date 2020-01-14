import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

import ProductGrid from "../components/productgrid"

export default ({ data }) => {      
  return (
    <Layout page={{slug: "produkte", name: "Produkte"}}>
        <SEO title="Produkte" description="Produkte" />
        <div>
          <ProductGrid products={data.allContentfulCatalogProduct.nodes}/>
        </div>
    </Layout>
  )
}

export const query = graphql`
    query allCatalogProductsQuery {
      allContentfulCatalogProduct (filter: {active: {eq: true}}, sort: {order: ASC, fields: index}, limit: 1000) {
        nodes {
          name                    
          slug
          contentfulid
        }
      }
    }
`