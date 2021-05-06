import React from "react"
import { PageProps, graphql } from "gatsby"
import { Divider, Grid, Skeleton } from "@chakra-ui/react"
import styled from "@emotion/styled"

import Layout from "../components/layout"
import Posts from "../components/organisms/posts"
import TagList from "../components/molecules/tagList"

const Tags: React.FunctionComponent<
  PageProps<GatsbyTypes.IndexPageQuery, GatsbyTypes.SitePageContext>
  > = (props) => {
  const { data, location, pageContext } = props
  const { tag } = pageContext
  const { edges } = data.allMdx
  const siteTitle = data.site.siteMetadata.title
  // const pageTitle = `Tag search : ${tag} | ${siteTitle}`

  const TagBox = styled.div`
    text-align: center;
  `

  return (
    <Layout location={location} title={siteTitle}>
      <Posts edges={edges} pageContext={pageContext}/>
      <Divider m="2rem 0" />
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <TagBox><TagList targetTag={tag} /></TagBox>
        <Skeleton speed={0}></Skeleton>
        <Skeleton speed={0}></Skeleton>
      </Grid>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
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
