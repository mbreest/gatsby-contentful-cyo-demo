import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductImage from "../components/productimage"
import ProductDetails from "../components/productdetails"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"

export default ({ pageContext: { catalogProduct, locale, designerPath, menu, submenu, breadcrumb } }) => {        
  const name = catalogProduct.fields.name[locale];
  const slug = catalogProduct.fields.slug[locale];
  const description = catalogProduct.fields.description ? catalogProduct.fields.description[locale] : null;
  const category = catalogProduct.fields.category ? {slug: catalogProduct.fields.category[locale].fields.slug[locale], name: catalogProduct.fields.category[locale].fields.name[locale]} : null;
  
  return (
    <Layout page={{slug: "detail/" + slug, name: name}} category={category}>
      <SEO title={name} description={description}  locale={locale}/>                  
      <Menu type="main" menuItems={menu}/>                          
      {submenu && <Menu type="sub" menuItems={submenu}/> }            
      <Breadcrumb links={breadcrumb}/>
      
      <ProductImage product={catalogProduct} locale={locale} designerPath={designerPath}/>   
      <ProductDetails product={catalogProduct} locale={locale}/>   
    </Layout>
  )
}