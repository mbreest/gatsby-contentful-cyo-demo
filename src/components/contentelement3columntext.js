import React from "react"
import { graphql } from 'gatsby';
import contentElementStyles from "./contentelement3columntext.module.css"

function ContentElement3ColumnText({ highlight, title, headline1, text1, headline2, text2, headline3, text3 }) {  
  let className = contentElementStyles.ce3columntext;
  if (highlight === "yes") {
    className += " highlight";
  }  
  return (   
    <div className={className}>
        <h2>{title}</h2>        
        <div>
            <div>        
                <h3>{headline1}</h3>
                <div dangerouslySetInnerHTML={{ __html: text1.childMarkdownRemark.html }} />  
            </div>
            {text2 && <div>
                <h3>{headline2}</h3>
                <div dangerouslySetInnerHTML={{ __html: text2.childMarkdownRemark.html }} />  
            </div>}
            {text3 && <div>
                <h3>{headline3}</h3>
                <div dangerouslySetInnerHTML={{ __html: text3.childMarkdownRemark.html }} />  
            </div>}
        </div>
    </div>    
  )
}
export default ContentElement3ColumnText

export const threeColumnTextFields = graphql`
  fragment ThreeColumnTextFields on Contentful3ColumnText {
    headline1
    headline2
    headline3
    text1 {
      childMarkdownRemark {
        html
      }
    }
    text2 {
      childMarkdownRemark {
        html
      }
    }
    text3 {
      childMarkdownRemark {
        html
      }
    }
    title
  }
`