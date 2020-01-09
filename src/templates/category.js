import React from 'react';
import {graphql } from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementHero from "../components/contentelementhero"
import ContentElementProductList from "../components/contentelementproductlist"
import ContentElement3ColumnText from "../components/contentelement3columntext"
import ContentElementCategoryList from "../components/contentelementcategorylist"
import ContentElementCategoryNavigation from "../components/contentelementcategorynavigation"

export default ({ data }) => {  
  const { name, slug, title, subtitle, action, hero, contentElements } = data.contentfulCatalogCategory
  
  return (
    <Layout slug={slug} category={{slug: slug, name: name}}>
      <SEO title={title} description={subtitle} />
            
      <ContentElementHero  hero={hero} title={title} subtitle={subtitle} action={action}/>           
      {(contentElements || []).map( (node) => {
        if (node.internal) {
          switch (node.internal.type) {
            case "ContentfulContentElement3ColumnText":
                return (
                  <ContentElement3ColumnText highlight="yes" title={node.title} headline1={ node.headline1 } text1={ node.text1 } headline2={ node.headline2 } text2={ node.text2 } headline3={ node.headline3 } text3={ node.text3 }/>
                )
            case "ContentfulContentElementProductList":
                return (
                  <ContentElementProductList highlight="yes" title={node.title} products={node.products}/>                  
                )
            case "ContentfulContentElementCategoryList":
                return (
                  <ContentElementCategoryList highlight="no" title={node.title} categories={node.categories}/>                  
                )
                case "ContentfulContentElementCategoryNavigation":
                return (
                  <ContentElementCategoryNavigation highlight="no" title={node.title} categories={node.categories} useHero={node.useHero}/>                  
                )
            default:
                return (
                  <div/>              
                )            
            }
          }          
        }        
        )}      
    </Layout>
  )
}

export const query = graphql`
    query catalogCategoryQuery($slug: String!){       
      contentfulCatalogCategory(slug: {eq: $slug}) {             
        name        
        slug
        title
        subtitle    
        action {
            product {
              contentfulid
            }
            title
        }
        hero {
            fluid(maxWidth: 1200, quality: 80) {
                aspectRatio
                sizes
                src
                srcSet
                srcSetWebp
            }
        }           
        contentElements {
            ... on ContentfulContentElement3ColumnText {
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
              internal {
                type
              }
            }
            ... on ContentfulContentElementProductList {
              products {
                name
                slug
                contentfulid
              }
              title
              internal {
                type
              }
            }
            ... on ContentfulContentElementCategoryList {
                id
                title
                categories {
                  title
                  category {
                    slug
                  }
                }
                internal {
                  type
                }
              }
              ... on ContentfulContentElementCategoryNavigation {
                id
                title
                categories {
                  title
                  category {
                    name
                    slug
                    hero {
                      title
                      fluid(maxWidth: 500, quality: 80) {
                        aspectRatio
                        sizes
                        src
                        srcSet
                        srcSetWebp
                      }
                    }
                  }
                }
                useHero
                internal {
                  type
                }
              }
        }
      }
    }
`