import React from "react"
import { graphql } from 'gatsby';
import contentElementStyles from "./contentelementtext.module.css"

function ContentElementText({ html}) {  
  return (   
    <div className={contentElementStyles.text}>
      <div dangerouslySetInnerHTML={{ __html: html }} />  
    </div>    
  )
}
export default ContentElementText

export const textFields = graphql`
  fragment TextFields on ContentfulContentElementText {
    id
    name
    text {
      childMarkdownRemark {
        html
      }
    }
  }
`

