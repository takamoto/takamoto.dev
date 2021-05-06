import React from "react"
import { PageProps, graphql, Link } from "gatsby"
import { Divider } from "@chakra-ui/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

import Layout from "../components/layout"
import RelatedPosts from "../components/organisms/relatedPosts"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"

const shortcodes = {
  Link,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
}

const PostStyle = css`
  h2 {
    font-size: 140%;
    font-weight: 700;
    margin: 2rem 0 1rem 0;
  }
  h2:before {
    color: gray;
    content: "## ";
  }
  h3 {
    font-size: 120%;
    font-weight: 700;
    margin: 1.5rem 0 1rem 0;
  }
  h3:before {
    color: gray;
    content: "### ";
  }
  h2 + h3 {
    margin: 0 0 1rem 0;
  }
  p {
    margin-bottom: 1rem;
  }
  a {
    color: #0366d6;
  }
  a: hover {
    text-decoration: underline;
  }
  ul, ol {
    margin-left: 2rem;
  }
  pre {
    margin-bottom: 1rem;
  }
  table {
    margin: 2rem 0 1rem 0;
  }
`

const BlogPostTemplate: React.FunctionComponent<
  PageProps<GatsbyTypes.BlogPostBySlugQuery, GatsbyTypes.SitePageContext>
> = (props) => {
  const { data, location } = props
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title
  const relatedPostsComponent =
    post.frontmatter.tags != null ? (
      <RelatedPosts tag={post.frontmatter.tags[0]} id={post.id} />
    ) : null

  const Article = styled.article``
  const ArticleHeader = styled.header``
  const ArticleTitle = styled.h1`
    font-size: 230%;
    font-weight: 1000;
    letter-spacing: -.03em;
  `
  const ArticleDatetime = styled.time`
    color: gray;
  `
  const ArticleBody = styled.div``

  return (
    <Layout location={location} title={siteTitle}>
      <Article>
        <ArticleHeader css={{ marginBottom: `2rem` }}>
          <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
          <ArticleDatetime dateTime={post.frontmatter.date}>{post.frontmatter.date}</ArticleDatetime>
        </ArticleHeader>
        <ArticleBody css={PostStyle}>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </ArticleBody>
      </Article>
      <Divider m={`4rem 0`} />
      {relatedPostsComponent}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
      excerpt
      id
    }
  }
`
