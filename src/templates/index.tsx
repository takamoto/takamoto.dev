import React from "react"
import { PageProps, graphql } from "gatsby"
import { Divider, Grid, Skeleton } from "@chakra-ui/react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import Posts from "../components/organisms/posts"
import TagList from "../components/molecules/tagList"

const BlogIndex: React.FunctionComponent<
  PageProps<GatsbyTypes.IndexPageQuery, GatsbyTypes.SitePageContext>
> = (props) => {
  const { data, location, pageContext } = props
  const siteTitle = data.site.siteMetadata.title
  const edges = data.allMdx.edges

  const TagBox = styled.div`
    text-align: center;
  `

  return (
    <Layout location={location} title={siteTitle}>
      <Posts edges={edges} pageContext={pageContext}/>
      <Divider m="2rem 0" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <TagBox><TagList /></TagBox>
        <Skeleton speed={0}></Skeleton>
        <Skeleton speed={0}></Skeleton>
      </Grid>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPage($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      skip: $skip
      limit: $limit
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
