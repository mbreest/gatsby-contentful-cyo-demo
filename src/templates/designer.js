import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Breadcrumb from "../components/breadcrumb"
import Helmet from 'react-helmet';
import Designer from "../components/designer"

export default () => {  
  var links = [{"url": "/", "title": "Home"}, {"url": "/selbst-gestalten/", "title": "Selbst gestalten"}]  
  return (
    <Layout>                        
        <SEO title="Selbst gestalten" description="Selbst gestalten" />        
        <Breadcrumb links={links}/>
        <div>
          <div>
          <h1
            css={css`
              display: inline-block;              
            `}
          >
            Selbst gestalten
          </h1>     
          <Designer/>
          </div>              
        </div>
    </Layout>
  )
}