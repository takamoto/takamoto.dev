module.exports = {
  siteMetadata: {
    title: `takamoto.dev`,
    author: `takamoto`,
    description: ``,
    siteUrl: `https://takamoto.dev`,
    image: `/image/logo.png`,
    social: {
      github: `takamoto`,
    }
  },
  plugins: [
    `gatsby-plugin-typegen`,
    `gatsby-plugin-image`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-emotion`,
    `@chakra-ui/gatsby-plugin`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`
      }
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200, //discover用
              wrapperStyle: `margin-bottom: 16px;`,
              quality: 80,
              withWebp: true,
              loading: `lazy`,
              maxHeight: 760,
              fit: `inside`
            }
          },
          `gatsby-remark-embedder`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem;`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                scrollableTable: {
                  classes: "scrollable_table"
                }
              }
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ["/tags/*", "/page/*"]
      }
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  categories: edge.node.frontmatter.tags,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                })
              })
            },
            query: `
              query RssFeed {
                allMdx(sort: {order: DESC, fields: [frontmatter___date]}, limit: 20, filter: {frontmatter: {draft: {ne: true}}}) {
                  edges {
                    node {
                      excerpt
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                        tags
                      }
                    }
                  }
                }
              }
            `,
            output: `/index.xml`,
            title: `takamoto.dev`,
            match: `^/blog/`
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `takamoto.dev`,
        short_name: `takamoto.dev`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/image/logo.png`
      }
    }
  ]
}
