const productQuery = `{
  products: allContentfulCatalogProduct {
    edges {
      node {        
        name
        slug
        contentfulid
        defaultValues {
            view
            color
        }    
        sizes {
            name
        }    
        colors {
            name
        } 
      }
    }
  }
}`

const createEntry = (node) => {
    return {
        "objectId": node.contentfulid,
        "name": node.name,
        "slug": node.slug,
        "sizes": node.sizes,
        "colors": node.colors,        
        "imageUrl": `https://image.spreadshirtmedia.net/image-server/v1/mp/productTypes/${node.contentfulid},width=300,height=300.jpg`,
        "url": `https://gatsby-contentful-cyo-demo.netlify.com/detail/${node.slug}/`
    }
}

const queries = [
  {
    indexName: process.env.GATSBY_ALGOLIA_PRODUCTS_INDEX,
    query: productQuery,
    transformer: ({ data }) => data.products.edges.map(({node}) => createEntry(node))
  }  
]
module.exports = queries
