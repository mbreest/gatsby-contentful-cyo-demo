const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `   
    type Color {
      name: String!,
      hex: String,
      id: String!
    }
    type Size {
      name: String!
    }
    type Defaults {
      view: String,
      color: String
    } 
  `
  createTypes(typeDefs)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // TODD resolve different languages
  const res = await axios.get("https://designer.spreadshirt.de/api/v1/shops/1133169/productTypes?mediaType=json&fullData=true&locale=de_DE&limit=1000");

  res.data.productTypes.map((productType) => {
    productType.ptid = productType.id;
    const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(productType.id)).digest(`hex`);        
    const nodeMeta = {
      id: createNodeId("ProductType-" + productType.id),
      parent: null,
      children: [],
      internal: {
        type: `ProductType`,        
        contentDigest: contentDigest
      }
    }
    
    createNode(Object.assign({}, productType, nodeMeta))
  })  
}

exports.setFieldsOnGraphQLNodeType = ({ type, createNodeId }) => {  
  if (type.name === `ContentfulCatalogProduct`) {
    return {           
      views: {
        type: '[String!]!',        
        resolve(source, args, context, info) {
          var productType = context.nodeModel.getNodeById({type: "ProductType", id: createNodeId("ProductType-" + source.contentfulid)});
          if (productType && productType.views) {                   
            return productType.views.map((view) => (view.id))                        
          } else {
            return [];
          }        
        },
      },    
      defaultValues:{
        type: 'Defaults!',        
        async resolve(source, args, context, info) {                           
          var productType = context.nodeModel.getNodeById({type: "ProductType", id: createNodeId("ProductType-" + source.contentfulid)});
          if (productType && productType.defaultValues) {                         
            return {
              view: productType.defaultValues.defaultView.id, 
              color: productType.defaultValues.defaultAppearance.id
            };
          } else {
            return {};
          }          
        }
      },   
      available: {
        type: 'Boolean!',        
        async resolve(source, args, context, info) {                 
          var productType = context.nodeModel.getNodeById({type: "ProductType", id: createNodeId("ProductType-" + source.contentfulid)});
          return (productType != null)
        },
      },
      sizes: {
        type: '[Size!]!',        
        async resolve(source, args, context, info) {                 
          var productType = context.nodeModel.getNodeById({type: "ProductType", id: createNodeId("ProductType-" + source.contentfulid)});
          if (productType && productType.sizes) {
            return productType.sizes.map((size) => ({name: size.name}));
          } else {
            return [];
          }          
        },
      },
      colors: {
        type: '[Color!]!',        
        async resolve(source, args, context, info) {                           
          var productType = context.nodeModel.getNodeById({type: "ProductType", id: createNodeId("ProductType-" + source.contentfulid)});
          if (productType && productType.sizes) {                         
            return productType.appearances.map((appearance) => {
              var name = appearance.name;
              var hex = "#fff";
              var id = null;
              if (appearance.colors && appearance.colors.length > 0) {
                hex = appearance.colors[0].value;
                id = appearance.id;
              }
              return ({name: name, hex: hex, id: id});
            })
          } else {
            return [];
          }          
        },
      }
    }
  }
  
  return {}
}

exports.createPages =  async ({ graphql, actions }) => {
  const { createPage } = actions;
    
  const blogTemplate = path.resolve('src/templates/blog.js');
  createPage({
    path: "/blog",
    component: blogTemplate
  })
  
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  var result = await graphql(`
        {
            allContentfulBlogPost (limit:100) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }`)
  result.data.allContentfulBlogPost.edges.forEach((edge) => {
    createPage({
      path: "/blog/" + edge.node.slug,
      component: blogPostTemplate,
      context: {
        slug: edge.node.slug,
      },
    });
  });    

  const authorTemplate = path.resolve('src/templates/author.js');
  result = await graphql(`
    {
      allContentfulAuthor (limit:100) {
        edges {
          node {
            short
          }
        }
      }
    }`)
  result.data.allContentfulAuthor.edges.forEach((edge) => {
    createPage({
      path: "/blog/autor/" + edge.node.short,
      component: authorTemplate,
      context: {
        short: edge.node.short,
      },
    });
  });
    

  const blogCategoryTemplate = path.resolve('src/templates/blog-category.js');
  result = await graphql(`
    {
      allContentfulBlogCategory (filter: {default: {eq: false}}, sort: {fields: index, order: ASC}, limit:100) {
        edges {
          node {
            short
          }
        }
      }
    }`)
  result.data.allContentfulBlogCategory.edges.forEach((edge) => {
    createPage({
      path: "/blog/kategorie/" + edge.node.short,
      component: blogCategoryTemplate,
      context: {
        short: edge.node.short,
      },
    });
  });  

 const productsTemplate = path.resolve('src/templates/products.js');
 result = await graphql(`
    {
      contentfulPage(key: {eq: "products"}) {
        short          
      }
    }`)
  createPage({
    path: result.data.contentfulPage.short,
    component: productsTemplate
  });  

 const productDetailTemplate = path.resolve('src/templates/product-detail.js');
 result = await graphql(`
    {
      allContentfulCatalogProduct (filter: {active: {eq: true}}, limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }`)
  result.data.allContentfulCatalogProduct.edges.forEach((edge) => {
    createPage({
      path: "/detail/" + edge.node.slug,
      component: productDetailTemplate,
      context: {
        slug: edge.node.slug,
      },
    });
  });  

 const designerTemplate = path.resolve('src/templates/designer.js');
 result = await graphql(`
    {
      contentfulPage(key: {eq: "designer"}) {
        short          
      }
    }`)
  createPage({
    path: result.data.contentfulPage.short,
    component: designerTemplate
  });  
  
  const catalogCategoryTemplate = path.resolve('src/templates/category.js');
  result = await graphql(`
    {
      allContentfulCatalogCategory (filter: {slug: {ne: "homepage"}}, limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }`)
  result.data.allContentfulCatalogCategory.edges.forEach((edge) => {
    let slug = "/";
    if (edge.node.slug !== "-") {
      slug = "/" + edge.node.slug;
    }
    createPage({
      path: slug,
      component: catalogCategoryTemplate,
      context: {
        slug: edge.node.slug,
      },
    });
  });
};