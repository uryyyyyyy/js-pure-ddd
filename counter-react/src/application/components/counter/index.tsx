import * as React from 'react'
import {GlobalCounter} from "./GlobalCounter";
import {LocalCounter} from "./LocalCounter";

export const CounterContainer: React.StatelessComponent<{}> = () => {
  return (
    <>
      <LocalCounter/>
      <LocalCounter/>
      <br />
      <GlobalCounter/>
      <GlobalCounter/>
    </>
  )
}