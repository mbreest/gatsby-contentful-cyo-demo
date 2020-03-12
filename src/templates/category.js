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
  const { name, slug, contentElements } = data.contentfulCatalogCategory
  var count = 0;

  return (
    <Layout slug={slug} category={{slug: slug, name: name}}>
      <SEO title={name} description="" />
      
      {(contentElements || []).map( (node) => {
        if (node.internal) {
          switch (node.internal.type) {
            case "ContentfulHero":
                return (
                  <ContentElementHero key={"ce" + (count++)} image={node.image} title={node.title} subtitle={node.subtitle} action={node.action}/>
                )
            case "Contentful3ColumnText":
                return (
                  <ContentElement3ColumnText key={"ce" + (count++)} highlight="yes" title={node.title} headline1={ node.headline1 } text1={ node.text1 } headline2={ node.headline2 } text2={ node.text2 } headline3={ node.headline3 } text3={ node.text3 }/>
                )
            case "ContentfulProductList":
                if (node.generated) {
                  return (                  
                    <ContentElementProductList key={"ce" + (count++)} highlight="yes" title={node.title} products={data.topProducts.nodes} actionButton={node.actionButton}/>                  
                  )                    
                } else {
                  return (
                    <ContentElementProductList key={"ce" + (count++)} highlight="yes" title={node.title} products={node.products} actionButton={node.actionButton}/>                  
                  )
                }                                  
            case "ContentfulCategoryList":
                return (
                  <ContentElementCategoryList key={"ce" + (count++)} highlight="no" title={node.title} categories={node.categories}/>                  
                )
            case "ContentfulCategoryNavigationIcon":            
              if (node.generated) {                       
                return (                  
                  <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" title={node.title} highlightedCategories={[]} categories={data.topCategories.nodes} useHero={false} useIcon={node.useIcon}/>
                )
              } else {
                return (
                  <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" title={node.title} highlightedCategories={node.highlightedCategories} categories={node.categories} useHero={false} useIcon={node.useIcon}/>                  
                )
              }
            case "ContentfulCategoryNavigationHero":                          
              return (
                <ContentElementCategoryNavigation key={"ce" + (count++)} highlight="no" title={node.title} highlightedCategories={[]} categories={node.categories} useHero={true} useIcon={false}/>                  
              )              
            case "ContentfulPhotoStory":            
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
        contentElements {
            ... on Contentful3ColumnText {
              ...ThreeColumnTextFields              
              internal {
                type
              }
            }
            ... on ContentfulProductList {
              ...ProductListFields
              internal {
                type
              }
            }
            ... on ContentfulCategoryList {
              ...CategoryListFields
              internal {
                type
              }
            }
            ... on ContentfulCategoryNavigationIcon {
              ...CategoryNavigationIconFields              
              internal {
                type
              }
            }    
            ... on ContentfulCategoryNavigationHero {
              ...CategoryNavigationHeroFields              
              internal {
                type
              }
            }              
            ... on ContentfulPhotoStory {
              ...PhotoStoryFields
              internal {
                type
              }
            }
            ... on ContentfulHero {
              ...HeroFields
              internal {
                type
              }
            }
        }
      }
      topProducts: allContentfulCatalogProduct(filter: {category: {slug: {eq: $slug}}, node_locale: {eq: "de"}}, sort: {order: ASC, fields: index}, limit: 100) {
        nodes {          
          ...ProductListProductFields
        }
      }
      topCategories: allContentfulCatalogCategory(filter: {category: {slug: {eq: $slug}}, node_locale: {eq: "de"}}, sort: {fields: index}) {      
          nodes {
            id
            slug
            name            
            index
          }
      }
    }
`