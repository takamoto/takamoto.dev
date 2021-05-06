import React from "react"
import styled from "@emotion/styled"
import { Divider } from "@chakra-ui/react"

const FooterContents: React.FunctionComponent = () => {
  const FooterBody = styled.footer`
    font-size: 90%;
    width: 100%;
    text-align: center;
  `

  const Copyright = styled.div`
    margin: 1.5rem 0;
  `

  return (
    <FooterBody>
      <Divider m="0" />
      <Copyright>
        Copyright © 2021, takamoto
      </Copyright>
    </FooterBody>
  )
}

export default FooterContents
