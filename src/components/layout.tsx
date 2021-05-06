import React from "react"
import { WindowLocation } from "@reach/router"
import { ChakraProvider } from "@chakra-ui/react"
import styled from "@emotion/styled"

import FooterContents from "./organisms/footer"
import HeaderContents from "./organisms/header"
import { css } from "@emotion/react"

interface LocationState {
  title: string
  location: WindowLocation
}

interface Props extends LocationState {}

const Layout: React.FunctionComponent<Props> = (props) => {
  const { title, children } = props

  const Overall = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    min-height: 100vh;
  `

  const width = css`
    padding-left: 30px;
    padding-right: 30px;
    max-width: 900px;
    width: 100%;
  `
  const Header = styled.header`${width};`
  const Main = styled.main`${width};`
  const Footer = styled.footer`${width};`

  return (
    <ChakraProvider>
      <Overall>
        <Header css={{ marginBottom: `2rem` }}><HeaderContents title={title} /></Header>
        <Main css={{ flex: `1` }}>{children}</Main>
        <Footer css={{ marginTop: `2rem` }}><FooterContents /></Footer>
      </Overall>
    </ChakraProvider>
  )
}

export default Layout
