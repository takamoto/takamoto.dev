import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { StaticImage } from "gatsby-plugin-image"

const HeaderContents: React.FunctionComponent = ({title}) => {
  const HeaderBody = styled.div`
    margin-top: 20px;
    border-bottom: solid 2px black;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `

  const BlogTitle = styled.h1`
    font-size: 160%;
    font-weight: 1000;
    letter-spacing: -.04em;
    margin-bottom: -3px;
  `

  const HeaderNav = styled.div`
    font-size: 80%;
    margin: 3px;
    display: flex;
    letter-spacing: -.04em;
  `

  const navItemStyle = css`
    padding: 0 10px;
    display: flex;
    align-items: center;
  `

  const iconStyle = css`
    width: 1.2em;
    height: 1.2em;
    display: inline-block;
    margin-right: 0.25em;
  `

  return (
    <HeaderBody>
      <BlogTitle><Link to={`/`}>{title}</Link></BlogTitle>
      <HeaderNav>
        <Link css={navItemStyle} to={`/about`}>About</Link>
        <Link css={navItemStyle} to="https://github.com/takamoto">
          <StaticImage src="../../images/Github.png" css={iconStyle} />
          GitHub
        </Link>
      </HeaderNav>
    </HeaderBody>
  )
}

export default HeaderContents
