import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"

export default (props) => {     
    return (
      <Layout>
        <div>
          <div>
          <h1
            css={css`
              display: inline-block;              
            `}
          >
            Homepage
          </h1>
          <p>Homepage ...</p>                              
          </div>                    
        </div>
      </Layout>
    )
  }