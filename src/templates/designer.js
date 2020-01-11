import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Designer from "../components/designer"

export default () => {  
  return (
    <Layout page={{slug: "selbst-gestalten", name: "Selbst gestalten"}}>                        
        <SEO title="Selbst gestalten" description="Selbst gestalten" />        
        <div>
          <div>        
          <Designer/>
          </div>              
        </div>
    </Layout>
  )
}