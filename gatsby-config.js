require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Spreadshirt Create Blog`,
    description: `Create Blog - Inspiration. Lifestyle. Weihnachtswahnsinn.`,
    author: `Heiko Stute`,
    siteUrl: `https://gatsby-contentful-cyo-demo.netlify.com`
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
          rule: {
            include: "/src/images/"
          }
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-remark-embed-video",
    "gatsby-remark-responsive-iframe",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {              
              maxWidth: 1080,
              withWebp: true,
              showCaptions: true
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {  
              ratio: 1.77,
              width: "100%",              
              height: 400,            
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
        ],
      },
    },    
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
        name: `Spreadshirt Create Blog`,
        short_name: `cyo-blog`,
        start_url: `/designer/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/gatsby-icon.png`,
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
    `gatsby-plugin-sitemap`,  
  ],
}
