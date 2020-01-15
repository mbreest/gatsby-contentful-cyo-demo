const path = require('path');
const axios = require('axios');
const crypto = require('crypto');

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    ContentfulCatalogProduct: {
      mainImage: {
        type: 'String',
        args: {
          size: {
            type: 'Int',
            defaultValue: 450,
          },
          backgroundColor: {
            type: 'String'
          }
        },
        resolve(source, args, context, info) {
          var backgroundColorParam = "";
          if (args.backgroundColor) {
            backgroundColorParam += ",backgroundColor=" + args.backgroundColor;
          }
          return "https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/" + source.contentfulid + ",width=" + args.size + ",height=" + args.size + backgroundColorParam + ".jpg";          
        },
      },          
    },
  }
  createResolvers(resolvers)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // TODD resolve different languages
  const res = await axios.get("https://designer.spreadshirt.de/api/v1/shops/1133169/productTypes?mediaType=json&fullData=true&locale=de_DE&limit=1000");

  res.data.productTypes.map((productType) => {
    productType.ptid = productType.id;
    const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(productType.id)).digest(`hex`);        
    const nodeMeta = {
      id: createNodeId(productType.id),
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