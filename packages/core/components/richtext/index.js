import { Text } from "@jds/core";
import HTMLReactParser from "html-react-parser";
import React from "react";
import { Global, css } from '@emotion/react'
const RichText = ({ text, ...restOfProps }) => {
  return (
    <>
      <Global styles={css`
      .j-rich-text a:focus{
        border: none
      }
      `} />
      <Text {...restOfProps}>{text && HTMLReactParser(text)}</Text>
    </>

  )
}

export default RichText