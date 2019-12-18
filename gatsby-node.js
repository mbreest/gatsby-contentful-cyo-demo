const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
    
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
            path: "/blog/authors/" + edge.node.short,
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
            path: "/blog/categories/" + edge.node.short,
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
  
  return Promise.all([blogPosts, authors, blogCategories])
};