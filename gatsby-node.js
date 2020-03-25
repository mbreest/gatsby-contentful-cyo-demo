require('dotenv').config();
const path = require('path');

const createModel = require("./src/utils/model.js").createModel
const pageBreadcrumb = require("./src/utils/breadcrumb.js").pageBreadcrumb
const categoryBreadcrumb = require("./src/utils/breadcrumb.js").categoryBreadcrumb
const blogBreadcrumb = require("./src/utils/breadcrumb.js").blogBreadcrumb
const navigationMenu = require("./src/utils/navigation.js").navigationMenu
const updateAlgoliaIndex = require("./src/utils/algolia.js").updateAlgoliaIndex

const locale = "de";
const locales = ["de"]

var model;

function latestPublishedFirst(a, b, locale) {
  return Date.parse(b.fields.published[locale]) - Date.parse(a.fields.published[locale]);
} 

function lowestIndexFirst(a, b, locale) {
  return a.fields.index[locale] - b.fields.index[locale];
}

function filterByCategorySlug(blog, slug, locale) {
  return blog.fields.categories && locale in blog.fields.categories && blog.fields.categories[locale].map(c => c.fields.slug[locale]).includes(slug);
}

function filterByAuthorId(blog, authorId, locale) {
  return blog.fields.author[locale].sys.id === authorId;
}

function filterByCategoryId(blog, categoryId, locale) {
  return blog.fields.categories && locale in blog.fields.categories && blog.fields.categories[locale].map(c => c.sys.id).includes(categoryId);
}

function filterByKey(page, key, locale) {
  return page.fields.key[locale] === key 
}

function filterIsActive(catalogProduct, locale) {
  return catalogProduct.fields.active[locale] === true
}

function minBlogFields(blog) {  
  return {
    fields: {
       title: blog.fields.title,
       slug: blog.fields.slug,                                          
       hero: blog.fields.hero,
       published: blog.fields.published,
       excerpt: blog.fields.excerpt,
       author: blog.fields.author                                          
    }
  }
}

function algoliaProduct(catalogProduct, locale) {
  const name = catalogProduct.fields.name[locale];
  const slug = catalogProduct.fields.slug[locale];
  const available = catalogProduct.fields.available[locale];
  const productTypeId = available ? catalogProduct.fields.productTypeId[locale] : "-1";
  const sizes = available ? catalogProduct.fields.sizes[locale] : [];
  const colors = available ? catalogProduct.fields.colors[locale] : [];
  const defaultView = available ? catalogProduct.fields.defaultValues[locale].view : "-1";
  const defaultColor = available ? catalogProduct.fields.defaultValues[locale].color : "-1";
  const index = catalogProduct.fields.index[locale];

  return {
    "objectID": productTypeId,        
    "name": name,
    "slug": slug,
    "sizes": sizes,
    "colors": colors,
    "available": available,
    "defaultView": defaultView,
    "defaultColor": defaultColor,
    "index": index,        
    "imageUrl": `https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/${productTypeId}/view/${defaultView},appearance=${defaultColor},width=300,height=300.jpg`,
    "url": `https://gatsby-contentful-cyo-demo.netlify.com/detail/${slug}/`
  }  
}

exports.onPreBootstrap = async () => {  
  model = await createModel(locales);        

  if (process.env.NODE_ENV === "production") {    
    const { catalogProducts } = model;
    updateAlgoliaIndex(catalogProducts.map((cp) => algoliaProduct(cp, locale)), locale);
  }  
}

exports.createPages =  async ({ actions }) => {  
  const { createPage } = actions;     

  const {authors, blogPosts, blogCategories, catalogProducts, catalogCategories, pages, navigationMenus} = model;
  
  const designer = pages.filter(p => filterByKey(p, "designer", locale))[0];
  
  locales.forEach((l) => {
    process.env[`link.designer.slug.${l}`] = designer.fields.slug[locale];
  })    

  function resolvePath(ne, locale) {
    const path = ne.fields.item[locale].fields.slug[locale];
    if (ne.fields.item[locale].sys.contentType.sys.id === "blogCategory") {
      return `/blog/kategorie/${path}/`;
    } else {
      return `/${path}/`;
    }
  }  

  const navigation = navigationMenus.filter((nm) => nm.fields.name[locale] == "Main")[0].fields.navigationElements[locale]
        .reduce((menu, ne) => {
          menu.push({name: ne.fields.name[locale], 
            path: resolvePath(ne, locale),
            submenu: ne.fields.navigationElements ? ne.fields.navigationElements[locale].reduce((submenu, ne2) => {
              submenu.push({name: ne2.fields.name[locale], 
                path: resolvePath(ne2, locale)});
                return submenu;
            }, []) : []
          }); 
          return menu;
        }, []);
  
  const categoryLookup = catalogCategories.reduce((lookup, category) => {      
    const name = category.fields.name[locale];
    const slug = category.fields.slug[locale];
    const parent = category.fields.category ? category.fields.category[locale].fields.slug[locale] : null;
    lookup[slug] = {name: name, slug: slug, parent: parent};
    return lookup;
    }, {});      

  const blogTemplate = path.resolve('src/templates/blog.js');
  {    
    const path = "/blog";
    const {menu, submenu} = navigationMenu(navigation, path);
    const breadcrumb = blogBreadcrumb();    
    const topBlogPosts = blogPosts.filter(blog => filterByCategorySlug(blog, "create_blog", locale))
                                  .sort((a,b) => latestPublishedFirst(a,b,locale))
                                  .slice(0,3)
                                  .map(minBlogFields)
    const otherBlogPosts = blogPosts.sort((a,b) => latestPublishedFirst(a,b,locale))
                                    .slice(0,10)
                                    .map(minBlogFields)

    createPage({
      path: path,
      component: blogTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,
        topBlogPosts: topBlogPosts,
        blogPosts: otherBlogPosts,
        locale: locale,        
      }
    })
  }

  const authorTemplate = path.resolve('src/templates/author.js');
  authors.forEach((author) => {
    const path = "/blog/autor/" + author.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);
    const breadcrumb = blogBreadcrumb({name: author.fields.name[locale], slug: path});    
    const authorBlogPosts = blogPosts.filter(blog => filterByAuthorId(blog, author.sys.id, locale))
                                     .sort((a,b) => latestPublishedFirst(a,b,locale))
                                     .map(minBlogFields)
    
    createPage({
      path: path,
      component: authorTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,        
        author: author,
        blogPosts: authorBlogPosts,
        locale: locale     
      },
    });
  })  

  const blogCategoryTemplate = path.resolve('src/templates/blog-category.js');
  blogCategories.forEach((blogCategory) => {   
    const path = "/blog/kategorie/" + blogCategory.fields.slug[locale]; 
    const {menu, submenu} = navigationMenu(navigation, path);  
    const breadcrumb = blogBreadcrumb({name: blogCategory.fields.name[locale], slug: path});    
    const categoryBlogPosts = blogPosts.filter(blog => filterByCategoryId(blog, blogCategory.sys.id, locale))
                                        .sort((a,b) => latestPublishedFirst(a,b,locale))
                                        .map(minBlogFields)
    
    createPage({
      path: path,
      component: blogCategoryTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,        
        blogCategory: blogCategory,
        blogPosts: categoryBlogPosts,
        locale: locale        
      },
    });
  })  
  
  const blogPostTemplate = path.resolve('src/templates/blog-post.js');
  blogPosts.forEach((blogPost) => {
    const path = "/blog/" + blogPost.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);    
    const breadcrumb = blogBreadcrumb({name: blogPost.fields.title[locale], slug: path})

    createPage({
      path: path,
      component: blogPostTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,        
        blogPost: blogPost,
        locale: locale,
        designerPath: designer.fields.slug[locale]        
      },
    });
  });    

  const productsTemplate = path.resolve('src/templates/products.js');
  {    
    const page = pages.filter(p => filterByKey(p, "products", locale))[0];
    const path = page.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);  
    const breadcrumb = pageBreadcrumb({name: page.fields.name[locale], slug: page.fields.slug[locale]});

    createPage({
      path: path,
      component: productsTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,          
        page: page,
        locale: locale        
      }
    });
  }

  const designerTemplate = path.resolve('src/templates/designer.js');
  {         
    const page = pages.filter(p => filterByKey(p, "designer", locale))[0];
    const path = page.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);
    const breadcrumb = pageBreadcrumb({name: page.fields.name[locale], slug: page.fields.slug[locale]});

    createPage({
      path: path,
      component: designerTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,
        page: page,
        locale: locale        
      }
    });
  } 
    
  const catalogCategoryTemplate = path.resolve('src/templates/category.js');
  catalogCategories.forEach((catalogCategory) => {
    const path = catalogCategory.fields.slug[locale] === "-" ? "/" : "/" + catalogCategory.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);
    const category = catalogCategory.fields.category ? catalogCategory.fields.category[locale].fields.slug[locale] : null;
    const breadcrumb = categoryBreadcrumb({name: catalogCategory.fields.name[locale], slug: catalogCategory.fields.slug[locale]}, category, categoryLookup);

    const topProducts = catalogProducts.filter(catalogProduct => catalogProduct.fields.category && catalogProduct.fields.category[locale].sys.id === catalogCategory.sys.id)
                                       .filter(catalogProduct => catalogProduct.fields.available[locale])
                                       .sort((a,b) => lowestIndexFirst(a,b,locale))
                                       .map(catalogProduct => {
                                         return {
                                           fields: {
                                             name: catalogProduct.fields.name,
                                             slug: catalogProduct.fields.slug,
                                             productTypeId: catalogProduct.fields.productTypeId,
                                             defaultValues: catalogProduct.fields.defaultValues 
                                           }
                                         }                                        
                                       })
                                       

    const topCategories = catalogCategories.filter(category => category.fields.category && category.fields.category[locale].sys.id === catalogCategory.sys.id)
                                           .sort((a,b) => lowestIndexFirst(a,b,locale))        
                                           .map(category => {
                                             return {
                                               fields: {
                                                  name: category.fields.name,
                                                  slug: category.fields.slug,
                                                  image: category.fields.image,
                                                  category: category.fields.category
                                               }
                                             }
                                           })

    createPage({
      path: path,
      component: catalogCategoryTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,
        catalogCategory: catalogCategory,
        locale: locale,
        topProducts: topProducts.slice(0,10),
        topCategories: topCategories.slice(0,10),
        designerPath: designer.fields.slug[locale]        
      },
    });
  }) 

  const productDetailTemplate = path.resolve('src/templates/product-detail.js');
  catalogProducts.filter((catalogProduct) => filterIsActive(catalogProduct, locale)).forEach((catalogProduct) => {
    const path = "/detail/" + catalogProduct.fields.slug[locale];
    const {menu, submenu} = navigationMenu(navigation, path);    
    const category = catalogProduct.fields.category ? catalogProduct.fields.category[locale].fields.slug[locale] : null;
    const breadcrumb = categoryBreadcrumb({name: catalogProduct.fields.name[locale], slug: catalogProduct.fields.slug[locale]}, category, categoryLookup);
    
    
    createPage({
      path: path,
      component: productDetailTemplate,
      context: {
        menu: menu,
        submenu: submenu,
        breadcrumb: breadcrumb,
        catalogProduct: catalogProduct,
        locale: locale,
        designerPath: designer.fields.slug[locale]        
      },
    });
  })  
};