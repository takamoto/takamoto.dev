import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Button, HStack, Tag } from "@chakra-ui/react"

interface Props {
  targetTag?:string
}

const TagList : React.FunctionComponent<Props> = ({ targetTag }) => {
  const data:GatsbyTypes.TagListQuery = useStaticQuery<GatsbyTypes.TagListQuery>(graphql`
    query TagList {
      allMdx(filter: { frontmatter: { draft: { eq: false } } }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const allTagAndCount = data.allMdx
  const tagArray = allTagAndCount.group.map((tagdata) => {
    const tag = tagdata.fieldValue
    const count = tagdata.totalCount
    const variant = tag === targetTag ? "solid" : "outline"

    return (
      <Link
        to={`/tags/${tag.toLowerCase()}`}
        style={{ textDecoration: "none" }}
        key={tag}
      >
        <Tag 
          key={tag}
          size="sm"
          variant={variant}
          mt={2}
        >
          {`${tag}:${count}`}
        </Tag>
      </Link>
    )
  })

  return <HStack maxW="100%" display="block">{tagArray}</HStack>
}

export default TagList
