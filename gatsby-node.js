const path = require('path');

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

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
    
  const blog = new Promise((resolve, reject) => {
    const blogTemplate = path.resolve('src/templates/blog.js');
    resolve(              
      createPage({
        path: "/blog",
        component: blogTemplate
      })
    );
  });

  const blogPosts = new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blog-post.js');
    resolve(
      graphql(`
        {
            allContentfulBlogPost (limit:100) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
          `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulBlogPost.edges.forEach((edge) => {
          createPage({
            path: "/blog/" + edge.node.slug,
            component: blogPostTemplate,
            context: {
              slug: edge.node.slug,
            },
          });
        });
        return;
      }),
    );
  });

  const authors = new Promise((resolve, reject) => {
    const authorTemplate = path.resolve('src/templates/author.js');
    resolve(
      graphql(`
        {
            allContentfulAuthor (limit:100) {
                edges {
                    node {
                        short
                    }
                }
            }
        }
          `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulAuthor.edges.forEach((edge) => {
          createPage({
            path: "/blog/autor/" + edge.node.short,
            component: authorTemplate,
            context: {
              short: edge.node.short,
            },
          });
        });
        return;
      }),
    );
  });

  const blogCategories = new Promise((resolve, reject) => {
    const blogCategoryTemplate = path.resolve('src/templates/blog-category.js');
    resolve(
      graphql(`
        {
            allContentfulBlogCategory (filter: {default: {eq: false}}, sort: {fields: index, order: ASC}, limit:100) {
                edges {
                    node {
                        short
                    }
                }
            }
        }
          `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulBlogCategory.edges.forEach((edge) => {
          createPage({
            path: "/blog/kategorie/" + edge.node.short,
            component: blogCategoryTemplate,
            context: {
              short: edge.node.short,
            },
          });
        });
        return;
      }),
    );
  });

  const products = new Promise((resolve, reject) => {
    const productsTemplate = path.resolve('src/templates/products.js');
    resolve(
      graphql(`
        {
          contentfulPage(key: {eq: "products"}) {
            short          
          }
        }
          `).then((result) => {
          if (result.errors) {
            reject(result.errors);
          }
          createPage({
            path: result.data.contentfulPage.short,
            component: productsTemplate
          });
          return;
        }),        
    );        
  });

  const productDetails = new Promise((resolve, reject) => {
    const productDetailTemplate = path.resolve('src/templates/product-detail.js');
    resolve(
      graphql(`
        {
            allContentfulCatalogProduct (filter: {active: {eq: true}}, limit: 1000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
          `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allContentfulCatalogProduct.edges.forEach((edge) => {
          createPage({
            path: "/detail/" + edge.node.slug,
            component: productDetailTemplate,
            context: {
              slug: edge.node.slug,
            },
          });
        });
        return;
      }),
    );
  });

  const designer = new Promise((resolve, reject) => {
    const designerTemplate = path.resolve('src/templates/designer.js');
    resolve(
      graphql(`
        {
          contentfulPage(key: {eq: "designer"}) {
            short          
          }
        }
          `).then((result) => {
          if (result.errors) {
            reject(result.errors);
          }
          createPage({
            path: result.data.contentfulPage.short,
            component: designerTemplate
          });
          return;
        }),        
    );    
  });
  
  const catalogCategory = new Promise((resolve, reject) => {
    const catalogCategoryTemplate = path.resolve('src/templates/category.js');
    resolve(
      graphql(`
        {
            allContentfulCatalogCategory (filter: {slug: {ne: "homepage"}}, limit: 1000) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
          `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }        
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
        return;
      }),
    );
  });

  return Promise.all([blog, blogPosts, authors, blogCategories, products, productDetails, designer, catalogCategory])
};