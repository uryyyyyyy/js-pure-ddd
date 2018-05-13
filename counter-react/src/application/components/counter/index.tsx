import * as React from 'react'
import {LocalCounter} from "./LocalCounter/View";
import {GlobalCounter} from "./GlobalCounter/View";

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