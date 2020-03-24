require('dotenv').config();
const queries = require("./src/utils/algolia")

module.exports = {
  siteMetadata: {
    title: `Spreadshirt`,
    description: `Spreadshirt CYO Demo`,
    author: `mbs`,
    siteUrl: `https://gatsby-contentful-cyo-demo.netlify.com`
  },
  plugins: [       
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },    
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Spreadshirt CYO Demo`,
        short_name: `Spreadshirt`,
        start_url: `/`,
        background_color: `#00b2a5`,
        theme_color: `#00b2a5`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },  
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },  
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {          
        policy: [{ userAgent: '*', disallow: '/' }]
      }
    },
    `gatsby-plugin-styled-components`
  ],
}
