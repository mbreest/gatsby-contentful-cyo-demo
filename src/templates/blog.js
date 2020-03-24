import React from 'react';
import Layout from "../components/layout"
import BlogHeader from "../components/blogheader"
import BlogGrid from "../components/bloggrid"
import Menu from "../components/menu"
import Breadcrumb from "../components/breadcrumb"
import SEO from "../components/seo"

export default ({ pageContext: { topBlogPosts, blogPosts, locale, menu, submenu, breadcrumb } }) => {    
  return (
    <Layout type="blog" page={{name: "Blog", slug: "/blog/"}}>   
      <SEO title={"Create Blog"} description={"Inspiration. Lifestyle. Weihnachtswahnsinn."}/>
      <Menu type="main" menuItems={menu}/>                          
      {submenu && <Menu type="sub" menuItems={submenu}/> }            
      <Breadcrumb links={breadcrumb}/>       
      <BlogHeader title="Create Blog" text="Inspiration. Lifestyle. Weihnachtswahnsinn."/>              
      <BlogGrid blogPosts={topBlogPosts} locale={locale}/>            
      <BlogGrid title="Mehr Artikel" blogPosts={blogPosts} locale={locale}/>           
    </Layout>
  )
}