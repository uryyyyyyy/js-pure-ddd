import * as React from "react";

export interface State {
  internalCount: number
}

export class LocalCounter extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props)
    this.state = {
      internalCount: 0,
    }
  }

  internalIncrement(num: number): void {
    this.setState({internalCount: this.state.internalCount + num})
  }

  internalDecrement(num: number):void {
    this.setState({internalCount: this.state.internalCount - num})
  }

  render() {
    return (
      <div>
        <h2>Local Counter</h2>
        <p>{`internal count: ${this.state.internalCount}`}</p>
        <button onClick={() => this.internalIncrement(3)}>Internal Increment 3</button>
        <button onClick={() => this.internalDecrement(2)}>Internal Decrement 2</button>
      </div>
    )
  }
}
