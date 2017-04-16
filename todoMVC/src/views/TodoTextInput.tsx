import * as React from 'react'

const ENTER_KEY_CODE = 13

interface Props {
    onSave: (text: string) => void
}

interface State {
    text: string
}

export default class TodoTextInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = { text: ''}
    }

    onKeyDown = (event: React.KeyboardEvent<any>) => {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.props.onSave(this.state.text)
            this.setState({text: ''})
        }
    }

    onChange = (event: React.ChangeEvent<any>) => {
        this.setState({text: event.target.value})
    }

    render() {
        return (
          <input
            placeholder={'add todo'}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={this.state.text}
          />
        )
    }
}