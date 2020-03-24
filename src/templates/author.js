import React from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"

export default ({ pageContext: { author, blogPosts, locale, menu, submenu, breadcrumb } }) => {    
  const name = author.fields.name[locale];
  const slug = author.fields.slug[locale]
  const description = author.fields.description[locale];

  return (
    <Layout type="blog" page={{name: name, slug: "/blog/autor/" + slug + "/"}}>
      <SEO title={name} description={description} />
      <Menu type="main" menuItems={menu}/>                          
      {submenu && <Menu type="sub" menuItems={submenu}/> }            
      <Breadcrumb links={breadcrumb}/>
      <BlogHeader title={name} text={description}/>      
      <BlogGrid type="simple" title="Aktuelle Artikel" blogPosts={blogPosts} locale={locale}/>      
    </Layout>
  )
}