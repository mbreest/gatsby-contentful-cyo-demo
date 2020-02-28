import React from 'react';
import {graphql} from 'gatsby';
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContentElementHero from "../components/contentelementhero"
import ContentElementProductList from "../components/contentelementproductlist"
import ContentElement3ColumnText from "../components/contentelement3columntext"
import ContentElementCategoryList from "../components/contentelementcategorylist"
import ContentElementCategoryNavigation from "../components/contentelementcategorynavigation"
import ContentElementPhotoStory from "../components/contentelementphotostory"

export default ({ data }) => {  
  const { name, slug, title, subtitle, action, hero, contentElements } = data.contentfulCatalogCategory
  var count = 0;

  return (
    <Layout slug={slug} category={{slug: slug, name: name}}>
      <SEO title={title} description={subtitle} />
      
      {(contentElements || []).map( (node) => {
        if (node.internal) {
          switch (node.internal.type) {
            case "ContentfulContentElementGenerated":
              switch (node.title) {
                case "HeroHeader": 
                  return (
                    <ContentElementHero key={"ce" + (count++)} hero={hero} title={title} subtitle={subtitle} action={action}/>           
                  )
                default:
                  return (
                    <div key={"ce" + (count++)}/>
                  )              
              }            
            case "ContentfulContentElement3ColumnText":
                return (
                  <ContentElement3ColumnText key={"ce" + (count++)} highlight="yes" title={node.title} headline1={ node.headline1 } text1={ node.text1 } headline2={ node.headline2 } text2={ node.text2 } headline3={ node.headline3 } text3={ node.text3 }/>
                )
            case "ContentfulContentElementProductList":
                if (node.generated) {
                  return (                  
                    <ContentElementProductList key={"ce" + (count++)} highlight="yes" title={node.title} products={data.topProducts.nodes} actionButton={node.actionButton}/>                  
                  )                    
                } else {
                  return (
                    <ContentElementProductList key={"ce" + (count++)} highlight="yes" title={node.title} products={node.products} actionButton={node.actionButton}/>                  
                  )
                }                                  
            case "ContentfulContentElementCategoryList":
                return (
                  <ContentElementCategoryList key={"ce" + (count++)} highlight="no" title={node.title} categories={node.categories}/>                  
                )
            case "ContentfulContentElementCategoryNavigation":            
              if (node.generated) {                       
                return (                  
                  <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" title={node.title} highlightedCategories={[]} categories={data.topCategories.nodes} useHero={node.useHero} useIcon={node.useIcon}/>
                )
              } else {
                return (
                  <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" title={node.title} highlightedCategories={node.highlightedCategories} categories={node.categories} useHero={node.useHero} useIcon={node.useIcon}/>                  
                )
              }
            case "ContentfulContentElementPhotoStory":            
              return (
                 <ContentElementPhotoStory key={"ce" + (count++)} highlight="no" title={node.title} photoBlocks={node.photoBlocks}/>
              )            
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

export const query = graphql`
    query catalogCategoryQuery($slug: String!){       
      contentfulCatalogCategory(slug: {eq: $slug}, node_locale: {eq: "de"}) {             
        name        
        slug
        title
        subtitle    
        action {
          product {
            contentfulid
          }
          title            
          appearanceId
          viewId
          designSearch
        }                   
        hero {
          fluid(maxWidth: 1200, sizes: "400,800,1200") {
            aspectRatio
            src
            srcSet
            sizes
          } 
        }
        contentElements {
            ... on ContentfulContentElementGenerated {
              title
              internal {
                type
              }
            }
            ... on ContentfulContentElement3ColumnText {
              ...ThreeColumnTextFields              
              internal {
                type
              }
            }
            ... on ContentfulContentElementProductList {
              ...ProductListFields
              internal {
                type
              }
            }
            ... on ContentfulContentElementCategoryList {
                ...CategoryListFields
                internal {
                  type
                }
              }
              ... on ContentfulContentElementCategoryNavigation {
                ...CategoryNavigationFields              
                internal {
                  type
                }
              }              
              ... on ContentfulContentElementPhotoStory {
                ...PhotoStoryFields
                internal {
                  type
                }
              }
        }
      }
      topProducts: allContentfulCatalogProduct(filter: {contentfulparent: {slug: {eq: $slug}}, node_locale: {eq: "de"}}, sort: {order: ASC, fields: index}, limit: 100) {
        nodes {          
          ...ProductListProductFields
        }
      }
      topCategories: allContentfulCatalogCategory(filter: {contentfulparent: {slug: {eq: $slug}}, node_locale: {eq: "de"}}, sort: {fields: index}) {      
          nodes {
            id
            slug
            name
            icon {
              fluid(maxWidth: 300, quality: 80) {
                ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
            hero {
              fluid(maxWidth: 1200, sizes: "400,800,1200") {
                aspectRatio
                src
                srcSet
                sizes
              } 
            }
            iconLarge {
              fluid(maxWidth: 500, quality: 80) {
                ...GatsbyContentfulFluid_withWebp_noBase64
              }
            }
            index
          }
      }
    }
`