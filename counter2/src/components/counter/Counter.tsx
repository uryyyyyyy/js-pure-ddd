import * as React from 'react'
import {Count} from '../../domain/entities/Count';

interface Props {
  count: Count
  increment: (amount: number) => void
  decrement: (amount: number) => void
  reload: () => void
  save: () => void
  loadingCount: number
}

export const Counter: React.StatelessComponent<Props> = (props: Props) =>
  <div>
    <p>{`score: ${props.count.getValue()}`}</p>
    <button onClick={() => props.increment(3)}>Increment 3</button>
    <button onClick={() => props.decrement(2)}>Decrement 2</button>
    <button onClick={() => props.save()}>save</button>
    <button onClick={() => props.reload()}>reload</button>
    {(props.loadingCount === 0) ? null : <p>loading</p>}
  </div>
