import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"
import ProductGrid from "../components/productgrid"

export default ({ pageContext: {page, locale, menu, submenu, breadcrumb}, location }) => {      
  const name = page.fields.name[locale];
  const slug = page.fields.slug[locale];
  const description = page.fields.description[locale];
  
  return (
    <Layout page={{slug: slug, name: name}}>
        <SEO title={name} description={description} />
        <Menu type="main" menuItems={menu}/>                          
        {submenu && <Menu type="sub" menuItems={submenu}/> }            
        <Breadcrumb links={breadcrumb}/>
        <div>
          <ProductGrid location={location}/>
        </div>
    </Layout>
  )
}