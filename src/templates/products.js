import React from 'react';
import {graphql, Link } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"

import ProductGrid from "../components/productgrid"

export default ({ data }) => {      
  return (
    <Layout page={{slug: "produkte", name: "Produkte"}}>
        <SEO title="Produkte" description="Produkte" />
        <div>
          <ProductGrid products={data.allContentfulCatalogProduct.edges}/>
        </div>
    </Layout>
  )
}

export const query = graphql`
    query allCatalogProductsQuery {
      allContentfulCatalogProduct (filter: {active: {eq: true}}, sort: {order: ASC, fields: index}, limit: 1000) {
        edges {
            node {
                name                    
                slug
                contentfulid
            }
        }
      }
    }
`