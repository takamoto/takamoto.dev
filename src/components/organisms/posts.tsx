import React from "react"
import { Link } from "gatsby"
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import styled from "@emotion/styled"

interface Props {
  edges: GatsbyTypes.IndexPageQuery["allMdx"]["edges"]
}

const PostsListItem: React.FunctionComponent<Props> = ({ node }, index) => {
  const Post = styled.li`
    display: flex;
    align-items: center;
  `
  const PostDate = styled.div`
    color: gray;
    text-align: right;
    font-size: 80%;
  `
  const PostTitle = styled.h3`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  `

  const margin = (index === 0) ? "0" : "10px"
  return (
    <Post css={{ marginTop: margin }}>
      <PostDate css={{ flexShrink: `0`, width: `10em`, marginRight: `20px` }} >{node.frontmatter.date}</PostDate>
      <PostTitle><Link to={node.fields.slug}>{node.frontmatter.title}</Link></PostTitle>
    </Post>
  )
}

const Posts: React.FunctionComponent<Props> = ({ edges, pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext

  const PostsComponent = styled.div``
  const PostsList = styled.ol`
    list-style: none;
    margin: 0;
  `
  const Pagination = styled.div`
    display: flex;
    justify-content: center;
  `
  const PaginationLink = styled(Link)`
    margin: 0 10px;
    display: flex;
    align-items: center;
  `

  return (
    <PostsComponent>
      <PostsList>{ edges.map(PostsListItem) }</PostsList>
      <Pagination css={{ marginTop: `20px` }}>
        <PaginationLink to={previousPagePath}><ArrowBackIcon />Newer</PaginationLink>
        <PaginationLink to={nextPagePath}>Older<ArrowForwardIcon /></PaginationLink>
      </Pagination>
    </PostsComponent>
  )
}

export default Posts
