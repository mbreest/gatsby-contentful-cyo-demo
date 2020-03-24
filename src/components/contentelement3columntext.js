import React from "react"
import contentElementStyles from "./contentelement3columntext.module.css"

function ContentElement3ColumnText({ data, locale, highlight }) {  
  const title = data.fields.title ? data.fields.title[locale] : null;
  const headline1 = data.fields.headline1 ? data.fields.headline1[locale] : null;
  const text1 = data.fields.text1 ? data.fields.text1[locale] : null;
  const headline2 = data.fields.headline2 ? data.fields.headline2[locale] : null;
  const text2 = data.fields.text2 ? data.fields.text2[locale] : null;  
  const headline3 = data.fields.headline3 ? data.fields.headline3[locale] : null;
  const text3 = data.fields.text3 ? data.fields.text3[locale] : null;
  
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
                <div dangerouslySetInnerHTML={{ __html: text1 }} />  
            </div>
            {text2 && <div>
                <h3>{headline2}</h3>
                <div dangerouslySetInnerHTML={{ __html: text2 }} />  
            </div>}
            {text3 && <div>
                <h3>{headline3}</h3>
                <div dangerouslySetInnerHTML={{ __html: text3 }} />  
            </div>}
        </div>
    </div>    
  )
}
export default ContentElement3ColumnText