import React from "react"
import { PageProps,graphql } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage : React.FunctionComponent<PageProps<GatsbyTypes.NotFoundPageQuery, GatsbyTypes.SitePageContext>> = (props) => {
  const { data,location } = props
  const siteTitle = data.site.siteMetadata.title

      return (
      <Layout location={location} title={siteTitle}>
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
    )
}

export default NotFoundPage

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`
