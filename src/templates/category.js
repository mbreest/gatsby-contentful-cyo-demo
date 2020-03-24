import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementHero from "../components/contentelementhero"
import ContentElementProductList from "../components/contentelementproductlist"
import ContentElement3ColumnText from "../components/contentelement3columntext"
import ContentElementCategoryList from "../components/contentelementcategorylist"
import ContentElementCategoryNavigation from "../components/contentelementcategorynavigation"
import ContentElementCategoryNavigationIcon from "../components/contentelementcategorynavigationicon"
import ContentElementCategoryNavigationHero from "../components/contentelementcategorynavigationhero"
import ContentElementPhotoStory from "../components/contentelementphotostory"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"

export default ({ pageContext: { catalogCategory, topProducts, topCategories, locale, designerPath, menu, submenu, breadcrumb } }) => {  
  const name = catalogCategory.fields.name[locale];
  const slug = catalogCategory.fields.slug[locale];
  const category = catalogCategory.fields.category ? {name: catalogCategory.fields.category[locale].fields.name[locale], slug: catalogCategory.fields.category[locale].fields.slug[locale]} : null;  
  const contentElements = catalogCategory.fields.contentElements[locale];
  
  var count = 0;

  return (
    <Layout page={{slug: "/" + slug + "/", name: name}} category={category}>
      <SEO title={name} description="" />
      <Menu type="main" menuItems={menu}/>                          
      {submenu && <Menu type="sub" menuItems={submenu}/> }            
      <Breadcrumb links={breadcrumb}/>

      {(contentElements || []).map( (node) => {        
        if (node.sys.contentType.sys.id) {        
          switch (node.sys.contentType.sys.id) {
            case "contentElementHero":
                return (
                  <ContentElementHero key={"ce" + (count++)} data={node} locale={locale} designerPath={designerPath}/>
                )
            case "contentElement3columnText":
              return (
                <ContentElement3ColumnText key={"ce" + (count++)} highlight="yes" data={node} locale={locale}/>
              ) 
            case "contentElementPhotoStory":            
              return (
                 <ContentElementPhotoStory key={"ce" + (count++)} highlight="no" data={node} locale={locale} designerPath={designerPath}/>
              )   
            case "contentElementCategoryList":
                return (
                  <ContentElementCategoryList key={"ce" + (count++)} highlight="no" data={node} locale={locale}/>                  
                )
            case "categoryNavigationHero":                          
                return (
                  <ContentElementCategoryNavigationHero key={"ce" + (count++)} highlight="no" data={node} locale={locale}/>                  
                )              
            case "contentElementProductList":
              return (                  
                <ContentElementProductList key={"ce" + (count++)} highlight="yes" data={node} locale={locale} topProducts={topProducts}/>                  
              )                                  
            case "contentElementCategoryNavigation":            
              if (node.fields.useIcon && node.fields.useIcon[locale] === true) {                       
                return (                  
                  <ContentElementCategoryNavigationIcon key={"ce" + (count++)} highlight="no" data={node} locale={locale} topCategories={topCategories}/>
                )
              } else {
                return (
                  <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" data={node} locale={locale} topCategories={topCategories}/>                  
                )
              }            
            default:
              return (
                <div/>              
              )            
            }
          }          
          else {
            return (<div/>)
          }
        })}    
       
    </Layout>
  )
}