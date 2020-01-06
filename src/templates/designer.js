import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import Breadcrumb from "../components/breadcrumb"

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
          <div width="100%" height="600px">
            <iframe id="sketchomat" css={css`border: 0px;`} width="100%" height="600px" src="https://designer.spreadshirt.de/designers/sketchomat?mode=external&amp;locale=de_DE"></iframe>
          </div>     
          </div>              
        </div>
    </Layout>
  )
}