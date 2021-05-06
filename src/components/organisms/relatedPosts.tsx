import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { Box, Heading, LinkBox, LinkOverlay, VStack } from "@chakra-ui/react"
import { AttachmentIcon } from "@chakra-ui/icons"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import Posts from "./posts"

interface Props {
  tag: string
  id: string
}

const relatedPosts: React.FunctionComponent<Props> = ({tag,id}) =>{
  const recentPostsData: GatsbyTypes.RecentPostQuery = useStaticQuery<GatsbyTypes.RecentPostQuery>(graphql`
    query RecentPost {
      allMdx(limit: 10, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
            }
            id
          }
        }
      }
    }
  `)

  const relatedRecentPostsData = recentPostsData.allMdx.edges.filter( edge => edge.node.frontmatter.tags.includes(tag) === true)
  const excludeSelfPostData = relatedRecentPostsData.filter( edge => edge.node.id !== id)

  const RelatedPosts = styled.div``
  const RelatedPostsHeader = styled.h2`
    font-size: 150%;
  `
  const RelatedPostHeaderIcon = styled(AttachmentIcon)`
    color: gray;
    height: 1lh;
    margin-right: 0.5rem;
  `

  return (
    <RelatedPosts>
      <RelatedPostsHeader css={{ marginBottom: `1rem` }}>
        <RelatedPostHeaderIcon /> 関連記事
      </RelatedPostsHeader>
      <Posts edges={excludeSelfPostData} pageContext={{}}/>
    </RelatedPosts>
  )
}


export default relatedPosts