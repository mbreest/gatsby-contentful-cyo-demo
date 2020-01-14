import React from 'react';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Designer from "../components/designer"

export default ({data}) => {  
  return (
    <Layout page={{slug: data.contentfulPage.short, name: data.contentfulPage.name}}>                        
        <SEO title={data.contentfulPage.name} description={data.contentfulPage.description} />        
        <div>
          <Designer/>
        </div>
    </Layout>
  )
}

export const query = graphql`
  query designerQuery {
    contentfulPage(key: {eq: "designer"}) {
      short
      name
      description
    }
  }
`