const axios = require('axios');
const contentful = require("contentful");
const decycle = require("./decycle.js").decycle
const excerpt = require('./excerpt.js').excerptRichtext

const TYPE = {
  AUTHOR: "author",
  BLOG: "blog",
  BLOG_CATEGORY: "blogCategory",
  CATALOG_PRODUCT: "productType",
  CATALOG_CATEGORY: "catalogCategory",
  PAGES: "page",
  NAVIGATION_MENU: "navigationMenu"
};

const FIELDS = {
  VIEWS: "views",
  SIZES: "sizes",
  DEFAULT_VALUES: "defaultValues",
  COLORS: "colors"
}

function enrichProduct(catalogProduct, cache, locales, fields = null){
    locales.forEach((locale) => {      
      if (!catalogProduct.fields.available) {
        catalogProduct.fields.available = {};
      }

      if (catalogProduct.fields.productTypeId[locale] in cache) {
        const productType = cache[catalogProduct.fields.productTypeId[locale]];              
        catalogProduct.fields.available[locale] = true;
        
        if (!fields || fields.includes(FIELDS.VIEWS)) {
          if (!catalogProduct.fields.views) {
            catalogProduct.fields.views = {};
          }        
          catalogProduct.fields.views[locale] = productType.views.map((view) => view.id);
        }
        
        if (!fields || fields.includes(FIELDS.SIZES)) {
          if (!catalogProduct.fields.sizes) {
            catalogProduct.fields.sizes = {};
          }        
          catalogProduct.fields.sizes[locale] = productType.sizes.map((size) => {return {name: size.name}});
        }
        
        if (!fields || fields.includes(FIELDS.DEFAULT_VALUES)) {
          if (!catalogProduct.fields.defaultValues) {
            catalogProduct.fields.defaultValues = {};
          }
          catalogProduct.fields.defaultValues[locale] = productType.defaultValues ? {view: productType.defaultValues.defaultView.id, color:productType.defaultValues.defaultAppearance.id} : null;   
        }
        
        if (!fields || fields.includes(FIELDS.COLORS)) {
          if (!catalogProduct.fields.colors) {
            catalogProduct.fields.colors = {};
          }
          catalogProduct.fields.colors[locale] = productType.appearances.map((appearance) => {
            var name = appearance.name;
            var hex = "#fff";
            var id = null;
            if (appearance.colors && appearance.colors.length > 0) {
              hex = appearance.colors[0].value;
              id = appearance.id;
            }
            return ({name: name, hex: hex, id: id});
          })
        }        
      } else {
        catalogProduct.fields.available[locale] = false;
      }    
    })  
}

async function createModel(locales) {    
    const client = contentful.createClient({    
      space: process.env.SPACE_ID,
      accessToken: process.env.ACCESS_TOKEN
    });
  
    const data = await client.sync({initial: true})  
      
    const authors = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.AUTHOR).map(a => decycle(a))
    const blogPosts = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.BLOG).map(b => decycle(b))
    const blogCategories = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.BLOG_CATEGORY).map(bc => decycle(bc))
    const catalogProducts = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.CATALOG_PRODUCT).map(cp => decycle(cp))
    const catalogCategories = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.CATALOG_CATEGORY).map(cc => decycle(cc))  
    const pages = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.PAGES).map(cc => decycle(cc))  
  
    const res = await axios.get("https://designer.spreadshirt.de/api/v1/shops/1133169/productTypes?mediaType=json&fullData=true&locale=de_DE&limit=1000");
    const cache = res.data.productTypes.reduce((cache, productType) => { cache[productType.id] = productType; return cache;}, {});   
    
    catalogProducts.forEach(p => enrichProduct(p, cache, locales))
    
    catalogCategories.forEach(cc => {
        if (cc.fields.contentElements) {
            locales.forEach((locale) => {
                cc.fields.contentElements[locale].forEach(ce => {
                    if (ce.sys.contentType.sys.id === "contentElementProductList") {
                        if (ce.fields.products) {
                            ce.fields.products[locale].forEach(p => enrichProduct(p, cache, locales, [FIELDS.DEFAULT_VALUES]));
                        }
                    }
                })    
            })                        
        }
    })

    blogPosts.forEach((blog) => {
      var e = {}
      if ("content" in blog.fields) {
        e = Object.keys(blog.fields.content).reduce((e, locale) => { e[locale] = excerpt(blog.fields.content[locale], 200, " ..."); return e;}, {});
      }
      blog.fields["excerpt"] = e;
    });

    const navigationMenus = data.entries.filter(e => e.sys.contentType.sys.id === TYPE.NAVIGATION_MENU).map(a => decycle(a))

    return {authors: authors, blogPosts: blogPosts, blogCategories: blogCategories, catalogProducts: catalogProducts, catalogCategories: catalogCategories, pages: pages, navigationMenus: navigationMenus};
}

exports.createModel = createModel
    

  