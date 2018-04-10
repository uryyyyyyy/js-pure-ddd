import * as React from 'react'
import {LocalCounter} from "./localCounter/View";

export const CounterContainer: React.StatelessComponent<{}> = () => {
  return (
    <>
      <LocalCounter/>
      <br />
      <br />
      <LocalCounter/>
    </>)
}