import * as React from 'react'

interface Props {
  totalCount :number
  completeCount: number
}

export default class Footer extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <section id="main">
        <div>{`Total count: ${this.props.totalCount}`}</div>
        <div>{`Completed count: ${this.props.completeCount}`}</div>
      </section>
    )
  }
}