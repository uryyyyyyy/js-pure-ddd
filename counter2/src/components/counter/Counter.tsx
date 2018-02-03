import * as React from 'react'

interface Props {
  count: number
  increment: (amount: number) => void
  decrement: (amount: number) => void
  isLoading: boolean
}

export const Counter: React.StatelessComponent<Props> = (props: Props) =>
  <div>
    <p>{`score: ${props.count}`}</p>
    <button onClick={() => props.increment(3)}>Increment 3</button>
    <button onClick={() => props.decrement(2)}>Decrement 2</button>
    {props.isLoading ? <p>loading</p>: null}
  </div>
