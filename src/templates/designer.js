import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Designer from "../components/designer"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"

export default ({ pageContext: { page, locale, menu, submenu, breadcrumb }}) => {  
  const name = page.fields.name[locale];
  const slug = page.fields.slug[locale];
  const description = page.fields.description[locale];
  
  const mod = " mobilehide";

  return (
    <Layout page={{slug: slug, name: name}} mod={mod}>                        
        <SEO title={name} description={description} />  
        <Menu type="main" menuItems={menu} mod={mod}/>                          
        {submenu && <Menu type="sub" menuItems={submenu} mod={mod}/> }            
        <Breadcrumb links={breadcrumb} mod={mod}/>      
        <div>
          <Designer/>
        </div>
    </Layout>
  )
}