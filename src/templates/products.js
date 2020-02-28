import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"

import ProductGrid from "../components/productgrid"

export default ({ data, location }) => {      
  return (
    <Layout page={{slug: data.contentfulPage.short, name: data.contentfulPage.name}}>
        <SEO title={data.contentfulPage.name} description={data.contentfulPage.description} />
        <div>
          <ProductGrid location={location}/>
        </div>
    </Layout>
  )
}

export const query = graphql`
    query allCatalogProductsQuery {      
      contentfulPage(key: {eq: "products"}, node_locale: {eq: "de"}) {
        short     
        name
        description
      }
    }
`